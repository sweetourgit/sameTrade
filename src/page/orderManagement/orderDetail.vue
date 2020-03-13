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
                  <td>{{orderForm.groupCode}}</td>
              </tr> 
              <tr>
                  <td>下单时间：</td>
                  <td>{{formatDate(new Date(orderForm.createTime))}}</td>
              </tr>
              <tr>
                  <td>出发日期：</td>
                  <td>{{orderForm.planTime}}</td>
              </tr>
              <tr>
                  <td>订单状态：</td>
                  <td v-show="orderForm.orderStatus == 1">补充游客材料</td>
                  <td v-show="orderForm.orderStatus == 2">电子合同</td>
                  <td v-show="orderForm.orderStatus == 3">待出行</td>
                  <td v-show="orderForm.orderStatus == 4">旅游中</td>
                  <td v-show="orderForm.orderStatus == 5">待评价</td>
                  <td v-show="orderForm.orderStatus == 6">完成</td>
                  <td v-show="orderForm.orderStatus == 0 && orderForm.occupyStatus == 1">预定不占</span>
                  <td v-show="orderForm.orderStatus == 0 && orderForm.occupyStatus == 2">预定占位</span>
                  <td v-show="orderForm.orderStatus == 0 && orderForm.occupyStatus == 3">确认占位</span>
                  <td v-show="orderForm.orderStatus == 8">签署合同</td>
                  <td v-show="orderForm.orderStatus == 9">作废订单</td>
                  <td v-show="orderForm.orderStatus == 10">确认占位</td>
              </tr>
              <tr>
                  <td>套餐名称：</td>
                  <td>{{orderForm.package}}</td>
              </tr>
              <tr>
                  <td>出发地：</td>
                  <td>{{orderForm.pod}}</td>
              </tr>
              <tr>
                  <td>目的地：</td>
                  <td>{{orderForm.destination}}</td>
              </tr>
              <tr>
                  <td>操作人：</td>
                  <td>{{orderForm.op}}</td>
              </tr>
              <tr>
                  <td>商户销售：</td>
                  <td>{{orderForm.saler}}</td>
              </tr>
              <tr>
                  <td>联系人：</td>
                  <td>{{JSON.parse(orderForm.contact).Name}}</td>
              </tr>
              <tr>
                  <td>电话：</td>
                  <td>{{JSON.parse(orderForm.contact).Tel}}</td>
              </tr>
              <tr>
                  <td>数量：</td>
                  <td>{{orderForm.enrollDetail}}</td>
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
                  <td>{{formatDate(new Date(orderForm.repaymentDate))}}</td>
              </tr>
          </table>
          <el-table :data="orderForm.guests" ref="multipleTable" class="table" :header-cell-style="getRowClass" border :cell-style="getCellClass">     
             <el-table-column  prop="cnName" label="姓名" width="100"></el-table-column>
             <el-table-column  prop="enrollName" label="报名类型" width="160"></el-table-column>
             <el-table-column  prop="mobile" label="电话" width="150"></el-table-column>
             <el-table-column  prop="idCard" label="身份证" min-width="200"></el-table-column>
             <el-table-column  prop="sex" label="性别" width="100">
                <template slot-scope="scope">
                     <span v-if="scope.row.sex===0">男</span>
                     <span v-if="scope.row.sex===1">女</span>
                     <span v-if="scope.row.sex===3">未选择</span>
                </template>
             </el-table-column>
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
      orderForm:{contact:"{}"}
    }
  },
  created(){
  },
  watch: {
    variable:function(){        
      if(this.dialogType==1){
        this.dialogFormMark=true;    
        this.getOrderData();
      }
    }
  },
  methods: {
    formatDate(date){
       var y = date.getFullYear();  
       var m = date.getMonth() + 1;  
           m = m < 10 ? ('0' + m) : m;  
       var d = date.getDate();  
           d = d < 10 ? ('0' + d) : d;  
       var h = date.getHours();  
           h=h < 10 ? ('0' + h) : h;  
       var minute = date.getMinutes();  
           minute = minute < 10 ? ('0' + minute) : minute;  
       var second=date.getSeconds();  
           second=second < 10 ? ('0' + second) : second;  
           return y + '-' + m + '-' + d +' '+ h + ':' + minute + ':' + second;
    },
    getOrderData(){
      this.$http.post(this.GLOBAL.serverSrc + '/indirect/orderquery/get/siorders', {
        "orderCode": this.orderData.orderCode,
        "id": this.orderData.id
      }).then(res => {
        this.orderForm = res.data.object;
        let planTime = res.data.object.planTime + '';
        this.orderForm.planTime = planTime.substr(0,4) + '-' + planTime.substr(4,2) + '-' + planTime.substr(6,2);
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