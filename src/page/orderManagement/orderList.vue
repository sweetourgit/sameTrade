<template>
  <div>
      <!--搜索-->
      <span class="search-title">产品名称：</span>
      <el-input v-model="name" class="input"></el-input>
      <span class="search-title">订单ID：</span>
      <el-input v-model="orderCode" class="input"></el-input>
      <span class="search-title">下单日期：</span>
      <el-date-picker v-model="beginDate" type="date" placeholder="开始天数" class="start-time"></el-date-picker>
         <div class="date-line"></div>
      <el-date-picker v-model="endDate" type="date" placeholder="结束天数" class="start-time"></el-date-picker></br>
      <span class="search-title">产品类型：</span>
      <el-select v-model="productType" placeholder="请选择"  class="sec-type">
         <el-option v-for="item in proType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select></br>
      <el-button type="primary" class="search-but">搜索</el-button>
      <el-button type="primary" plain class="search-but" @click="reset">重置</el-button>
      <!--tab筛选-->
      <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tab">
        <el-tab-pane v-for="item in elTabs" :label="item.lable" :name="item.name" :key="item.name">
           
        </el-tab-pane> 
      </el-tabs>
      <el-table :data="orderList" ref="multipleTable" class="table" :header-cell-style="getRowClass" border>
         <el-table-column  prop="id" label="ID" width="80" align="center"></el-table-column>
         <el-table-column  prop="name" label="产品名称" width="260" align="center"></el-table-column>
         <el-table-column  prop="type" label="类型" width="90" align="center"></el-table-column>
         <el-table-column  prop="pod" label="出发地/目的地" width="135" align="center"></el-table-column>
         <el-table-column  prop="price" label="价格" width="100" align="center"></el-table-column>
         <el-table-column  prop="status" label="订单状态" width="120" align="center"></el-table-column>
         <el-table-column  prop="peo" label="操作人" width="86" align="center"></el-table-column>
         <el-table-column  prop="time" label="下单时间" width="227">
             <template slot-scope="scope">
                <span>2016-09-21 19:12:00</span><br/>
                <span class="red">占位预留：2016-09-22 19:12:00</span>
             </template>
         </el-table-column>
         <el-table-column  label="操作" width="250" align="center">
             <template slot-scope="scope">
                <span class="cursor blue" @click="operation(scope.row.id,1)">详情</span>
                <span class="em">|</span>
                <span class="cursor blue" @click="operation(scope.row.id,2)">预定占位</span>
                <span class="em">|</span>
                <span class="cursor red" @click="cancelOrder(scope.row.id)">取消订单</span>
                <span class="em">|</span>
                <span class="cursor blue">备注</span>
             </template> 
         </el-table-column>
     </el-table>
     <!--分页-->
     <div style="width:1350px;overflow:hidden">
       <el-pagination class="pagination"
          @size-change="handleSizeChange"
          background
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <order-detail :orderId="orderId" :variable="variable" :dialogType="dialogType"></order-detail>
        <order-modification :orderId="orderId" :variable="variable" :dialogType="dialogType"></order-modification>  
      </div>
      <!--列表结束--> 
  </div>
</template>

<script>
  import orderDetail from './orderDetail';
  import orderModification from './orderModification';
  export default {
    components:{
      "order-modification":orderModification,
      "order-detail":orderDetail,
    },
    data() {
      return {
        //搜索
        name:'',       //产品名称
        orderCode:'',  //订单ID
        beginDate: '',
        endDate: '',
        productType: '',  //产品类型
        proType: [{
          value: '0',
          label: '跟团游'
        }],
        //tab筛选
        activeName: '0',
        elTabs:[
          {lable:'全部订单（84）',name:'0'},
          {lable:'未确认（12）',name:'1'},
          {lable:'补充资料（12）',name:'2'},
          {lable:'待出行（12）',name:'3'},
          {lable:'出行中（12）',name:'4'},
          {lable:'订单完成（12）',name:'5'},
          {lable:'作废订单（12）',name:'6'},
        ],
        //列表
        orderList:[{
          id:123520,
          name:'斯里兰卡南部海滨之旅7天6晚休闲款安娜塔拉海景连住123',
          type:'跟团游',
          pod:'沈阳/广西',
          price:'99999.00',
          status:'预定不占',
          peo:'阳阳',
          time:'1',
        }],
        pageSize: 10, // 设定默认分页每页显示数
        pageIndex: 1, // 设定当前页数
        total: 0,
        orderId:0,    //组件参数
        variable:0,   //设置一个变量展示弹窗
        dialogType:0, //弹窗类型  1：订单详细  2：修改订单
      }
    },
    methods:{
      operation(orderId,i){
          this.orderId = orderId;
          this.variable++;
          if(i==1){
            this.dialogType=1; //订单详细弹窗
          }else if(i==2){
            this.dialogType=2; //修改订单弹窗
          }         
      },
      reset(){
        this.name='';       //产品名称
        this.orderCode='';  //订单ID
        this.beginDate='';
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
        console.log(tab, event);
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.pageIndex = 1;
       // this.getPage(1,val);
      },
      handleCurrentChange(val){
       // this.getPage(val,this.pageSize);
        this.pageIndex=val;
      },
      cancelOrder(){
        this.$confirm("是否取消该订单?", "提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            })
          })
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

