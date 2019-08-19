<template>
  <div>
       <!--备注信息弹窗-->
       <el-dialog title="详情" :visible.sync="dialogFormMark" class="city_list" width="800px" style="margin-top:-100px">
          <table border="0" cellpadding="7" cellspacing="10" bgcolor="#f7f7f7" width="760" style="margin-top:-10px">
              <tr>
                  <td>产品名称：</td>
                  <td>{{orderForm.name}}</td>
              </tr>
              <tr>
                  <td>订单ID：</td>
                  <td>{{orderForm.orderCode}}</td>
              </tr>
              <tr>
                  <td>团期计划：</td>
                  <td>{{orderForm.planID}}</td>
              </tr> 
              <tr>
                  <td>下单时间：</td>
                  <td>{{orderForm.createTime}}</td>
              </tr>
              <tr>
                  <td>出发日期：</td>
                  <td>{{orderForm.planTime}}</td>
              </tr>
              <tr>
                  <td>订单状态：</td>
                  <td v-show="orderForm.orderStatus == 1">补充游客材料 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 2">电子合同 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 3">待出行 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 4">旅游中 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 5">待评价 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 6">完成 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 7">未确认 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 8">签署合同 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 9">作废订单 （占位预留 2018/09/11 13:37）</td>
                  <td v-show="orderForm.orderStatus == 10">确认占位 （占位预留 2018/09/11 13:37）</td>
              </tr>
              <tr>
                  <td>套餐名称：</td>
                  <td>{{orderForm.package}}</td>
              </tr>
              <tr>
                  <td>出发地：</td>
                  <td>{{orderForm.place1}}</td>
              </tr>
              <tr>
                  <td>目的地：</td>
                  <td>{{orderForm.place2}}</td>
              </tr>
              <tr>
                  <td>操作人：</td>
                  <td>{{orderForm.op}}</td>
              </tr>
              <tr>
                  <td>同业销售：</td>
                  <td>{{orderForm.saler}}</td>
              </tr>
              <tr>
                  <td>联系人：</td>
                  <td>{{orderForm.contactName}}</td>
              </tr>
              <tr>
                  <td>电话：</td>
                  <td>{{orderForm.contactTel}}</td>
              </tr>
              <tr>
                  <td>数量：</td>
                  <td><span class="table_span" v-for="(item, index) in orderForm.arr" :key="index">{{item.name}} ￥{{item.price}} * {{item.number}}</span></td>
              </tr>
              <tr>
                  <td>其他费用：</td>
                  <td><span class="table_span" v-show="index == 0" v-for="(item, index) in orderForm.favourable" :key="index">{{item.title}} {{item.price}}</span></td>
              </tr>
              <tr>
                  <td>订单总额：</td>
                  <td>{{orderForm.payable}}</td>
              </tr>
              <tr>
                  <td>欠款金额：</td>
                  <td>{{orderForm.payable - orderForm.paid}}</td>
              </tr>
              <tr>
                  <td>还款日期：</td>
                  <!-- <td>2018/10/20</td> -->
              </tr>
          </table>
          <el-table :data="orderForm.guests" ref="multipleTable" class="table" :header-cell-style="getRowClass" border :cell-style="getCellClass">     
             <el-table-column  prop="cnName" label="姓名" width="100"></el-table-column>
             <el-table-column  prop="enrollName" label="报名类型" width="160"></el-table-column>
             <el-table-column  prop="mobile" label="电话" width="150"></el-table-column>
             <el-table-column  prop="idCard" label="身份证" min-width="200"></el-table-column>
             <el-table-column  prop="sex" label="性别" width="100"></el-table-column>
           </el-table>
           <div class="cancel"><el-button @click="close">&nbsp;取消&nbsp;</el-button></div>
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
      //弹窗
      dialogFormMark:false,
      tourList:[{
        name:'张三',
        type:'成人',
        phone:'15845632145',
        cardId:'210114198952222255',
        sex:'女'
      }],
      orderForm: {

      }
    }
  },
  created(){
  },
  watch: {
    variable:function(){        
      if(this.dialogType==1){
        this.dialogFormMark=true;    
        this.initData();
      }
    }
  },
  methods: {
    formatDate(y, m, d, h, i, s) {
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (h < 10) h = "0" + h;
      if (i < 10) i = "0" + i;
      if (s < 10) s = "0" + s;
      return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
    },
    initData() {
      this.$http.post(this.GLOBAL.serverSrc + '/orderquery/get/api/SIOrders', {
        "orderCode": this.orderData.orderCode,
        "id": this.orderData.id
      }).then(res => {
        this.orderForm = res.data.object;
        console.log(this.orderForm)
        // console.log(this.orderData)
        this.orderForm.createTime = this.formatDate(
          new Date(this.orderForm.createTime).getFullYear(),
          new Date(this.orderForm.createTime).getMonth() + 1,
          new Date(this.orderForm.createTime).getDate(),
          new Date(this.orderForm.createTime).getHours(),
          new Date(this.orderForm.createTime).getMinutes(),
          new Date(this.orderForm.createTime).getSeconds()
        );
        this.orderForm.planTime = this.formatDate(
          new Date(this.orderForm.planTime).getFullYear(),
          new Date(this.orderForm.planTime).getMonth() + 1,
          new Date(this.orderForm.planTime).getDate(),
          new Date(this.orderForm.planTime).getHours(),
          new Date(this.orderForm.planTime).getMinutes(),
          new Date(this.orderForm.planTime).getSeconds()
        );
        this.orderForm.place1 = this.orderForm.place.split("/")[0];
        this.orderForm.place2 = this.orderForm.place.split("/")[1];
        this.orderForm.arr = [];
        this.orderForm.enrolls.forEach(v => {
          let number = this.orderForm.guests.filter(t => v.enrollName == t.enrollName).length;
          this.orderForm.arr.push({
            'name': v.enrollName,
            'price': v.price_02,
            'number': number
          })
        })
        console.log(this.orderForm)
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
   .table{margin-top: 15px}
   .cancel{margin: 15px 0 0 0;text-align: right;}
   .table_span:not(:first-child){margin-left: 10px;}
</style>