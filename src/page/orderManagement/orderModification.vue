<template>
  <div>
       <!--备注信息弹窗-->
       <el-dialog title="更改状态" :visible.sync="dialogFormMark" class="city_list" width="850px" style="margin-top:-100px">
          <div style="position:relative" v-for="(item, index) in orderType" :key="index" v-show="ruleForm.orderStatus == 7 || ruleForm.orderStatus == 10 ? ruleForm.occupyStatus == item.status == 1 : ruleForm.orderStatus == item.id">
            <template v-if="ruleForm.orderStatus == 4">
              <el-button type="primary" plain icon="el-icon-check" circle size="medium"></el-button>
              <span class="sta-title">{{orderType[orderKey-1].name}}</span>
              <em class="line line1"></em>
              <el-button type="primary" plain icon="el-icon-check" circle size="medium"></el-button>
              <span class="sta-title">{{item.name}}</span>
              <span class="confirm-time">10:19:00</span>
              <em class="line line1"></em>
              <el-button circle size="medium" type="primary">&nbsp;3&nbsp;</el-button>
              <span class="sta-title">{{orderType[orderKey+1].name}}</span>
            </template>
            <template v-else>
              <el-button type="primary" plain icon="el-icon-check" circle size="medium"></el-button>
              <span class="sta-title">{{item.name}}</span>
              <em class="line line1"></em>
              <el-button type="primary" circle size="medium">&nbsp;2&nbsp;</el-button>
              <span class="sta-title">{{orderType[orderKey+1].name}}</span>
              <span class="confirm-time">10:19:00</span>
              <em class="line line2"></em>
              <el-button circle size="medium">&nbsp;3&nbsp;</el-button>
              <span class="sta-title">{{orderType[orderKey+2].name}}</span>
            </template>

           

          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
             <span style="position: relative; left: -5px; top: 28px;color: #F56C6C">*</span>
             <el-form-item style="margin-left: 5px;" label="报名人数" prop="nums"></el-form-item>
             <el-form-item>
               <div class="registration" v-for="(item, index) in ruleForm.arr" :key="index">
                 <span>{{item.name}} ￥{{item.price}} * {{item.number}}</span><br/>
                 <el-input-number v-model="item.number" @change="handleChange(item.number, item.name, item.price, item.id)" :min="0" :max="100" size="medium"></el-input-number><br/>
                 <span>余位 9</span>
               </div>
               <!-- <div class="registration">
                 <span>儿童 ￥16999.00 * 2</span><br/>
                 <el-input-number v-model="num" @change="handleChange" :min="0" :max="100" size="medium"></el-input-number><br/>
                 <span>余位 9</span>
               </div>
               <div class="registration"> 
                 <span>单房差 ￥999.00 * 0</span><br/>
               </div> -->
             </el-form-item>
             <el-form-item label="其他费用">
               <br/>
               <div v-show="index == 0" v-for="(item, index) in ruleForm.favourable" :key="index">
                  <el-input v-model="item.price" placeholder="请输入金额" class="input" @change="handleMoney"></el-input>
                  <el-input v-model="item.title" placeholder="请输入摘要" class="input"></el-input>
               </div>
               
             </el-form-item>
             <div class="price">
               <p class="totle">总价：￥{{ruleForm.money}}</p>
               <p class="surplus">剩余额度：￥{{ruleForm.balance}}</p>
             </div>
             <hr/>
             <el-form-item label="订单联系人" class="contact" prop="contactName">
               <br/>
               <el-input v-model="ruleForm.contactName" placeholder="请输入" class="input"></el-input>
             </el-form-item>
             <el-form-item label="联系电话" class="contact" prop="contactTel">
               <br/>
               <el-input v-model="ruleForm.contactTel" placeholder="请输入" class="input"></el-input>
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
               <tr v-for="(item, index) in ruleForm.guests" :key="index" @click="handleDelete(index)">
                 <td><el-input v-model="item.cnName"></el-input></td>
                 <td><el-input v-model="item.enrollName" disabled></el-input></td>
                 <td><el-input v-model="item.mobile"></el-input></td>
                 <td><el-input v-model="item.idCard"></el-input></td>
                 <td>
                   <el-select v-model="item.sex" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                 </td>
               </tr>
             </table>
             <hr/>
             <el-form-item class="button">
                <el-button @click="dialogFormMark = false">取 消</el-button>
                <el-button @click="handleSave(1)">保存更改</el-button>
                <el-button @click="handleSave(2)" type="primary" :disabled="isButton">{{orderType[orderKey+1].name}}</el-button>
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
    dialogType:0,
  },
  data() {
    return {
      a: '',
      orderKey: 0,
      orderType: [
        {
          id: 7,
          name: '预定不占',
          status: 1,
          changeId: 0,
        },
        {
          id: 7,
          name: '预定占位',
          status: 2
        },
        {
          id: 7,
          name: '确认占位',
          status: 3
        },
        {
          id: 1,
          name: '补充资料',
          status: 0
        },
        {
          id: 2,
          name: '签订合同',
          status: 0
        },
        {
          id: 3,
          name: '待出行',
          status: 0
        },
        {
          id: 4,
          name: '出行中',
          status: 0
        },
        {
          id: 6,
          name: '订单完成',
          status: 0
        },
      ],
      options: [{
        value: 1,
        label: '男'
      },{
        value: 2,
        label: '女'
      },{
        value: 3,
        label: '未知'
      }],
      isMoney: 0, // 第一次的总价
      isButton: false, // 判断更改状态按钮(置灰)
      isNum: false, // 判断人数是否超出
      //弹窗
      dialogFormMark:false,
      num:0,
      ruleForm:{},
      rules:{
        // nums: [
        //   { required: true, message: '报名类型个数不能为0', trigger: 'blur' },
        // ],
        contactName: [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
        ],
        contactTel: [
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
        this.initData();
        this.clean();
      }
    },
    money: function(newValue, oldValue) {
      if((this.ruleForm.orderStatus == 7 && this.ruleForm.occupyStatus == 3) || (this.ruleForm.orderStatus != 7)) {
        if(this.isMoney != newValue) {
          this.isButton = true;
        } else {
          this.isButton = false;
        }
      }
    }
  },
  computed: {
    money() {
      return this.ruleForm.money;
    }
  },
  methods: {
    clean() {
      this.isMoney = 0;
      this.isButton = false;
      this.isNum = false;
    },
    initData() {
      this.$http.post(this.GLOBAL.serverSrc + '/orderquery/get/api/SIOrder', {
        "orderCode": this.orderData.orderCode,
        "id": this.orderData.id
      }).then(res => {
        res.data.object.arr = [];
        res.data.object.money = 0;
        res.data.object.balance = 0;
        let contact = JSON.parse(res.data.object.contact);
        res.data.object.contactName = contact.Name;
        res.data.object.contactTel = contact.Tel;
        this.ruleForm = res.data.object;
        console.log(this.ruleForm)
        this.orderType.forEach((v,k) => {
          if(this.ruleForm.orderStatus == 7 || this.ruleForm.orderStatus == 10) {
            if(v.status == this.ruleForm.occupyStatus) this.orderKey = k;
          } else if(this.ruleForm.orderStatus == v.id) this.orderKey = k;
        })
        this.ruleForm.enrolls.forEach(v => {
          let number = this.ruleForm.guests.filter(t => v.enrollName == t.enrollName).length;
          this.ruleForm.arr.push({
            'id': v.id,
            'name': v.enrollName,
            'price': v.price_02,
            'number': number
          })
          this.ruleForm.money += number*v.price_02;
        })
        if(this.ruleForm.favourable == 0) {
          this.ruleForm.favourable.push({
            'title': '',
            'price': ''
          })
        } else {
          this.ruleForm.money += this.ruleForm.favourable[0].price
        }
        // 获取第一次的总价
        this.isMoney = this.ruleForm.money;
        // 获取剩余额度
        this.$http.post(this.GLOBAL.serverSrc + '/universal/localcomp/api/get', {
          "id": 1
        }).then(res => {
          this.ruleForm.balance = res.data.object.balance;
        })
        // console.log(this.ruleForm)

      })
    },
    // 处理总额
    handleMoney() {
      this.ruleForm.money = 0;
      this.ruleForm.enrolls.forEach(v => {
        let number = this.ruleForm.guests.filter(t => v.enrollName == t.enrollName).length;
        this.ruleForm.money += number*v.price_02;
      })
      this.ruleForm.money += Number(this.ruleForm.favourable[0].price);
    },
    handleChange(value, name, price, id) {
      let numberNum = 0;
      this.ruleForm.arr.forEach(v => numberNum+=v.number);
      if(numberNum >= this.ruleForm.guests.length) {
        for(let i=this.ruleForm.guests.length; i<value; i++) {
          this.ruleForm.guests.push({
            'id': 0,
            'cnName': '',
            'enName': 0,
            'enrollName': name,
            'mobile': '',
            'idCard': '',
            'sex': '',
            'orderCode': this.ruleForm.orderCode,
            'isDeleted': 0,
            'enrollPrice': price,
            'productType': 1,
            'enrollID': id,
            'singlePrice': price,
            'bornDate': 0,
            'credType': 0,
            'credCode': 0,
            'credTOV': 0,
            'orderID': this.ruleForm.id,
            'orgID': this.ruleForm.orgID,
            'userID': this.ruleForm.userID,
            'planID': this.ruleForm.planID,
            'teamID': this.ruleForm.teamID,
            'createTime': this.ruleForm.createTime,
            'code': 0
          })
        }
      } else {
        // let isNum = this.ruleForm.guests.length;
        // for(let i=0; i<(isNum-value); i++) {
        //   this.ruleForm.guests.pop();
        // }
      }
      this.handleMoney();
    },
    handleDelete(key) {
      let numberNum = 0;
      this.ruleForm.arr.forEach(v => numberNum+=v.number);
      if(numberNum < this.ruleForm.guests.length) {
        this.$confirm('是否删除该条信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.ruleForm.guests.splice(key, 1);
          this.handleMoney();
          if(numberNum == this.ruleForm.guests.length && this.isMoney == this.ruleForm.money) this.isButton = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    // 保存更改
    handleSave(isStatic) {
      console.log(this.ruleForm);
       this.$refs['ruleForm'].validate(valid => {
        if(valid) {
          // 报名人数为0时
          if(this.ruleForm.arr.filter(v => v.number == 0).length != 0) {
            this.$message({
              message: '请检查必填项',
              type: 'warning'
            });
            return;
          }

        // 总订单价格为0
        if(this.ruleForm.money == 0) {
          this.$message({
              message: '总订单金额为0',
              type: 'warning'
            });
          return;
        }

        // 客人信息数多于报名人数
        let numberNum = 0;
        this.ruleForm.arr.forEach(v => numberNum+=v.number);
        if(numberNum < this.ruleForm.guests.length) {
          this.$message({
              message: '请删除多于的客人资料',
              type: 'warning'
            });
          return;
        }

        // 客人信息为空
        if(this.ruleForm.guests.filter(v => v.cnName == '' || v.mobile == '' || v.idCard == '' || v.sex == '').length != 0) {
          this.$message({
              message: '客人信息为空',
              type: 'warning'
            });
          return;
        }

        let contact = {'Name': this.ruleForm.contactName, 'Tel': this.ruleForm.contactTel};

        this.$http.post(this.GLOBAL.serverSrc + '/orderquery/update/api/SIUpdate', {
          'object': {
            'id': this.ruleForm.id,
            'isDeleted': this.ruleForm.isDeleted,
            'createTime': this.ruleForm.createTime,
            'code': this.ruleForm.code,
            'orderCode': this.ruleForm.orderCode,
            'teamID': this.ruleForm.teamID,
            'planID': this.ruleForm.planID,
            'orderStatus': isStatic == 2 ? this.orderType[this.orderKey+1].id : this.ruleForm.orderStatus, // 修改状态=>下一个状态
            'refundStatus': this.ruleForm.refundStatus,
            'occupyStatus': this.orderType[this.orderKey+1].id == 7 && isStatic == 2 ? this.orderType[this.orderKey+1].status : this.ruleForm.occupyStatus, // 修改状态=>如果下一状态还是未确认更改下一状态的占位
            'payable': this.ruleForm.money, // 可修改的数据=>总额
            'favourable': this.ruleForm.favourable, // 可修改的数据=>其他费用
            'contact': JSON.stringify(contact), // 可修改数据=>订单联系人和电话
            'endTime': this.ruleForm.endTime,
            'orderChannel': this.ruleForm.orderChannel,
            'orgID': 1,
            'userID': this.ruleForm.userID,
            'number': this.ruleForm.guests.length, // 可修改的数据=>订单报名人数总数
            'productType': this.ruleForm.productType,
            'remark': this.ruleForm.remark,
            'guests': this.ruleForm.guests, // 可修改的数据=>订单报名人数信息
            'enrolls': this.ruleForm.enrolls,
            'localComp': this.ruleForm.localComp,
            'teamPackage': this.ruleForm.teamPackage,
            'plan': this.ruleForm.plan,
          }
        }).then(res => {
          this.dialogFormMark = false;
          if(isStatic == 1) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '更改成功',
              type: 'success'
            });
          }
          this.$emit('callInit', true);
        })
        }
       })
      
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