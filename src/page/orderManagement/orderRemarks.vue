<template>
  <div>
       <!--备注信息弹窗-->
       <el-dialog title="备注" :visible.sync="dialogFormMark" class="city_list" width="780px" @close="close">
          <el-form :model="markFormAdd" :rules="rules" ref="markFormAdd" label-width="80px" class="demo-ruleForm">
               <el-form-item label="备注" prop="Mark">            
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" class="remark" placeholder="请输入备注" v-model="markFormAdd.Mark"></el-input>
               </el-form-item>
               <el-form-item class="submitMark">                               
                  <el-button @click="close">取消</el-button>
                  <el-button type="primary" @click="submitMark">保存</el-button>
               </el-form-item>
          </el-form>
       </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    orderData: '',
    variable:0,
    dialogType:0
  },
  data() {
    return {
      a: '',
       //备注信息弹窗
       dialogFormMark:false,     
       markFormAdd:{
        Mark:''
       },
       rules:{      
         Mark: [{ required: true, message: '请填写备注信息', trigger: 'blur' }]
       }
    }
  },
  created(){
  },
  watch: {
      variable:function(){        
        if(this.dialogType==3){
          //this.orderGet(this.orderId);
          this.dialogFormMark=true;    
        }
     }
  },
  methods: {
      close(){
        this.dialogFormMark=false;
        this.$refs['markFormAdd'].resetFields();
      },
      // 返回 类似 2016-01-02 格式的字符串
      formatDate(year, month, day) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d;
      },
      submitMark(){
        let time = this.formatDate(
          new Date(Date.parse(new Date())).getFullYear(),
          new Date(Date.parse(new Date())).getMonth() + 1,
          new Date(Date.parse(new Date())).getDate())
        this.$refs['markFormAdd'].validate((valid) => {
          this.$http.post(this.GLOBAL.serverSrc + '/orderquery/get/api/InserOrderComment', {
            'object': {
              'id': this.orderData.id,
              'userID': sessionStorage.getItem('id'), 
              'orderCode': this.orderData.orderCode,
              'content': this.markFormAdd.Mark,
              'createTime': time,
              'isDeleted': 0
            }
          }).then(res => {
            console.log(res)
            this.dialogFormMark = false;
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          })
        });     
      },
    }
}
</script>

<style scoped>
   .demo-ruleForm{margin-top: 20px}
   .remark{width: 600px}
   .submitMark{text-align: right;margin-right: 60px}
</style>