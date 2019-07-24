<template>
  <div>
       <!--备注信息弹窗-->
       <el-dialog title="更改状态" :visible.sync="dialogFormMark" class="city_list" width="850px" style="margin-top:-100px">
          <div style="position:relative">
            <el-button type="primary" plain icon="el-icon-check" circle size="medium"></el-button>
            <span class="sta-title">预定不占</span>
            <em class="line line1"></em>
            <el-button type="primary" circle size="medium">&nbsp;2&nbsp;</el-button>
            <span class="sta-title">预定占位</span>
            <span class="confirm-time">10:19:00</span>
            <em class="line line2"></em>
            <el-button circle size="medium">&nbsp;3&nbsp;</el-button>
            <span class="sta-title">确认占位</span>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
             <el-form-item label="报名人数" prop="nums"></el-form-item>
             <el-form-item>
               <div class="registration">
                 <span>成人 ￥16999.00 * 2</span><br/>
                 <el-input-number v-model="num" @change="handleChange" :min="0" :max="100" size="medium"></el-input-number>
               </div>
               <div class="registration">
                 <span>成人 ￥16999.00 * 2</span><br/>
                 <el-input-number v-model="num" @change="handleChange" :min="0" :max="100" size="medium"></el-input-number>
               </div>
               <div class="registration">
                 <span>单房差 ￥999.00 * 0</span><br/>
               </div>
             </el-form-item>
             <el-form-item label="其他费用">
               <br/>
               <el-input v-model="input" placeholder="请输入金额" class="input"></el-input>
               <el-input v-model="input" placeholder="请输入摘要" class="input"></el-input>
             </el-form-item>


             <el-form-item class="button">
                <el-button>取 消</el-button>
                <el-button>保存更改</el-button>
                <el-button type="primary">预定占位</el-button>
             </el-form-item>
          </el-form>





       </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    orderId:0,
    variable:0,
    dialogType:0
  },
  data() {
    return {
      //弹窗
      dialogFormMark:true,
      num:0,
      ruleForm:{
        

      },
      rules:{
        nums: [
          { required: true, message: '', trigger: 'blur' },
        ],
      }
    }
  },
  created(){
  },
  watch: {
      variable:function(){        
        if(this.dialogType==2){
          this.dialogFormMark=true;    
        }
     }
  },
  methods: {
      handleChange(value) {
        console.log(value);
      }
    }
}
</script>

<style scoped>
   .demo-ruleForm{margin-top: 20px}
   .line{display: inline-block;margin: 5px 8px;height: 2px;width: 220px}
   .line1{background-color: #2e94f9}
   .line2{background-color: #eee}
   .sta-title{font-size: 16px}
   .confirm-time{position: absolute;top:30px;left:394px}
   .button{margin: 10px;text-align: right}
   .registration{float: left;margin:-10px 25px 10px 10px;text-align: center}
   .el-input-number--medium{width: 150px}
   .input{width: 200px;margin-right: 10px}
</style>