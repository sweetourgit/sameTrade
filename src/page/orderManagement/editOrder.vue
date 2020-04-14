<template>
  <div>
       <el-dialog title="修改" :visible.sync="dialogFormMark" class="city_list" width="900px" style="margin-top:-100px" @close="close">
         <el-form :rules="rules" :model="contact" ref="contact">
          <div class="people">
             <div><span class="color-red">*</span>订单联系人</div>
             <el-form-item prop="Name">
                <el-input v-model="contact.Name" class="con-el"></el-input>
             </el-form-item>
          </div>
          <div class="people">
             <div><span class="color-red">*</span>联系电话</div>
             <el-form-item prop="Tel">
                <el-input v-model="contact.Tel" class="con-el"></el-input>
             </el-form-item>
          </div>
        </el-form>
          <el-table :data="guests" ref="multipleTable" class="table" :header-cell-style="getRowClass" border :cell-style="getCellClass">   
             <el-table-column  prop="cnName" label="姓名" width="100"></el-table-column>
             <el-table-column  prop="enrollName" label="报名类型" width="120"></el-table-column>
             <el-table-column  prop="mobile" label="电话" width="120"></el-table-column>
             <el-table-column  prop="idCard" label="身份证" min-width="160"></el-table-column>
             <el-table-column  prop="sex" label="性别" width="80">
                <template slot-scope="scope">
                     <span v-if="scope.row.sex===0">男</span>
                     <span v-if="scope.row.sex===1">女</span> 
                     <span v-if="scope.row.sex===3">未选择</span>
                </template>
             </el-table-column>
             <el-table-column label="签署状态" min-width="120">
                <template slot-scope="scope">
                     <span v-if="orderForm.orderStatus===1||orderForm.orderStatus===7||orderForm.orderStatus===9||orderForm.orderStatus===10||orderForm.orderStatus===8">未签</span>
                     <span v-if="orderForm.orderStatus===2||orderForm.orderStatus===3||orderForm.orderStatus===4||orderForm.orderStatus===5||orderForm.orderStatus===6">已签</span>   
                </template>
             </el-table-column>
             <el-table-column prop="idCard" label="操作" min-width="120">
                <template slot-scope="scope">
                   <span class="color-blue" @click="fillTour(scope.$index)">编辑</span>
                </template>
             </el-table-column>
           </el-table>
           <div class="cancel">
              <el-button @click="close">&nbsp;取消&nbsp;</el-button>
              <el-button type="primary" @click="save">保存</el-button>
           </div>
       </el-dialog>
    <el-dialog :title="'出行人信息（'+winTitle+'）'" :visible.sync="dialogFormTour" class="city_list" @close="cancelInfo('conForm')" width="700px">
        <el-form :model="conForm" :rules="rules" ref="conForm" style="height:260px;">
            <el-form-item label="中文姓名" prop="cnName" label-width="110px" class="fl">
              <el-input type="text" v-model="conForm.cnName" class="w200"></el-input>
            </el-form-item>
            <el-form-item label="英文姓名" prop="enName" label-width="110px" class="fl">
              <el-input type="text" v-model="conForm.enName" class="w200"></el-input>
            </el-form-item>
            <div style="clear:both;"></div>
            <el-form-item label="性别" prop="sex" label-width="110px" class="fl" style="width:310px;">
              <el-radio-group v-model="conForm.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="电话" prop="mobile" label-width="110px" class="fl">
              <el-input type="text" v-model="conForm.mobile" class="w200"></el-input>
            </el-form-item>
            <el-form-item label="身份证" prop="idCard" label-width="110px" class="fl">
              <el-input type="text" v-model="conForm.idCard" class="w200"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="bornDate" label-width="110px" class="fl">
              <el-date-picker
                v-model="conForm.bornDate"
                type="date"
                placeholder="选择日期"
                style="width:200px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="证件类型" prop="credType" label-width="110px" class="fl">
              <el-select v-model="conForm.credType" placeholder="请选择" style="width:200px;">
                <el-option label="请选择" :value="0" />
                <el-option label="护照" :value="1" />
                <el-option label="港澳通行证" :value="2" />
                <el-option label="军官证" :value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="credCode" label-width="110px" class="fl">
              <el-input type="text" v-model="conForm.credCode" class="w200"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer cb">
          <el-button @click="cancelInfo('conForm')">取 消</el-button>
          <el-button type="primary" @click="subInfo('conForm')">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    orderData: '',
    variable:0,
    dialogType:0,
  },
  data() {
    return {
      dialogFormMark:false,
      orderForm:{},
      guests:[],
      contact:{},
      dialogFormTour:false,
      winTitle:'',
      conForm:{},
      guestsi:0,
      rules: {
            Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            Tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
            cnName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            enName: [
              { required: true, message: "请输入姓（拼音）", trigger: "blur" },
              {
                pattern: /(a[io]?|ou?|e[inr]?|ang?|ng|[bmp](a[io]?|[aei]ng?|ei|ie?|ia[no]|o|u)|pou|me|m[io]u|[fw](a|[ae]ng?|ei|o|u)|fou|wai|[dt](a[io]?|an|e|[aeio]ng|ie?|ia[no]|ou|u[ino]?|uan)|dei|diu|[nl](a[io]?|ei?|[eio]ng|i[eu]?|i?ang?|iao|in|ou|u[eo]?|ve?|uan)|nen|lia|lun|[ghk](a[io]?|[ae]ng?|e|ong|ou|u[aino]?|uai|uang?)|[gh]ei|[jqx](i(ao?|ang?|e|ng?|ong|u)?|u[en]?|uan)|([csz]h?|r)([ae]ng?|ao|e|i|ou|u[ino]?|uan)|[csz](ai?|ong)|[csz]h(ai?|uai|uang)|zei|[sz]hua|([cz]h|r)ong|y(ao?|[ai]ng?|e|i|ong|ou|u[en]?|uan))/,
                message: "姓（拼音）格式不正确"
              }
            ],
            sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
            mobile: [
              { required: true, message: "请输入手机号", trigger: "blur" },
              {
                pattern: /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[0|1|2|3|5|6|7|8]|18[0-9]|19[8|9])\d{8}$/,
                message: "手机号格式不正确", trigger: "blur"
              }
            ],
        }
    }
  },
  created(){
  },
  watch: {
    variable:function(){        
      if(this.dialogType==3){
        this.dialogFormMark=true;    
        this.getOrderData();
      }
    }
  },
  methods: {
    getOrderData(){
      this.$http.post(this.GLOBAL.serverSrc + '/indirect/orderquery/get/siorders', {
        "orderCode": this.orderData.orderCode,
        "id": this.orderData.id
      }).then(res => {
        this.orderForm = res.data.object;
        this.guests = this.orderForm.guests;
        this.contact = JSON.parse(this.orderForm.contact);
      })
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#f7f7f7;height:50px;textAlign:center;color:#333;fontSize:15px'
      } else {
        return ''
      }
    },
    getCellClass(){
      return 'textAlign:center'
    },
    close(){
      this.dialogFormMark=false;
      this.$refs['contact'].resetFields();
      this.orderForm={};
      this.guests=[];
    },
    fillTour(index){
      this.dialogFormTour = true;
      this.winTitle=this.guests[index].enrollName;
      this.conForm=JSON.parse(JSON.stringify(this.guests[index]));
      if(this.conForm.sex==3){
        this.conForm.sex='';
      }
      this.guestsi=index;
    },
    cancelInfo(formName) {
      this.dialogFormTour = false;
      setTimeout(() => {
        this.$refs[formName].resetFields();
      },300);  
    },
    subInfo(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$set(this.guests,this.guestsi,JSON.parse(JSON.stringify(this.conForm)))
          this.cancelInfo(formName);
        }
      })
    },
    save(){
      this.$refs['contact'].validate(valid => {
        if(valid) {
          let guest=JSON.parse(JSON.stringify(this.guests));
          for(let i = 0;i < guest.length;i++){
                guest[i].bornDate=new Date(guest[i].bornDate).getTime();
          };
          this.$http.post(this.GLOBAL.serverSrc + '/indirect/order/mobile/update', {
              "object":{
                "orderCode":this.orderForm.orderCode,
                "plan": {
                  "groupCode":this.orderForm.groupCode
                },
                "favourable":this.orderForm.favourable,
                "guests":guest,
                "number":this.orderForm.number,
                "id":this.orderForm.id,
                "payable": this.orderForm.payable,
                "contact":JSON.stringify(this.contact),
                "occupyStatus":this.orderForm.occupyStatus,
                "orderStatus":this.orderForm.orderStatus,
                "localComp":{
                  "id":this.orderForm.localCompID,
                  "settlementType":this.orderForm.settlementType
                }
              }
          }).then(res => {
              if(res.data.isSuccess == true){
               this.$message.success("修改成功");
               this.close();
              }
          })
        }
      })
    }




  }
}
</script>

<style scoped>
   .demo-ruleForm{margin-top: 20px}
   .remark{width: 600px}
   .time{margin-right: 60px;text-align: right;color: #999}
   .submitMark{float: right;margin-right: 60px}
   .colse{margin-left: 230px;width: 100px}
   .table{margin-top: 15px}
   .cancel{margin: 15px 0 0 0;text-align: right;}
   .table_span:not(:first-child){margin-left: 10px;}
   .color-blue{color:#409EFF}
   .color-red{color:red;margin-right: 5px}
   .w200{width: 200px}
   .dialog-footer{position: absolute;top: 8px;right: 15px}
   .fl{float:left}
   .people{width:400px; float:left; margin:0 0 15px 0;}
   .con-el{width:300px;margin-top: 10px;}
</style>