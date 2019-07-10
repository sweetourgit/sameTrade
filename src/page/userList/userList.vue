<template>
  <div class="user_list">
    <!--公司信息-->
    <div class="cominfo">
      <div class="cominfo-title">
        公司信息
      </div>
      <div class="comContent">
        <span style="margin-left: 10px">名称：</span> <span style="margin-left: 10px">丹东康辉国际旅行社有限公司</span>
        <span style="margin-left: 100px">类型：</span><span style="margin-left: 10px">同业社</span>
        <span style="margin-left: 100px">到期时间：</span><span style="margin-left: 10px">2019年10月7日</span>
        <div class="comContent">
          <span style="margin-left: 10px">剩余额度：</span> <span style="margin-left: 10px">400,00.00</span>
        </div>
      </div>
    </div>
    <!--联系人信息-->
    <div class="forminfo">
      <div class="cominfo-title">
        联系人和账户信息
      </div>
      <div class="comContent">
        <span style="margin-left: 10px">联系人名称</span>
        <span style="margin-left: 280px">电话</span>
        <span style="margin-left: 345px">公司LOGO</span>
      </div>
      <div class="comContent" style="border-bottom: #E8E8E8 1px solid;padding-bottom:18px">
        <el-input v-model="input" placeholder="请输入内容" style="width: 250px;margin-left: 10px"></el-input>
        <el-input v-model="input" placeholder="请输入内容"  style="width: 250px; margin-left: 105px"></el-input>
        <el-upload
                style="width: 696px;float: right;margin-right: 45px;margin-top: 4px"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

      </div>
      <div class="comContent">
        <span style="margin-left: 10px">对公户名</span>
        <span style="margin-left: 280px">开户行</span>
        <span style="margin-left: 345px">对公账号</span>
      </div>
      <div class="comContent">
        <el-input v-model="input" placeholder="请输入内容" style="width: 250px;margin-left: 10px"></el-input>
        <el-input v-model="input" placeholder="请输入内容"  style="width: 250px; margin-left: 105px"></el-input>
        <el-input v-model="input" placeholder="请输入内容"  style="width: 250px; margin-left: 132px"></el-input>
      </div>
      <el-button class="combut" type="primary">保存</el-button>
    </div>
    <!--表格-->
    <div class="cominfo1" style="margin-top: 20px;margin-bottom: 50px">
      <div class="cominfo-title">
        账户信息
      </div>
      <div style="margin-top: 10px">
        <el-table
                :data="tableData"
                border
                style="width: 100%">
          <el-table-column
                  prop="date"
                  label="名称"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="状态"
                  width="180">
            <template slot-scope="scope">
              <template v-if="scope.row.name == '停用'">
                <div style="color: red" >{{scope.row.name}}</div>
              </template>
              <template v-else>
                <div>{{scope.row.name}}</div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="手机">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="邮箱">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="性别">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="微信号">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="qq">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="职务">
          </el-table-column>
          <el-table-column
                  prop="qq"
                  label="操作">
            <template slot-scope="scope">
              <template>
                <a style="color: #6AABFB">更改</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button class="combut" type="primary">添加</el-button>
      <div class="block" style="margin-top: 20px;margin-bottom: 20px">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
      </div>
    </div>



  </div>
</template>

<script>
  export default {
    data() {
      return {
          input:'',
          currentPage4: 4,
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          tableData: [{
              date: '2016-05-02',
              name: '停用',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              qq: '',

          },{
              date: '2016-05-02',
              name: '正常',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
              address: '上海市普陀区金沙江路 1518 弄',
          }]


      }
    },
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }

    }
  }



</script>

<style scoped>
  .cominfo{
    width: 1500px;
    height: 125px;
    border: 1px solid #E8E8E8;
  }
  .cominfo1{
    width: 1500px;

    border: 1px solid #E8E8E8;
  }
  .cominfo-title{
    border-bottom: 1px solid #E8E8E8;
    margin-top: 10px;
    padding-bottom: 15px;
    margin-left: 10px;
    font-size: 16px;
  }
  .comContent{
    margin-top: 15px;
  }
  .forminfo {
    width: 1500px;
    height: 310px;
    border: 1px solid #E8E8E8;
    margin-top: 25px;
  }
  .user_list>>>.el-upload-list {
    margin-left: 242px;
    margin-top: -39px;
  }
  .combut{
    margin-top: 18px;
    margin-left: 25px;
  }
</style>

