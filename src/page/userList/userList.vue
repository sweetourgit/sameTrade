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
      <el-button class="combut" type="primary" @click="adddialog">添加</el-button>
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
            <el-option label="正常" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
  export default {
    data() {
      return {
          input:'',
          currentPage4: 4,
          dialogVisible:false,
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          ruleForm: {
              name: '',
              phone:'',
              mail:'',
              sex: '',
              vx:'',
              qq:'',
              status:'',
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        adddialog(){
            this.dialogVisible = true
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
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
  .inpusty{
    width: 320px;
  }
</style>

