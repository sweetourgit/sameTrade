<template>
  <div>
     <!--添加SKU-->
     <el-dialog :title="title" :visible.sync="dialogForm" class="city_list" width="580px" style="margin-top:-100px" @close="close">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
               <el-form-item label="姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
               </el-form-item>
               <el-form-item label="手机号" prop="phone">
                  <el-input v-model="ruleForm.phone"></el-input>
               </el-form-item>
               <el-form-item label="邮箱">
                  <el-input v-model="ruleForm.email"></el-input>
               </el-form-item>
               <el-form-item label="性别" prop="sex">
                  <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                    <el-option label="男" :value="0"></el-option>
                    <el-option label="女" :value="1"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="微信">
                  <el-input v-model="ruleForm.wx"></el-input>
               </el-form-item>
               <el-form-item label="QQ">
                  <el-input v-model="ruleForm.qq"></el-input>
               </el-form-item>
               <el-form-item label="状态" prop="state">
                  <el-select v-model="ruleForm.state" placeholder="请选择性别">
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="停用" :value="3"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="密码" prop="passWord">
                  <el-input v-model="ruleForm.passWord"></el-input>
               </el-form-item>
               <el-form-item label="职务" prop="peerUserType">
                  <el-checkbox-group v-model="ruleForm.peerUserType">
                    <el-checkbox :label="'1'" :key="'1'">管理员</el-checkbox>
                    <el-checkbox :label="'2'" :key="'2'">产品负责人</el-checkbox>
                    <el-checkbox :label="3" :key="1">旅游顾问</el-checkbox>
                    <el-checkbox :label="4" :key="1">财务</el-checkbox>
                    <el-checkbox :label="5" :key="1">管理人员</el-checkbox>
                    <el-checkbox :label="5" :key="1">销售员</el-checkbox>
                    <el-checkbox :label="6" :key="1">计调员</el-checkbox>
                    <el-checkbox :label="7" :key="1">客服</el-checkbox>
                    <el-checkbox :label="8" :key="1">运营人员</el-checkbox>
                    <el-checkbox :label="9" :key="1">组织经理</el-checkbox>
                    <el-checkbox :label="10" :key="1">其他</el-checkbox>
                  </el-checkbox-group>
               </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
     </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    accountId:0,
    variable:0,
  },
  data(){
    return{
      dialogForm:false,
      title:"",

      ruleForm: {
      },
      rules:{
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
        state: [
            { required: true, message: '请选择状态', trigger: 'change' }
        ],
        passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '长度在 6 到 30个字符', trigger: 'blur' }
        ],
        peerUserType: [
            { required: true, message: '请选择职务', trigger: 'change' }
        ]
      },
    }
  },
  watch: {
      variable:function(){
        this.dialogForm = true;
        if(this.accountId==0){
          this.title = "添加账户"
        }else{
          this.title = "编辑账户";
          this.getData();
        }
     }
  },
  methods: {
    getData(){
        this.$http.post(this.GLOBAL.serverSrc + '/universal/localcomp/api/PeerUserGetSingle',{
             "id": this.accountId
            }).then(res => {
              this.ruleForm={};
              if(res.data.isSuccess == true){
                 this.ruleForm=res.data.object;
              }
        })
    },
    close(){
      this.dialogForm=false;
      this.$refs["ruleForm"].resetFields();
    },
    save(){
      this.close();

      
    }




    }
}
</script>

<style scoped>
 .dialog-footer{text-align: center}
 .demo-ruleForm .el-input{width:350px}
 .demo-ruleForm .el-select{width:350px}
 .unlimited{margin-left: 20px}
</style>