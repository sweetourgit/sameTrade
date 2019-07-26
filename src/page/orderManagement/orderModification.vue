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
                 <span>儿童 ￥16999.00 * 2</span><br/>
                 <el-input-number v-model="num" @change="handleChange" :min="0" :max="100" size="medium"></el-input-number>
               </div>
               <div class="registration">
                 <span>单房差 ￥999.00 * 0</span><br/>
               </div>
             </el-form-item>
             <el-form-item label="其他费用">
               <br/>
               <el-input v-model="ruleForm.otherCost" placeholder="请输入金额" class="input"></el-input>
               <el-input v-model="ruleForm.otherCostRemark" placeholder="请输入摘要" class="input"></el-input>
             </el-form-item>
             <div class="price">
               <p class="totle">总价：￥32980.00</p>
               <p class="surplus">剩余额度：￥400,000.00</p>
             </div>
             <hr/>
             <el-form-item label="订单联系人" class="contact" prop="name">
               <br/>
               <el-input v-model="ruleForm.name" placeholder="请输入" class="input"></el-input>
             </el-form-item>
             <el-form-item label="联系电话" class="contact" prop="phone">
               <br/>
               <el-input v-model="ruleForm.phone" placeholder="请输入" class="input"></el-input>
             </el-form-item>
             <hr/> 
             <table cellpadding="5" cellspacing="0" width="100%" class="tour-list">
               <tr bgcolor="#f7f7f7">
                 <td width="100">姓名</td>
                 <td width="160">报名类型</td>
                 <td width="160">电话</td>
                 <td>身份证</td>
                 <td width="100">性别</td>
               </tr>
               <tr>
                 <td><el-input></el-input></td>
                 <td><el-input></el-input></td>
                 <td><el-input></el-input></td>
                 <td><el-input></el-input></td>
                 <td><el-input></el-input></td>
               </tr>
             </table>
             <hr/>
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
      dialogFormMark:false,
      num:0,
      ruleForm:{
        otherCost:"1000",
        otherCostRemark:'123',
        name:'',
        phone:'',
       
      },
      rules:{
        nums: [
          { required: true, message: '', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
        ]
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
   .button{margin:20px 0 0 10px;text-align: right}
   .registration{float: left;margin:-5px 25px 20px 10px;text-align: center}
   .el-input-number--medium{width: 150px}
   .input{width: 200px;margin-right: 10px}
   .price{margin-top:-40px;text-align: right;}
   .price p{margin:8px 0}
   .totle{font-size: 17px;font-weight: bold;}
   .surplus{font-size: 12px;}
   hr{background-color: #eee;height: 1px;border:0;clear: both}
   .contact{float: left;margin:35px 50px 30px 0}
   .contact .el-input{width: 300px}
   .tour-list{margin: 35px 0;line-height: 35px;border-top:1px solid #eee;border-left:1px solid #eee;text-align: center;}
   .tour-list td{border-right:1px solid #eee;border-bottom:1px solid #eee;}
</style>