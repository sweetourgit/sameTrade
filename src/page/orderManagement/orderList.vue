<template>
  <div>
      <!--搜索-->
      <span class="search-title">产品名称：</span>
      <el-input v-model="name" class="input"></el-input>
      <span class="search-title">订单ID：</span>
      <el-input v-model="orderCode" class="input"></el-input>
      <span class="search-title">下单日期：</span>
      <el-date-picker v-model="beginDate" type="date" placeholder="开始天数" class="start-time" value-format="timestamp"></el-date-picker>
         <div class="date-line"></div>
      <el-date-picker v-model="endDate" type="date" placeholder="结束天数" class="start-time" value-format="timestamp"></el-date-picker></br>
      <span class="search-title">产品类型：</span>
      <el-select v-model="productType" placeholder="请选择"  class="sec-type">
         <el-option v-for="item in proType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select></br>
      <el-button type="primary" class="search-but" @click="searchFormVisible">搜索</el-button>
      <el-button type="primary" plain class="search-but" @click="reset">重置</el-button>
      <!--tab筛选-->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tab">
        <el-tab-pane v-for="item in elTabs" :label="item.lable" :name="item.name" :key="item.name">
           
        </el-tab-pane> 
      </el-tabs>
      <el-table :data="orderList" ref="multipleTable" class="table" :header-cell-style="getRowClass" border>
         <el-table-column  prop="id" label="ID" width="80" align="center"></el-table-column>
         <el-table-column  prop="title" label="产品名称" width="260" align="center"></el-table-column>
         <el-table-column  prop="productType" label="类型" width="90" align="center">
           <template slot-scope="scope">
              <span v-show="scope.row.productType == 1">跟团游</span>
              <span v-show="scope.row.productType == 2">自由行</span>
           </template>
         </el-table-column>
         <el-table-column  prop="place" label="出发地/目的地" width="135" align="center"></el-table-column>
         <el-table-column  prop="total" label="价格" width="100" align="center"></el-table-column>
         <el-table-column  prop="orderStatus" label="订单状态" width="120" align="center">
           <template slot-scope="scope">
             <span v-show="scope.row.orderStatus == 1">补充游客材料</span>
             <span v-show="scope.row.orderStatus == 2">电子合同</span>
             <span v-show="scope.row.orderStatus == 3">待出行</span>
             <span v-show="scope.row.orderStatus == 4">旅游中</span>
             <span v-show="scope.row.orderStatus == 5">待评价</span>
             <span v-show="scope.row.orderStatus == 6">完成</span>
             <span v-show="scope.row.orderStatus == 7 && scope.row.occupyStatus == 1">预定不占</span>
             <span v-show="scope.row.orderStatus == 7 && scope.row.occupyStatus == 2">预定占位</span>
             <span v-show="scope.row.orderStatus == 7 && scope.row.occupyStatus == 3">确认占位</span>
             <span v-show="scope.row.orderStatus == 8">签署合同</span>
             <span v-show="scope.row.orderStatus == 9">作废订单</span>
             <span v-show="scope.row.orderStatus == 10">确认占位</span>
           </template>
         </el-table-column>
         <el-table-column  prop="op" label="操作人" width="86" align="center"></el-table-column>
         <el-table-column  prop="createTime" label="下单时间" width="227">
            <template slot-scope="scope">
              <span>{{
                new Date(scope.row.createTime).getFullYear() + '-' +
                (new Date(scope.row.createTime).getMonth() + 1) + '-' +
                new Date(scope.row.createTime).getDate() + ' ' +
                new Date(scope.row.createTime).getHours() + ':' +
                new Date(scope.row.createTime).getMinutes() + ':' +
                new Date(scope.row.createTime).getSeconds()
                }}</span><br/>
              <span class="red">占位预留：2016-09-22 19:12:00</span>
            </template>
         </el-table-column>
         <el-table-column  label="操作" width="270" align="center">
             <template slot-scope="scope">
                <span class="cursor blue" @click="operation(scope.row,1)">详情</span>
                <span class="em">|</span>
                <template v-if="scope.row.orderStatus == 1">
                  <span class="cursor blue" @click="operation(scope.row,2)">补充游客材料</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 2">
                  <span class="cursor blue" @click="operation(scope.row,2)">电子合同</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 3">
                  <span class="cursor blue" @click="operation(scope.row,2)">待出行</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 4">
                  <span class="cursor blue" @click="operation(scope.row,2)">旅游中</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 7 && scope.row.occupyStatus == 1">
                  <span class="cursor blue" @click="operation(scope.row,2)">预定不占</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 7 && scope.row.occupyStatus == 2">
                  <span class="cursor blue" @click="operation(scope.row,2)">预定占位</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 7 && scope.row.occupyStatus == 3">
                  <span class="cursor blue" @click="operation(scope.row,2)">确认占位</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus == 10 && scope.row.occupyStatus == 3">
                  <span class="cursor blue" @click="operation(scope.row,2)">确认占位</span>
                  <span class="em">|</span>
                </template>
                <template v-if="scope.row.orderStatus != 9">
                  <span class="cursor red" @click="cancelOrder(scope.row)">取消订单</span>
                  <span class="em">|</span>
                </template>                
                <span class="cursor blue" @click="operation(scope.row,3)">备注</span>
             </template> 
         </el-table-column>
     </el-table>
     <!--分页-->
     <div style="width:1350px;overflow:hidden">
       <el-pagination class="pagination"
          @size-change="handleSizeChange"
          background
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <order-detail :orderData="orderData" :variable="variable" :dialogType="dialogType"></order-detail>
        <order-modification v-on:callInit="callInit" :orderData="orderData" :variable="variable" :dialogType="dialogType"></order-modification>  
        <order-remarks :orderData="orderData" :variable="variable" :dialogType="dialogType"></order-remarks>  
      </div>
      <!--列表结束--> 
  </div>
</template>

<script>
  import orderDetail from './orderDetail';
  import orderModification from './orderModification';
  import orderRemarks from './orderRemarks';
  export default {
    components:{
      "order-modification":orderModification,
      "order-detail":orderDetail,
      "order-remarks":orderRemarks,
    },
    data() {
      return {
        //搜索
        name:'',       //产品名称
        orderCode:'',  //订单ID
        isOrderType: 0,
        beginDate: '',
        endDate: '',
        productType: '',  //产品类型
        proType: [{
          value: '1',
          label: '跟团游'
        }],
        //tab筛选
        activeName: '0',
        elTabs:[
          {lable:'全部订单（0）',name:'0'},
          {lable:'未确认（0）',name:'7'},
          {lable:'补充资料（0）',name:'1'},
          {lable:'待出行（0）',name:'3'},
          {lable:'出行中（0）',name:'4'},
          {lable:'订单完成（0）',name:'6'},
          {lable:'作废订单（0）',name:'9'},
        ],
        //列表
        orderList:[],
        pageSize: 10, // 设定默认分页每页显示数
        pageIndex: 1, // 设定当前页数
        total: 0,
        orderData:'',    //组件参数
        variable:0,   //设置一个变量展示弹窗
        dialogType:0, //弹窗类型  1：订单详细  2：修改订单
      }
    },
    created() {
      this.initData();
    },
    methods:{
      initData(isOrderType = 0, name, orderCode, beginDate, endDate, activeName) {
        if(beginDate == '') beginDate = undefined;
        if(endDate == '') endDate = undefined;
        this.$http.post(this.GLOBAL.serverSrc + '/orderquery/get/api/sipage', {
          "pageIndex": this.pageIndex,
          "pageSize": this.pageSize,
          "object": {
            "condition": {
              "productName": name,
              "orderCode": orderCode,
              "startDate": beginDate,
              "endDate": endDate,
              "productType": activeName,
              "orderStatus": isOrderType
            },
          }
        }).then(res => {
          this.orderList = res.data.objects;
          this.total = res.data.total;
          console.log(this.orderList)
          if(isOrderType == 0) {
            this.elTabs.map(v => {
              if(v.name == 0) v.lable = '全部订单（' + this.total + '）';
              if(v.name == 7) v.lable = '未确认（' + this.orderList.filter(i => i.orderStatus == 7).length + '）';
              if(v.name == 1) v.lable = '补充资料（' + this.orderList.filter(i => i.orderStatus == 1).length + '）';
              if(v.name == 3) v.lable = '待出行（' + this.orderList.filter(i => i.orderStatus == 3).length + '）';
              if(v.name == 4) v.lable = '出行中（' + this.orderList.filter(i => i.orderStatus == 4).length + '）';
              if(v.name == 6) v.lable = '订单完成（' + this.orderList.filter(i => i.orderStatus == 6).length + '）';
              if(v.name == 9) v.lable = '作废订单（' + this.orderList.filter(i => i.orderStatus == 9).length + '）';
            })
          }
        })
      },
      callInit() {
        this.initData(this.isOrderType, this.name, this.orderCode, this.beginDate, this.endDate, this.activeName);
      },
      operation(order,i){
          this.orderData = order;
          this.variable++;
          this.dialogType=i;        
      },
      reset(){
        this.name='';       //产品名称
        this.orderCode='';  //订单ID
        this.beginDate='';
        this.endDate='';
        this.productType='';  //产品类型
        this.initData();
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#f7f7f7;height:60px;textAlign:center;color:#333;fontSize:15px'
        } else {
          return ''
        }
      },
      handleClick(tab, event) {
        this.isOrderType = tab.name;
        this.initData(this.isOrderType, this.name, this.orderCode, this.beginDate, this.endDate, this.activeName);
      },
      handleSizeChange(val){
        this.pageIndex = 1;
        this.pageSize = val;
        this.initData(this.isOrderType, this.name, this.orderCode, this.beginDate, this.endDate, this.activeName);
      },
      handleCurrentChange(val){
        this.pageIndex = val;
        this.initData(this.isOrderType, this.name, this.orderCode, this.beginDate, this.endDate, this.activeName);
      },
      cancelOrder(order){
        this.$confirm("是否取消该订单?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http.post(this.GLOBAL.serverSrc + '/orderquery/get/api/DelOrderRoot', {
              'orderCode': order.orderCode
            }).then(res => {
              this.initData(this.isOrderType, this.name, this.orderCode, this.beginDate, this.endDate, this.activeName);
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            })
          })
      },
      // 搜索
      searchFormVisible() {
        this.initData(this.isOrderType, this.name, this.orderCode, this.beginDate, this.endDate, this.activeName);
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
   .table{border:1px solid #e6e6e6;border-bottom: 0;background-color: #F7F7F7;width:1370px;margin-left: 10px}
   .pagination{text-align:center;margin:40px 0}
   .red{color: red}
   .blue{color: #2e94f9}
   .cursor{cursor: pointer}
   .em{margin:0 2px}
</style>

