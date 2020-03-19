<template>
  <div>
      <div class="borderstyle ml20">
          <div class="iconstyle icon1"></div>
          <div class="icon-left">
            <div class="title">本月下单</div>
            <div class="sums">4</div>
            <div class="persent">
                <span class="tip">▼10%</span>
                <span>同比上月</span>
            </div>
          </div>
      </div>
      <div class="borderstyle ml100">
          <div class="iconstyle icon2"></div>
          <div class="icon-left">
            <div class="title">本月销售额</div>
            <div class="sums">54,323</div>
            <div class="persent">
                <span class="tip">▼10%</span>
                <span>同比上月</span>
            </div>
          </div>
      </div>
      <div class="borderstyle ml100">
          <div class="iconstyle icon3"></div>
          <div class="icon-left">
            <div class="title">退款订单(个)</div>
            <div class="sums">5</div>
            <div class="persent">
                <span class="tip">▼10%</span>
                <span>同比上月</span>
            </div>
          </div>
      </div>
      <div class="search">
           <span class="search-title">同业销售</span>
           <el-select v-model="tradeSales" placeholder="全部">
             <el-option v-for="item in manager" :key="item.value" :label="item.name" :value="item.value"></el-option>
           </el-select>
           <el-button class="ml20" type="primary" @click="initData(1,pageSize)">搜索</el-button>
           <el-button @click="tradeSales=''">重置</el-button>
      </div>
      <el-button class="excel" type="primary" @click="">导出excel</el-button>
      
      <div class="ml20">
         <span class="ml20">2016-01</span>
         <span class="line">|</span>
         <span>年度销售总额 :</span>
         <span class="color-blue">123.90元</span>
         <span class="line">|</span>
         <span>年度总订单数 :</span>
         <span class="color-blue">12笔</span>
         <span class="line">|</span>
         <span>本月销售总额 :</span>
         <span class="color-blue">123.90元</span>
         <span class="line">|</span>
         <span>本月总订单数 :</span>
         <span class="color-blue">12笔</span>  
      </div>

      <el-table :data="saleList" ref="multipleTable" class="table" :header-cell-style="getRowClass" border>
         <el-table-column  prop="id" label="ID" width="80" align="center"></el-table-column>
         <el-table-column  prop="title" label="产品名称" min-width="230" align="center"></el-table-column>
         <el-table-column  prop="productType" label="类型" width="90" align="center"></el-table-column>
         <el-table-column  prop="place" label="出发地/目的地" width="135" align="center"></el-table-column>
         <el-table-column  prop="total" label="价格" width="100" align="center"></el-table-column>
         <el-table-column  prop="orderStatus" label="订单状态" width="120" align="center"></el-table-column>
         <el-table-column  prop="op" label="操作人" width="120" align="center"></el-table-column>
         <el-table-column  prop="createTime" label="下单时间" width="180" align="center"></el-table-column>
         <el-table-column  label="操作" width="100" align="center">
             <template slot-scope="scope">
                <span class="cursor blue" @click="operation(scope.row,1)">查看订单</span>
             </template> 
         </el-table-column>
       </el-table>
       <!--分页-->
       <div style="width:1160px;margin-left:20px;overflow:hidden">
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
       </div>
       <order-detail :orderData="saleList" :variable="variable" :dialogType="dialogType"></order-detail>




  </div>
</template>

<script>
  import orderDetail from '../orderManagement/orderDetail';
  export default {
    components:{
      "order-detail":orderDetail
  },
  data() {
      return {
         tradeSales:"",
         manager:[],
         saleList:[],
         pageshow:true,
         pageSize: 10, 
         pageIndex: 1,
         total: 0,
         variable:0,   //设置一个变量展示弹窗
         dialogType:0, //弹窗类型  1：订单详细  2：修改订单
      }
    },
    mounted() {
      //this.initData();
    },
    methods:{
         operation(order,i){
            this.orderData = order;
            this.variable++;
            this.dialogType=i;        
         },
         getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
              return 'background:#f7f7f7;height:60px;textAlign:center;color:#333;fontSize:15px'
            } else {
              return ''
            }
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
         initData(pageIndex=this.pageIndex,pageSize=this.pageSize,tradeSales=this.tradeSales){
            this.$http.post(this.GLOBAL.serverSrc + '/orderquery/get/api/sipage',{
              "pageIndex": pageIndex,
              "pageSize": pageSize,
              "object": {
                }
            }).then(res => {
              this.saleList=[];
              this.saleList = res.data.objects;
              this.total = res.data.total;
              this.$nextTick(() => {
                  this.pageshow = true;
              })
            })
          },







    }
  }



</script>

<style scoped>
 .borderstyle{width:315px;height:120px;border:1px solid #E8E8E8;float:left;margin-bottom: 30px}
 .ml20{margin-left:20px}
 .ml100{margin-left:104px}
 .iconstyle{width: 70px;height: 70px;margin-left: 10px;margin-top: 25px;float:left;}
 .icon1{background-image:url('../../../static/sale/icon1.png')}
 .icon2{background-image:url('../../../static/sale/icon2.png')}
 .icon3{background-image:url('../../../static/sale/icon3.png')}
 .icon-left{float:left;margin-left:20px}
 .title{margin-top:25px;clear:both;font-size: 14px}
 .sums{margin-top:10px;font-size: 26px}
 .persent{margin-top:10px;font-size: 14px}
 .tip{color:red}
 .search{background-color: #eee;width: 1160px;height: 68px;clear: both;margin-left: 20px;padding-top: 25px}
 .search-title{font-size: 14px;margin:0 15px 0 30px}
 .excel{margin:30px 20px 20px 20px}
 .line{margin: 10px}
 .color-blue{color: #409EFF}
 .table{border:1px solid #e6e6e6;border-bottom: 0;background-color: #F7F7F7;width:1160px;margin: 20px 0 0 20px}
 .pagination{text-align:center;margin:40px 0}
 .blue{color: #2e94f9}
 .cursor{cursor: pointer}
</style>

