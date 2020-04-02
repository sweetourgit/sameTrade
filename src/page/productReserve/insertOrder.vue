<template>
  <div class="reserveList">
    <div class="fr">
      <el-button type="primary" @click="submit">预订</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
    <div class="reserveTitle">
      <span>{{productInfo.title}}</span>
    </div>
    <table class="reserveTable">
      <tr>
        <td>
          <div class="reserveTd_01">团期计划：</div>
          <div class="reserveTd_02">{{productInfo.groupCode}}</div>
        </td>
        <td>
          <div class="reserveTd_01">套餐名称：</div>
          <div class="reserveTd_02">{{productInfo.package}}</div>
        </td>
        <td>
          <div class="reserveTd_01">出发地：</div>
          <div class="reserveTd_02">{{productInfo.pod}}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="reserveTd_01">目的地：</div>
          <div class="reserveTd_02">{{productInfo.destination}}</div>
        </td>
        <td>
          <div class="reserveTd_01">出发日期：</div>
          <div class="reserveTd_02">{{productInfo.date}}</div>
        </td>
        <td>
          <div class="reserveTd_01">同业：</div>
          <div class="reserveTd_02">{{localcomp.name}}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="reserveTd_01">余位：</div>
          <div class="reserveTd_02">{{tourInfo.remaining}}</div>
        </td>
        <td colspan="2" v-if="localcomp.settlementType==1">
          <div class="reserveTd_01">剩余额度：</div>
          <div class="reserveTd_02">{{localcomp.balance}}</div>
        </td>
      </tr>
    </table>
    <!--同业销售-->
    <div class="switchText">
      <div class="table_details">
        <el-form :rules="rules" :model="sales" ref="sales">
          <div><span class="table_details_01">*</span>同业销售</div>
          <el-form-item prop="tradeSales" class="ml10">
            <el-select v-model="sales.tradeSales" placeholder="请选择">
              <el-option v-for="item in localcomp.jqAdminList" :key="item.id" :label="item.name" :value="item.userCode"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!--
      <div class="table_details">
        <div><span class="table_details_01">*</span>直客价：</div>
        <div class="table_details_02"><el-switch class="switchButton" v-model="customerPrice"></el-switch></div>
      </div>
      -->
      <div class="line"></div>
      <!--报名人数-->
      <div><span class="table_details_01">*</span>报名人数</div>
      <div class="mb10">
        <div class="adult" v-for="(item,index) in tourInfo.enrolls" >
            <div class="ml10">{{item.enrollName}}￥{{customerPrice==true?item.price_01:item.price_02}}*{{item.adult}}</div>
            <div class="ml10"><el-input-number @change="handleChange(item,index)" v-model="item.adult" :min="0" :max="item.quota==0?tourInfo.remaining:item.quota" size="mini"></el-input-number></div>
            <div class="color-red" v-if="index==0"><span v-show="ifMsg">{{msg}}</span></div>
        </div>
        <!--<div class="children">单房差￥16999.00*2</div>-->
        <div class="order">
          <div class="ml10">其他费用</div>
          <div class="ml10">
            <el-input class="order_input01" v-model="otherPrice" placeholder="请输入金额"></el-input>
            <el-input class="order_input02" v-model="otherNote" placeholder="请输入摘要"></el-input>
          </div>

        </div>
        <div class="total"><span class="total-price">总价：￥{{total}}</span></br><span v-if="localcomp.settlementType==1">剩余预存款和额度：{{localcomp.balance}}</span></div>
        <div class="line"></div>
        <div><span class="table_details_01">*</span>下单方式</div>
        <div class="ml10">
          <el-radio v-model="order" label="3">确认占位</el-radio>
          <!--
          <el-radio v-model="order" label="2">预订占位</el-radio>
          <el-radio v-model="order" label="1">预订不占位</el-radio>
          -->
        </div>
      </div>
    </div>
    <!--联系人-->
    <div class="switchText mb10">
      <el-form :rules="rules" :model="contact" ref="contact">
        <div class="people">
          <div><span class="table_details_01">*</span>订单联系人</div>
          <el-form-item prop="Name" class="ml10">
            <el-input v-model="contact.Name" class="w300"></el-input>
          </el-form-item>
        </div>
        <div class="people">
          <div><span class="table_details_01">*</span>联系电话</div>
          <el-form-item prop="Tel" class="ml10">
            <el-input v-model="contact.Tel" class="w300"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="line"></div>
      <!--游客-->
      <table cellpadding="3" cellspacing="1" width="1080" class="tour-list">
        <tr bgcolor="#f7f7f7">
          <td width="100">姓名</td>
          <td width="160">报名类型</td>
          <td width="160">电话</td>
          <td>身份证</td>
          <td width="100">性别</td>
          <td width="100">操作</td>
        </tr>
        <tbody v-for="(item, i) in guests" :key="i" bgcolor="#fff">
          <tr v-for="(data, k) in item" :key="k">
            <td>{{data.cnName==''?data.enrollName+(k+1):data.cnName}}</td>
            <td>{{data.enrollName}}</td>
            <td>{{data.mobile}}</td>
            <td>{{data.idCard}}</td>
            <td>
              <span v-if="data.sex==0">男</span>
              <span v-if="data.sex==1">女</span>
            </td>
            <td>
              <span class="color-blue" @click="fillTour(i,k)">编辑</span> |
              <span class="color-blue" @click="handleDelete(i,k)">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
      <!--填写游客信息-->
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
  </div>
</template>
<script>
  export default{
    data() {
      return {
          tyUserInfo:{},
          productInfo:{},
          tourInfo:{},
          tourInfoCopy:{},
          localcomp:{},
          customerPrice:false,//直客价开关
          sales:{
            tradeSales:'' //同业销售model
          },
          otherPrice:'',
          otherNote:'',
          total:0,
          order:'3',//下单方式
          contact:{
            Name:'',
            Tel:'',
          },
          guests:[],
          dialogFormTour:false,
          winTitle:'',
          conForm:{},
          guestsi:0,
          guestsk:0,
          ifMsg:false,
          msg:"",
          rules: {
            Name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            Tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
            tradeSales: [{ required: true, message: "请选择同业销售", trigger: "blur" }],
            cnName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
            enName: [
              { required: true, message: "请输入姓（拼音）", trigger: "blur" },
              {
                pattern: /(a[io]?|ou?|e[inr]?|ang?|ng|[bmp](a[io]?|[aei]ng?|ei|ie?|ia[no]|o|u)|pou|me|m[io]u|[fw](a|[ae]ng?|ei|o|u)|fou|wai|[dt](a[io]?|an|e|[aeio]ng|ie?|ia[no]|ou|u[ino]?|uan)|dei|diu|[nl](a[io]?|ei?|[eio]ng|i[eu]?|i?ang?|iao|in|ou|u[eo]?|ve?|uan)|nen|lia|lun|[ghk](a[io]?|[ae]ng?|e|ong|ou|u[aino]?|uai|uang?)|[gh]ei|[jqx](i(ao?|ang?|e|ng?|ong|u)?|u[en]?|uan)|([csz]h?|r)([ae]ng?|ao|e|i|ou|u[ino]?|uan)|[csz](ai?|ong)|[csz]h(ai?|uai|uang)|zei|[sz]hua|([cz]h|r)ong|y(ao?|[ai]ng?|e|i|ong|ou|u[en]?|uan))/,
                message: "姓（拼音）格式不正确"
              }
            ],
            sex: [{ required: true, message: "请选择性别", trigger: "change" }],
            mobile: [
              { required: true, message: "请输入手机号", trigger: "blur" },
              {
                pattern: /^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|16[6]|17[0|1|2|3|5|6|7|8]|18[0-9]|19[8|9])\d{8}$/,
                message: "手机号格式不正确"
              }
            ],
        }
      }
    },
    watch:{
      otherPrice:function(){
        this.changecout()
      },
      customerPrice:function(){
        this.changecout()
      }
    },
    beforeDestroy(){
      sessionStorage.removeItem('tourInfo')
    },
    mounted(){
      this.tyUserInfo=JSON.parse(sessionStorage.getItem('tyUserInfo'));
      this.getTourInfo();
      this.getProductInfo();
      this.getLocalcomp();
      this.changecout();
      this.changeinfo();
    },
    methods:{
      getTourInfo(){
        const tourInfo = sessionStorage.getItem('tourInfo');
          if(tourInfo){
            this.tourInfo = JSON.parse(tourInfo);
          }else{
            this.tourInfo = this.$route.params.page;
            sessionStorage.setItem('tourInfo', JSON.stringify(this.$route.params.page));
          }
      },
      getProductInfo(){
        this.$http.post(this.GLOBAL.serverSrc + "/indirect/teamquery/get/siteampreview",{
            "planID":this.tourInfo.id,
            "localCompID": this.tyUserInfo.localCompID
        })
        .then(res => {
          this.productInfo = res.data.object;
        })
        .catch(res => {
        })         
      },
      getLocalcomp(){  //获取同业社名称额度
          this.$http.post(this.GLOBAL.serverSrc + "/indirect/localcomp/api/get",{
             "id":this.tyUserInfo.localCompID
            },
          ).then(res => {
              this.localcomp = res.data.object;
          })
          .catch(res => {
          })
      },
      changecout(){
          this.total = 0;
          this.tourInfo.enrolls.forEach(v=>{
              if(this.customerPrice == true){
                this.total += v.adult * v.price_01
              }else{
                this.total += v.adult * v.price_02
              }
          })
          this.total += parseInt(this.otherPrice!=''?this.otherPrice:0)
      },
      changeinfo(){
          this.tourInfo.enrolls.forEach(v=>{
              this.guests.push([]);
          })
          for(var i= 0; i< this.guests.length; i++){
            for(var j=0; j< this.tourInfo.enrolls[i].adult; j++){
                this.guests[i].push({
                    'cnName': '',
                    'enName': '',
                    'enrollName': this.tourInfo.enrolls[i].enrollName,
                    'mobile': '',
                    'idCard': '',
                    'sex': 3,
                    'isDeleted': 0,
                    'enrollPrice': 0,
                    'productType': 1,
                    'enrollID': this.tourInfo.enrolls[i].enrollID,
                    'singlePrice': 0,
                    'bornDate': 0,
                    'credType': 0,
                    'credCode': "",
                    'orderID': 0,
                    'orgID': this.tyUserInfo.localCompID,
                    'userID': this.tyUserInfo.id,
                    "teamID":this.$route.query.id,
                    "planID":this.tourInfo.id,
                    'createTime': Date.parse(new Date()),
                    'code': 0
                })
              }
          }
          this.tourInfoCopy=JSON.parse(JSON.stringify(this.tourInfo));
      },
      handleChange(val,index){
          this.ifMsg=false;
          if(val.adult > this.tourInfoCopy.enrolls[index].adult) {
                  this.guests[index].push({
                      'cnName': '',
                      'enName': '',
                      'enrollName': val.enrollName,
                      'mobile': '',
                      'idCard': '',
                      'sex': 3,
                      'isDeleted': 0,
                      'enrollPrice': 0,
                      'productType': 1,
                      'enrollID': val.enrollID,
                      'singlePrice': 0,
                      'bornDate': 0,
                      'credType': 0,
                      'credCode': "",
                      'orderID': 0,
                      'orgID': this.tyUserInfo.localCompID,
                      'userID': this.tyUserInfo.id,
                      "teamID":this.$route.query.id,
                      "planID":this.tourInfo.id,
                      'createTime': Date.parse(new Date()),
                      'code': 0
                  })
          }else{
              if(this.guests[index].length==1){
                this.guests[index]=[];
              }
              for(var i = this.guests[index].length; i > 0; i--){
                if(this.guests[index][i-1].enName == "") {
                  this.guests[index].splice(i-1,1);
                  break;
                }
              }

          }
          this.tourInfoCopy=JSON.parse(JSON.stringify(this.tourInfo));
          this.changecout();
        },
        handleDelete(i,k){
              this.$confirm('是否删除该条信息', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.guests[i].splice(k,1);
                  this.tourInfo.enrolls[i].adult--;
                  this.$message.success("删除成功");
                  this.tourInfoCopy=JSON.parse(JSON.stringify(this.tourInfo));
                  this.changecout();
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  })
              })
        },
        cancel(){
          this.$router.push({
            path: '/productDetails',
            query: {
              id:this.$route.query.id,
            }
          })
        },
        fillTour(i,k){
          this.dialogFormTour = true;
          this.winTitle=this.guests[i][k].enrollName;
          this.conForm=JSON.parse(JSON.stringify(this.guests[i][k]));
          this.guestsi=i;
          this.guestsk=k;
        },
        cancelInfo(formName) {
          this.dialogFormTour = false;
          this.$refs[formName].resetFields();
        },
        subInfo(formName){
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.guests[this.guestsi][this.guestsk]=JSON.parse(JSON.stringify(this.conForm));
              this.cancelInfo(formName);
            }
          })
        },
       submit(){
         let a=true,b=true;
         this.$refs['sales'].validate(valid => {
          if(!valid){ 
              a=false
            }
          })
         this.$refs['contact'].validate(valid => {
          if(!valid){ 
              b=false
            }
          })
          
          let cout = 0;
          this.tourInfo.enrolls.forEach(v =>{
              cout+= parseInt(v.adult)
          });
          
          this.ifMsg=false;
          if(cout==0){
            this.ifMsg=true;
            this.msg="报名类型个数为0,不能下单";
            return;
          }
          if(cout>this.tourInfo.remaining){
            this.ifMsg=true;
            this.msg="报名总人数不能超过余位";
            return;
          }
          if(a==false||b==false){
            return
          }
          if(this.localcomp.settlementType==1){
             if(this.total>this.localcomp.balance){
               this.$message.error('剩余额度小于订单总额');
               return;
             }
          }
          let details="";//成人 3000.00 * 2 儿童 3000.00*1

          let guestAll=[];
          for(let i = 0;i < this.guests.length;i++){
              details+=this.tourInfo.enrolls[i].enrollName;
              details+=this.customerPrice == true?this.tourInfo.enrolls[i].price_01:this.tourInfo.enrolls[i].price_02;
              details+='*'+this.guests[i].length;
              for(let j = 0;j < this.guests[i].length;j++) {
                if(this.customerPrice == true) {
                  this.guests[i][j].singlePrice = this.tourInfo.enrolls[i].price_01;
                }else{
                  this.guests[i][j].singlePrice = this.tourInfo.enrolls[i].price_02;
                }
                this.guests[i][j].orgID=this.tyUserInfo.localCompID;
                this.guests[i][j].userID=this.tyUserInfo.id;
                guestAll.push(this.guests[i][j]);
              }
          };
          this.$http.post(this.GLOBAL.serverSrc + "/indirect/order/mobile/insert",
              {"object": {
                  "teamID": this.$route.query.id,
                  "planID": this.tourInfo.id,
                  "orderStatus": 0,
                  "refundStatus": 0,
                  "occupyStatus": this.order,
                  "payable": this.total,
                  "favourable": [
                    {
                      "id": 0,
                      "orderID": 0,
                      "price": this.otherPrice?this.otherPrice:0,
                      "title": "其他费用",
                      "favMode": 1,
                      "mark": this.otherNote
                    },
                    {
                      "id": 0,
                      "orderID": 0,
                      "price": 0,
                      "title": "整体优惠",
                      "favMode": 2,
                      "mark": ""
                    }
                  ],
                  "contact": JSON.stringify(this.contact),
                  "endTime": 0,
                  "orgID": this.tyUserInfo.localCompID,
                  "userID": this.tyUserInfo.id,
                  "guests": guestAll,
                  "number": cout,
                  "productType": 1,
                  "remark": "",
                  "topID": this.tyUserInfo.topID,
                  "platform": 2,  //JQERP = 1,同业系统=2
                  "enrollDetail": details,
                  "plan": {
                    "id": this.tourInfo.id,
                  },
                  "settlementType": this.localcomp.settlementType,
                  "indirectSale":this.sales.tradeSales
                }
            }
          ).then(res=>{
             if(res.data.isSuccess==true){
               this.$message.success("提交成功");
               this.cancel();
             }else{
               this.$message.error(res.data.result.message); 
             }       
          })
        
     },
    }
  }
</script>

<style scoped>
.reserveList{ width: 1100px; overflow: hidden; font-size: 14px; margin: 0 0 100px 0;}
.reserveTitle{ width: 1100px; background: #f6f6f6; line-height: 40px; overflow: hidden;margin: 60px 0 0 0; }
.reserveTitle span{ margin: 0 0 0 10px; }
.reserveTable{ width: 1100px; background: #f6f6f6; line-height: 40px; overflow: hidden;margin:20px 0 0 0; }
.reserveTable td{width: 360px;}
.reserveTd_01{width:80px; text-align:right; overflow: hidden;float: left;}
.reserveTd_02{margin: 0 0 0 10px;text-align: left; float: left;width: 270px}
.switchText{ width: 1100px; background: #f6f6f6; line-height: 40px; overflow: hidden;margin:20px 0 0 0;}
.switchText td{width: 260px;}
.table_details{float:left; width:450px; margin: 0 0 15px 0;}
.table_details_01{color:red; margin:0 0 0 10px;}
.table_details_02{ margin:0 0 0 10px;}
.line{width: 1080px; text-align: center; height: 1px; background: #e5e5e5; overflow: hidden; margin: 0 0 0 10px;}
.mb10{margin-bottom:10px; }
.ml10{margin-left:10px; }
.adult{float:left; width:200px; text-align:center;}
.children{float:left; width:150px; text-align:center; margin:0 0 0 30px;}
.order{float:left;margin:0 0 0 30px;}
.fr{float:right}
.fl{float:left}
.order_input01{float:left;width:200px;}
.order_input02{float:left;width:200px; margin:0 0 0 20px}
.people{width:400px; float:left; margin:0 0 15px 0;}
.w300{width: 300px;}
.tableData{width: 901px; clear: both;overflow: hidden;}
.tour-list{margin: 10px;text-align: center;background-color:#eaeaea}
.color-blue{color: #409EFF}
.color-red{height: 40px;color: #ff0000}
.w200{width: 200px}
.dialog-footer{position: absolute;top: 8px;right: 15px}
.total{float: right;margin-right: 20px;margin-top: 50px;line-height: 25px}
.total-price{font-size: 17px;font-weight: bold;}
</style>

