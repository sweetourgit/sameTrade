<template>
  <div class="user_list">
    <!--公司信息-->
    <div class="cominfo">
      <div class="cominfo-title">
        公司信息
      </div>
      <div class="comContent">
        <span style="margin-left: 10px">名称：</span> <span style="margin-left: 10px">{{company_name}}</span>
        <span style="margin-left: 100px">类型：</span><span style="margin-left: 10px">{{company_type}}</span>
        <span style="margin-left: 100px">到期时间：</span><span style="margin-left: 10px">{{company_time}}</span>
        <div class="comContent">
          <span style="margin-left: 10px">剩余额度：</span> <span style="margin-left: 10px">{{company_quota}}</span>
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
        <el-input v-model="linker" placeholder="请输入内容" style="width: 250px;margin-left: 10px"></el-input>
        <el-input v-model="phone" placeholder="请输入内容"  style="width: 250px; margin-left: 105px"></el-input>
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
        <el-input v-model="publicName" placeholder="请输入内容" style="width: 250px;margin-left: 10px"></el-input>
        <el-input v-model="bankName" placeholder="请输入内容"  style="width: 250px; margin-left: 105px"></el-input>
        <el-input v-model="bankcardNo" placeholder="请输入内容"  style="width: 250px; margin-left: 132px"></el-input>
      </div>
      <el-button class="combut" type="primary" @click="update_company(id)">保存</el-button>
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
                  prop="name"
                  label="名称"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="状态"
                  width="180">
            <template slot-scope="scope">
              <template v-if="scope.row.state == 3">
                <div style="color: red" >停用</div>
              </template>
              <template v-else>
                <div>正常</div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
                  prop="phone"
                  label="手机">
          </el-table-column>
          <el-table-column
                  prop="email"
                  label="邮箱">
          </el-table-column>
          <el-table-column
                  prop="sex"
                  label="性别">
            <template slot-scope="scope">
              <template v-if="scope.row.sex == 1">
                <div >男</div>
              </template>
              <template v-else>
                <div>女</div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
                  prop="wx"
                  label="微信号">
          </el-table-column>
          <el-table-column
                  prop="qq"
                  label="qq">
          </el-table-column>
          <el-table-column
                  prop="peerUserType"
                  label="职务">
            <template slot-scope="scope">
              <template v-if="scope.row.peerUserType == 1">
                <div >管理员</div>
              </template>
              <template v-else>
                <div>销售人员</div>
              </template>
            </template>
          </el-table-column>
          <el-table-column
                  prop="qq"
                  label="操作">
            <template slot-scope="scope">
              <template>
                <a @click="adddialog(scope.row.id)" style="color: #6AABFB">更改</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button class="combut" type="primary" @click="adddialog(0)">添加</el-button>
      <div class="block" style="margin-top: 20px;margin-bottom: 20px">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :page-size=pagesize
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
        </el-pagination>
      </div>
    </div>
<!--添加账号-->
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name" class="inpusty">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" class="inpusty">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="inpusty" >
          <el-input v-model="ruleForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信"  class="inpusty">
          <el-input v-model="ruleForm.vx"></el-input>
        </el-form-item>
        <el-form-item label="qq" class="inpusty" >
          <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态">
            <el-option label="正常" value="2"></el-option>
            <el-option label="停用" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="inpusty">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="管理员" name="type"></el-checkbox>
            <el-checkbox label="产品负责人" name="type"></el-checkbox>
            <el-checkbox label="旅游顾问" name="type"></el-checkbox>
            <el-checkbox label="财务" name="type"></el-checkbox>
            <el-checkbox style="margin-left: 0px" label="管理人员" name="type"></el-checkbox>
            <el-checkbox label="销售员" name="type"></el-checkbox>
            <el-checkbox label="计调员" name="type"></el-checkbox>
            <el-checkbox label="客服" name="type"></el-checkbox>
            <el-checkbox style="margin-left: 0px" label="运营人员" name="type"></el-checkbox>
            <el-checkbox label="组织经理" name="type"></el-checkbox>
            <el-checkbox label="其他" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button  v-if="gid == 0" type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button v-else type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!--<span slot="footer" class="dialog-footer">
        <el-button @click="submitForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>



  </div>
</template>

<script>
  export default {
    data() {
      return {
          id:1,
          total:0,
          pagesize:10,
          currentPage4: 1,
          gid:0,
          dialogVisible:false,
          fileList: [],
          ruleForm: {
              name: '',
              phone:'',
              mail:'',
              sex: '',
              vx:'',
              qq:'',
              status:'',
              password:'',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
          },
          rules: {
              name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
                  { min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur' }
              ],
              phone: [
                  { required: true, message: '请输入电话', trigger: 'blur' },

              ],
              sex: [
                  { required: true, message: '请选择性别', trigger: 'change' }
              ],
              status: [
                  { required: true, message: '请选择状态', trigger: 'change' }
              ],
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 6, max: 30, message: '长度在 6 到 30个字符', trigger: 'blur' }
              ],
              date1: [
                  { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
              ],
              date2: [
                  { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
              ],
              type: [
                  { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ],
              resource: [
                  { required: true, message: '请选择活动资源', trigger: 'change' }
              ],
              desc: [
                  { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
          },
          tableData: [],
          company_name:"",
          company_type:"",
          company_time:"",
          company_quota:"",
          linker:'',
          phone:'',
          publicName:'',
          bankName:'',
          bankcardNo:'',


      }
    },
    methods:{
        submitForm(formName) {
            console.log(this.ruleForm.type[0])
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var new_type = '';
                    if(this.ruleForm.type[0] == "管理员"){
                        new_type = 1;
                    }else{
                        new_type = 2;
                    }
                    var that = this
                    this.$http.post(
                        this.GLOBAL.serverSrc + "/universal/localcomp/api/PeerUserinsert",
                        {
                            "object": {
                                "id": 0,
                                "isDeleted": 0,
                                "name": that.ruleForm.name,
                                "phone": that.ruleForm.phone,
                                "email": that.ruleForm.mail,
                                "sex": that.ruleForm.sex,
                                "wx": that.ruleForm.vx,
                                "qq": that.ruleForm.qq,
                                "state": that.ruleForm.status,
                                "passWord": that.ruleForm.password,
                                "peerUserType":new_type,
                                "createTime": 0,
                                "localCompID": that.id,
                            }
                        }
                    )
                        .then(function (obj) {
                            console.log(obj)
                        })
                        .catch(function (obj) {
                        })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        adddialog(id){
         if(id == 0){
                this.gid = 0
            }else{
                this.gid = id
                this.one_info(id)

            }

            this.dialogVisible = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.gid = 0
                    done();
                })
                .catch(_ => {});
        },
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
            this.accout_list(this.id,0,val)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.accout_list(this.id,val,this.pagesize)
        },
        //获取公司信息
        companyinfo(id){
            var list = []
            var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/universal/localcomp/api/get",
                {
                    "id": id
                },
            )
                .then(function (obj) {
                    that.company_name = obj.data.object.name;
                    if(obj.data.object.localCompType == 1){
                        that.company_type = "同业社";
                    }
                    that.company_time = obj.data.object.expTime
                    that.company_quota = obj.data.object.quota
                    that.linker = obj.data.object.linker
                    that.phone = obj.data.object.phone
                    list.url = obj.data.object.imgUrl
                    list.name = "公司logo"
                    that.fileList.push(list)
                    that.publicName = obj.data.object.publicName
                    that.bankName = obj.data.object.bankName
                    that.bankcardNo = obj.data.object.bankcardNo

                })
                .catch(function (obj) {
                })
        },
        //更改公司信息
        update_company(id){
            var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/universal/localcomp/api/save",
                {
                    "object": {
                        "id": id,
                        "name": that.company_name,
                        "localCompType": 1,
                        "expTime": that.company_time,
                        "quota":that.company_quota ,
                        "linker": that.linker,
                        "phone":  that.phone,
                        "publicName": that.publicName,
                        "bankName": that.bankName,
                        "bankcardNo": that.bankcardNo,
                        "imgUrl": that.fileList[0].url
                    }
                }
            )
                .then(function (obj) {
                })
                .catch(function (obj) {
                })
        },
        //同业账户列表
        accout_list(id,index,size){
            var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/universal/localcomp/api/PeerUserPage",
                {
                    "pageIndex": index?index:0,
                    "pageSize": size?size:that.pagesize,
                    "total": 0,
                    "object": {
                        "peerUserType": 0,
                        "localCompID": that.id,

                    }
                }
            )
                .then(function (obj) {
                    that.tableData = obj.data.objects
                    that.total = obj.data.total

                })
                .catch(function (obj) {
                })
        },
        //获取一个用户
        one_info(id){
            var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/universal/localcomp/api/PeerUserGetSingle",
                {
                    "id": id
                }
            )
                .then(function (obj) {
                  console.log(obj.data.object)
                    that.ruleForm.name = obj.data.object.name
                    that.ruleForm.phone = obj.data.object.phone
                })
                .catch(function (obj) {
                })
        }

    },
      created(){
          this.companyinfo(this.id);
          this.accout_list(this.id);
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
  .inpusty{
    width: 320px;
  }
</style>

