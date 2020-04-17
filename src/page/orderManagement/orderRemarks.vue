<template>
  <div>
       <el-dialog title="备注" :visible.sync="dialogFormMark" class="city_list" width="780px" @close="close">
          <el-form :model="markFormAdd" :rules="rules" ref="markFormAdd" label-width="80px" class="demo-ruleForm">
               <div v-for="item in markForms">
               <el-form-item :label="name">            
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="remark" placeholder="请输入内容" v-model="item.content" :disabled="true"></el-input>
                  <div class="time">{{item.CreateTime}}</div>
               </el-form-item>
               </div>
               <el-form-item label="填写备注" prop="content">            
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="remark" placeholder="请输入内容" v-model="markFormAdd.content"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button type="info" size="medium" class="submitMark" @click="submitMark">提交备注</el-button>
               </el-form-item>
               <el-form-item>
                  <el-button class="colse" @click="close">关闭</el-button>
               </el-form-item>
          </el-form>
       </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
       name: JSON.parse(sessionStorage.getItem('tyUserInfo')).name,
       dialogFormMark: false,     
       markFormAdd: {
         'content': '',
       },
       markForms: [],
       rules: {      
         content: [{ required: true, message: '请填写备注信息', trigger: 'blur' }]
       }
    }
  },
  props: {
    orderData: '',
    variable: 0,
    dialogType: 0
  },
  created () {
  },
  watch: {
      variable: function(){        
        if(this.dialogType == 2){
          this.getCommentList();
          this.dialogFormMark = true;    
        }
     }
  },
  methods: {
      getCommentList (orderId) {
        this.$http.post(this.GLOBAL.serverSrc + '/indirect/orderquery/get/GetOrderCommentList',{
             "orderCode": this.orderData.orderCode
          }).then(res => {
            if(res.data.isSuccess == true){
               this.markForms = res.data.objects;
            }
          }).catch(err => {
        })
      },
      close () {
        this.dialogFormMark = false;
        this.$refs['markFormAdd'].resetFields();
      },
      formatDate (date) {
       var y = date.getFullYear();  
       var m = date.getMonth() + 1;  
           m = m < 10 ? ('0' + m) : m;  
       var d = date.getDate();  
           d = d < 10 ? ('0' + d) : d;  
       var h = date.getHours();  
           h = h < 10 ? ('0' + h) : h;  
       var minute = date.getMinutes();  
           minute = minute < 10 ? ('0' + minute) : minute;  
       var second = date.getSeconds();  
           second = second < 10 ? ('0' + second) : second;  
           return y + '-' + m + '-' + d +' '+ h + ':' + minute + ':' + second;
      },
      submitMark () {
        this.$refs['markFormAdd'].validate((valid) => {
          if (valid) {
            this.$http.post(this.GLOBAL.serverSrc + '/indirect/orderquery/get/inserordercomment', {
              'object': {
                'id': this.orderData.id,
                'userID': JSON.parse(sessionStorage.getItem('tyUserInfo')).id, 
                'orderCode': this.orderData.orderCode,
                'content': this.markFormAdd.content,
                'createTime': new Date(),
                'isDeleted': 0
              }
            }).then(res => {
              this.dialogFormMark = false;
              this.$message.success('保存成功');
            })
          }
        })     
      },
    }
}
</script>

<style scoped>
   .demo-ruleForm{margin-top: 20px}
   .remark{width: 600px}
   .time{margin-right: 60px;text-align: right;color: #999}
   .submitMark{float: right;margin-right: 60px}
   .colse{margin-left: 230px;width: 100px}
</style>