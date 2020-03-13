<template>
  <div>
      <!--搜索-->
      <span class="search-title">产品名称</span>
      <el-input v-model="productName" class="input"></el-input>
      <span class="search-title">订单ID</span>
      <el-input v-model="orderCode" class="input"></el-input>
      <span class="search-title">下单日期</span>
      <el-date-picker v-model="startDate" type="date" placeholder="开始天数" class="start-time" @change="endDateChange"></el-date-picker>
         <div class="date-line"></div>
      <el-date-picker v-model="endDate" type="date" placeholder="结束天数" class="start-time" @change="endDateChange"></el-date-picker></br>
      <span class="search-title">产品类型</span>
      <el-select v-model="productType" placeholder="全部类型"  class="sec-type">
         <el-option v-for="item in proType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select></br>
      <el-button type="primary" class="search-but" @click="initData(1,pageSize)">搜索</el-button>
      <el-button type="primary" plain class="search-but" @click="reset">重置</el-button>
      <!--tab筛选-->
      <el-tabs v-model="orderStatus" @tab-click="handleClick" class="el-tab">
        <el-tab-pane v-for="item in elTabs" :label="item.lable" :name="item.orderStatus" :key="item.orderStatus"> 
        </el-tab-pane> 
      </el-tabs>
      <el-table :data="orderList" ref="multipleTable" class="table" :header-cell-style="getRowClass" border>
         <el-table-column  prop="orderCode" label="ID" min-width="150" align="center"></el-table-column>
         <el-table-column  prop="title" label="产品名称" width="240" align="center"></el-table-column>
         <el-table-column  prop="productTypeCN" label="类型" width="90" align="center"></el-table-column>
         <el-table-column  prop="place" label="出发地/目的地" width="135" align="center"></el-table-column>
         <el-table-column  prop="total" label="价格" width="100" align="center"></el-table-column>
         <el-table-column  prop="orderStatus" label="订单状态" width="100" align="center">
           <template slot-scope="scope">
             <span v-show="scope.row.orderStatus == 1">补充游客材料</span>
             <span v-show="scope.row.orderStatus == 2">电子合同</span>
             <span v-show="scope.row.orderStatus == 3">待出行</span>
             <span v-show="scope.row.orderStatus == 4">旅游中</span>
             <span v-show="scope.row.orderStatus == 5">待评价</span>
             <span v-show="scope.row.orderStatus == 6">完成</span>
             <span v-show="scope.row.orderStatus == 0 && scope.row.occupyStatus == 1">预定不占</span>
             <span v-show="scope.row.orderStatus == 0 && scope.row.occupyStatus == 2">预定占位</span>
             <span v-show="scope.row.orderStatus == 0 && scope.row.occupyStatus == 3">确认占位</span>
             <span v-show="scope.row.orderStatus == 8">签署合同</span>
             <span v-show="scope.row.orderStatus == 9">作废订单</span>
             <span v-show="scope.row.orderStatus == 10">确认占位</span>
           </template>
         </el-table-column>
         <el-table-column  prop="op" label="操作人" width="120" align="center"></el-table-column>
         <el-table-column  prop="createTime" label="下单时间" width="180" align="center">
            <template slot-scope="scope">
              <span>{{formatDate(new Date(scope.row.createTime))}}</span><br/>
              <!--<span class="red">占位预留：2016-09-22 19:12:00</span>-->
            </template>
         </el-table-column>
         <el-table-column  label="操作" width="180" align="center">
             <template slot-scope="scope">
                <span class="cursor blue" @click="operation(scope.row,1)">详情</span>
                <span class="em">|</span>
                <template v-if="scope.row.orderStatus != 9&&scope.row.orderStatus != 4&&scope.row.orderStatus != 6">
                  <span class="cursor red" @click="cancelOrder(scope.row)">取消订单</span>
                  <span class="em">|</span>
                </template>                
                <span class="cursor blue" @click="operation(scope.row,2)">备注</span>
                <span class="em">|</span>
                <span class="cursor blue" @click="operation(scope.row,3)">修改</span>
             </template> 
         </el-table-column>
     </el-table>
     <!--分页-->
     <div style="width:1350px;overflow:hidden">
       <el-pagination v-if="pageshow" class="pagination"
            @size-change="handleSizeChange"
            background
            @current-change="handleCurrentChange"
            :current-page="1" 
            :page-sizes="[10, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        <order-detail :orderData="orderData" :variable="variable" :dialogType="dialogType"></order-detail>
        <order-remarks :orderData="orderData" :variable="variable" :dialogType="dialogType"></order-remarks>  
        <edit-order :orderData="orderData" :variable="variable" :dialogType="dialogType"></edit-order>  
      </div>
      <!--列表结束--> 
  </div>
</template>

<script>
  import orderDetail from './orderDetail';
  import orderRemarks from './orderRemarks';
  import editOrder from './editOrder';
  export default {
    components:{
      "order-detail":orderDetail,
      "order-remarks":orderRemarks,
      "edit-order":editOrder,
    },
    data() {
      return {
        //搜索
        productName:'',       //产品名称
        orderCode:'',  //订单ID
        startDate: '',
        endDate: '',
        productType: '',  //产品类型
        proType: [{//产品类型下拉内容
          value: '0',
          label: '全部类型'
        },{
          value: '1',
          label: '跟团游'
        }],
        //tab筛选
        orderStatus: 0,
        elTabs:[
          {lable:'全部订单',orderStatus:'0'},
          {lable:'未确认',orderStatus:'7'},
          {lable:'补充资料',orderStatus:'1'},
          {lable:'待出行',orderStatus:'3'},
          {lable:'出行中',orderStatus:'4'},
          {lable:'订单完成',orderStatus:'6'},
          {lable:'作废订单',orderStatus:'9'},
        ],
        //列表
        orderList:[],
        pageshow:true,
        pageSize: 10, 
        pageIndex: 1,
        total: 0,
        orderData:'',    //组件参数
        variable:0,   //设置一个变量展示弹窗
        dialogType:0, //弹窗类型  1：订单详细  2：修改订单
      }
    },
    mounted() {
      this.initData();
    },
    methods:{
      initData(pageIndex=this.pageIndex,pageSize=this.pageSize,productName=this.productName,orderCode=this.orderCode,startDate=this.startDate,endDate=this.endDate,productType=this.productType,orderStatus=this.orderStatus){
        if(startDate){
          let y=startDate.getFullYear();
          let m=(startDate.getMonth()+1)>9?startDate.getMonth()+1:'0'+(startDate.getMonth()+1);
          let d=startDate.getDate()>9?startDate.getDate():'0'+startDate.getDate();
          startDate=''+ y + m + d
        }else{
          startDate = 0;
        }
        if(endDate){
          let y=endDate.getFullYear();
          let m=(endDate.getMonth()+1)>9?endDate.getMonth()+1:'0'+(endDate.getMonth()+1);
          let d=endDate.getDate()>9?endDate.getDate():'0'+endDate.getDate();
          endDate=''+ y + m + d
        }else{
          endDate = 0;
        }
        if(productType == '') productType = 0;
        this.$http.post(this.GLOBAL.serverSrc + '/indirect/orderquery/get/sipage', {
          "pageIndex": pageIndex,
          "pageSize": pageSize,
          "object": {
            "condition": {
              "productName": productName,
              "orderCode": orderCode,
              "startDate": startDate,
              "endDate": endDate,
              "productType": productType,
              "orderStatus": orderStatus
            }
          }
        }).then(res => {
          this.orderList=[];
          this.orderList = res.data.objects;
          this.total = res.data.total;
          this.$nextTick(() => {
              this.pageshow = true;
          })
        })
      },
      operation(order,i){
          this.orderData = order;
          this.variable++;
          this.dialogType=i;        
      },
      reset(){
        this.productName='';       //产品名称
        this.orderCode='';  //订单ID
        this.startDate='';
        this.endDate='';
        this.productType='';  //产品类型
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#f7f7f7;height:60px;textAlign:center;color:#333;fontSize:15px'
        } else {
          return ''
        }
      },
      handleClick(tab, event) {
        this.orderStatus = tab.name;
        this.initData(1,this.pageSize);
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.pageIndex = 1;
        this.initData(1,val);
      },
      handleCurrentChange(val){
        this.initData(val,this.pageSize);
        this.pageIndex=val;
      },
      cancelOrder(order){
        this.$confirm("是否取消该订单?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http.post(this.GLOBAL.serverSrc + '/indirect/order/mobile/delete', {
              'orderCode': order.orderCode,
              "orderStatus": 9
            }).then(res => {
              if(res.data.isSuccess==true){
                this.initData(this.pageIndex,this.pageSize)
              }else{
                this.$message.error(res.data.result.message); 
              }
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            })
          })
      },
      endDateChange(){
        let startDate = new Date(this.startDate).getTime();
        let endDate = new Date(this.endDate).getTime();
        if (this.startDate !== "") {
          if (endDate < startDate) {
            this.$message.error("结束时间不能早于开始时间");
            this.endDate = "";
          }
        }
      },
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
      }
    }
  }



</script>

<style scoped>
   /*search*/
   .input{margin:10px 0px;width: 180px}
   .search-title{font-size: 14px;margin:20px -5px 10px 10px;display: inline-block;width: 75px;text-align: center}
   .start-time{margin-left:10px;width: 155px !important}
   .date-line{width:15px;border-bottom:1px solid #e6e6e6;display:inline-block;margin:0 -10px 3px 0}
   .sec-type{width: 180px}
   .search-but{margin: 20px 0 15px 10px}
   /*tab*/
   .el-tab{margin: 20px 0 0 10px;width:1350px}
   /*list*/
   .table{border:1px solid #e6e6e6;border-bottom: 0;background-color: #F7F7F7;width:1350px;margin-left: 10px}
   .pagination{text-align:center;margin:40px 0}
   .red{color: red}
   .blue{color: #2e94f9}
   .cursor{cursor: pointer}
   .em{margin:0 2px}
</style>

