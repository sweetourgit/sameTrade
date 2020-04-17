<template>
  <div class="user_list">
    <div class="cominfo">
      <div class="cominfo-title">公司信息</div>
      <div class="comContent">
        <table>
          <tr>
            <td width="75">名称：</td>
            <td width="300">{{localcompInfo.name}}</td>
            <td width="80" align="right">类型：</td>
            <td width="270">
              <span v-if="localcompInfo.localCompType == 1">门店</span>
              <span v-if="localcompInfo.localCompType == 2">同业社</span>
              <span v-if="localcompInfo.localCompType == 3">翻牌门店</span>
              <span v-if="localcompInfo.localCompType == 4">个体分销</span>
            </td>
            <td>到期时间：</td>
            <td width="270">{{localcompInfo.expTime}}</td>
          </tr>
          <tr>
            <td>剩余额度：</td>
            <td colspan="4">{{localcompInfo.balance}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="cominfo">
      <div class="cominfo-title">联系人和账户信息</div>
      <div class="comContent">
        <div class="com-info">
          <p>联系人名称</p>
          <el-input v-model="localcompInfo.linker" placeholder="请输入内容" class="w250" :disabled="peerUser"></el-input>
        </div>
        <div class="com-info">
          <p>电话</p>
          <el-input v-model="localcompInfo.phone" placeholder="请输入内容" class="w250" :disabled="peerUser"></el-input>
        </div>
        <div class="com-info">
          <p>公司LOGO</p>
          <el-upload
                :disabled="peerUser"
                class="upload-demo w250"
                name="files"
                ref="upload"
                :action="GLOBAL.serverSrc + '/upload/obs/api/picture'"
                multiple
                :on-success="handleSuccess"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                list-type="picture">
          <el-button size="small" type="primary" :disabled="peerUser">点击上传</el-button>
        </el-upload>        
        </div>
      </div>
      <hr style="margin:0 20px;border:1px solid #f6f6f6"/>
      <div class="comContent">
        <div class="com-info">
          <p>对公户名</p>
          <el-input v-model="localcompInfo.publicName" placeholder="请输入内容" class="w250" :disabled="peerUser"></el-input>
        </div>
        <div class="com-info">
          <p>开户行</p>
          <el-input v-model="localcompInfo.bankName" placeholder="请输入内容" class="w250" :disabled="peerUser"></el-input>
        </div>
        <div class="com-info">
          <p>对公账号</p>
          <el-input v-model="localcompInfo.bankcardNo" placeholder="请输入内容" class="w250" :disabled="peerUser"></el-input>
        </div>
      </div>
      <el-button v-if="!peerUser" class="button" type="primary" @click="saveLocalcompInfo">保存</el-button>
    </div>
    <div class="cominfo" style="margin-bottom:70px">
      <div class="cominfo-title">账户信息</div>
      <el-table :data="acconutList" ref="multipleTable" class="table" :header-cell-style="getRowClass" border>
           <el-table-column  prop="name" label="名称" width="150" align="center"></el-table-column>
           <el-table-column  label="状态" min-width="80" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.state == 3" class="red">停用</div>
                <div v-if="scope.row.state == 2">正常</div>
              </template>
           </el-table-column>
           <el-table-column  prop="phone" label="手机" width="150" align="center"></el-table-column>
           <el-table-column  prop="email" label="邮箱" width="150" align="center"></el-table-column>
           <el-table-column label="性别" width="100" align="center">
               <template slot-scope="scope">
                     <span v-if="scope.row.sex===0">男</span>
                     <span v-if="scope.row.sex===1">女</span>
                     <span v-if="scope.row.sex===3">未选择</span>
               </template>
           </el-table-column>
           <el-table-column  prop="wx" label="微信号" width="120" align="center"></el-table-column>
           <el-table-column  prop="qq" label="qq" width="120" align="center"></el-table-column>
           <el-table-column label="职务" width="120" align="center">
               <template slot-scope="scope">
                 <div v-if="scope.row.peerUserType == 1">管理员</div>
                 <div v-if="scope.row.peerUserType == 2">旅游顾问</div>
               </template>
           </el-table-column>
           <el-table-column  label="操作" align="center">
               <template slot-scope="scope">
                  <span class="cursor blue" v-if="!peerUser" @click="operation(2,scope.row.phone)">更改</span>
                  <span class="gray" v-if="peerUser">更改</span>
               </template>
           </el-table-column>
         </el-table>
         <div style="width:100%;margin-left:20px;overflow:hidden;">
           <el-pagination class="pagination"
              @size-change="handleSizeChange"
              background
              @current-change="handleCurrentChange"
              :current-page="1" 
              :page-sizes="[10, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
           </el-pagination>
         </div>
         <el-button v-if="!peerUser" class="button" type="primary" @click="operation(1)">添加</el-button>
      </div>
      <add-user :accountId="accountId" :variable="variable"></add-user>


  </div>
</template>

<script>
  import addUser from './addUser'
  export default {
    data () {
      return {
        tyUserInfo: {},
        localcompInfo: {},
        fileList: [],
        acconutList: [],
        pageSize: 10, 
        pageIndex: 1,
        total: 0,
        accountId: 0,
        variable: 0,
        peerUser: false
      }
    },
    components: {
      "add-user": addUser,
    },
    mounted () {
      this.tyUserInfo = JSON.parse(sessionStorage.getItem('tyUserInfo'));
      this.peerUser = this.tyUserInfo.peerUserType == 1 ? false : true;
      this.companyinfo();
      this.accoutList();
    },
    methods: {
        companyinfo () {
          this.$http.post(this.GLOBAL.serverSrc + "/indirect/localcomp/api/get",{
            "id": this.tyUserInfo.localCompID
            }).then(res => {
                this.localcompInfo = {};
                if(res.data.isSuccess == true){
                  this.localcompInfo = res.data.object;
                  if(this.localcompInfo.fileUrl){
                    let list = {
                      url:this.localcompInfo.fileUrl,
                      //name:"公司logo"
                    };
                    this.fileList.push(list);
                  }
                }
            })
            .catch(res => {
            })
        },
        saveLocalcompInfo () {
            this.localcompInfo.fileUrl = this.fileList[0].url;
            this.$http.post(this.GLOBAL.serverSrc + "/indirect/universal/localcomp/save",{
              "object": this.localcompInfo
            }).then(res => {
                if(res.data.isSuccess == true){
                  this.$message.success("提交成功")
                }
            })
            .catch(res => {
            })
        },
        handleSuccess (res, file ,fileList) {
          //this.fileList[0].name = JSON.parse(fileList[0].response).paths[0].Name;
          this.fileList[0].url = JSON.parse(fileList[0].response).paths[0].Url;
        },
        handleRemove (file, fileList) {

        },
        handleExceed (files, fileList) {
            this.$message.error(`只能上传一个文件`);
        },
        beforeRemove (file, fileList) {
            return this.$confirm(`确定移除公司logo？`);
        },
        getRowClass ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
              return 'background:#f7f7f7;height:60px;textAlign:center;color:#333;fontSize:15px'
            } else {
              return ''
            }
        },
        accoutList (id) {
            this.$http.post(this.GLOBAL.serverSrc + "/indirect/localcomp/api/peeruserpage",
                {
                  "pageIndex": this.pageIndex,
                  "pageSize": this.pageSize,
                  "object": {
                      "localCompID": this.tyUserInfo.localCompID,
                  }
                }
            ).then(res => {
                this.acconutList = res.data.objects
                this.total = res.data.total

            })
            .catch(function (obj) {
            })
        },
        handleSizeChange (val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.accoutList(1, val);
         },
         handleCurrentChange (val) {
            this.initData(val, this.pageSize);
            this.accoutList = val;
         },
         operation (i, id) {
            this.variable++;
            if (i == 2) {
              this.accountId = id;
            } else {
              this.accountId = 0;
            }
         }
    }    
  }
</script>

<style scoped>
  .cominfo{width: 1160px;border: 1px solid #E8E8E8;margin-left: 15px;margin-bottom: 15px;font-size: 14px;}
  .cominfo-title{padding:12px 15px;font-size: 16px;background-color: #f6f6f6}
  .comContent{overflow: hidden;padding: 20px}
  .comContent table{line-height: 40px;}
  .w250{width: 280px}
  .com-info{float: left;margin-right: 60px}
  .user_list>>>.el-upload-list {width: 600px;margin-left: 100px;margin-top: -80px;}
  .table{border:1px solid #e6e6e6;border-bottom: 0;background-color: #F7F7F7;width:100%}
  .pagination{text-align:center;margin:20px 0 0 0}
  .blue{color: #2e94f9}
  .cursor{cursor: pointer}
  .red{color: red}
  .gray{color: #cacaca}
  .button{margin:10px 0 20px 20px}
</style>

