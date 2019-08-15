<template>
  <div style="width:1150px;">
    <!--搜索栏-->
    <div class="searchbox">
      <span class="search-title">产品名称</span>
      <el-input v-model="productName" class="input" placeholder="请输入产品内容"></el-input>
      <span class="search-title">天数</span>
      <el-input v-model="productDay" class="input" placeholder="请输入天数"></el-input>
      <span class="search-title">出发日期</span>
      <el-date-picker v-model="startDate" type="date" placeholder="开始天数" class="input_01"></el-date-picker>
      <span class="dateline">——</span>
      <el-date-picker v-model="endDate" type="date" placeholder="结束天数" class="input_01"></el-date-picker>
      <span class="search-title">出发地</span>
      <el-input v-model="origin" class="input" placeholder="请输入出发地"></el-input>
      <span class="search-title">目的地</span>
      <el-input v-model="destination" class="input" placeholder="请输入目的地"></el-input>
      <span class="search-title">产品类型</span>
      <el-select v-model="productType" placeholder="请输入产品类型" class="input">
        <el-option v-for="item in productGenre" :key="item.value" :label="item.label":value="item.value"></el-option>
      </el-select>
    </div>
    <!--按钮-->
    <div class="productButton">
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="empty()">重置</el-button>
    </div>
    <!--开关-->
    <div class="switch">
      <div class="switchText">直客价</div>
      <el-switch class="switchButton" v-model="customerPrice"></el-switch>
    </div>
    <!--表格-->
    <el-table :data="tableData"  class="labelTable" ref="multipleTable" :header-cell-style="getRowClass" border>
      <el-table-column prop="ID" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="产品名称" width="249" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" width="150" align="center"></el-table-column>
      <el-table-column prop="place" label="出发地/目的地" width="180" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="120" align="center"></el-table-column>
      <el-table-column prop="days" label="天数" width="80" align="center"></el-table-column>
      <el-table-column prop="dates" label="最早出发日期" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="checkIncome(scope.row.id)" type="text" size="small" class="table_details">详情</el-button>
          <span class="em">|</span>
          <el-button @click="checkIncome1(scope.row.id)" type="text" size="small" class="table_details">预订</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination class="pageList" :page-sizes="[10,1,30,50]" background @size-change="handleSizeChange" :page-size="pagesize" :current-page.sync="currentPage" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    

  </div>
</template>

<script>
  export default {
    data() {
      return {
        //搜索栏
        productName:'',//产品名称
        productDay:'',//天数
        startDate:'',//开始天数
        endDate:'',//结束天数
        origin:'',//出发地
        destination:'',//目的地
        productType:'',//产品类型
        productGenre:[{//产品类型下拉内容
          value: '选项1',
          label: '全部类型'
        }, {
          value: '选项2',
          label: '跟团游'
        }, {
          value: '选项3',
          label: '邮轮游'
        }],
        customerPrice:false,
        tableData:[{
          ID:'1',
          name:'【惠游广西】跟团游',
          type:'跟团游',
          place:'沈阳/广西',
          price:'9999',
          days:'5',
          dates:'2018-07-16'
        },{
          ID:'2',
          name:'【惠游广西】跟团游',
          type:'跟团游',
          place:'沈阳/广西',
          price:'9999',
          days:'5',
          dates:'2018-07-16'
        }],
        //分页
        pagesize: 10, // 设定默认分页每页显示数
        pageIndex: 1, // 设定当前页数
        total: 0,
        currentPage: 1,

      }
    },
    methods:{
      empty(){//搜索栏重置
        this.productName = '';
        this.productDay = '';
        this.startDate = '';
        this.endDate = '';
        this.origin = '';
        this.destination = '';
        this.productType = '';
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {//表格头部颜色
        if (rowIndex == 0) {
          return 'background:#f7f7f7;height:60px;textAlign:center;color:#333;fontSize:15px'
        } else {
          return ''
        }
      },
      //分页
      handleSizeChange(page) {/*
        this.currentPage = 1;
        this.pagesize = page;
        this.pageList();*/
      },
      handleCurrentChange(currentPage) {
        /*this.currentPage = currentPage;
        this.pageList();*/
      },
      checkIncome(){
        
      },
    }
  }



</script>

<style scoped>
  /*搜索栏*/
  .searchbox{width: 1150px;}
  .input{margin:10px 5px;width: 200px;}
  .input_01{margin:10px 5px;width: 150px;}
  .search-title{font-size: 14px;margin-left:5px;display: inline-block;width: 100px;text-align: right;}
  .dateline{ margin: 0 5px 0 5px; }
  .productButton{overflow: hidden; margin: 10px 20px 0 0;display: inline-block; float: right;}
  /*开关*/
  .switch{ clear: both; padding: 10px 0 20px 0;  overflow: hidden;}
  .switchText{float: left; width: 100px; text-align: right;}
  .switchButton{float: left; margin: 0 0 0 15px;}
  /*表格*/
  .labelTable{margin: 0 30px 20px 30px; text-align: center;max-width: 1100px;}
  /*分页*/
  .pageList{float: right; margin: 10px 20px 0 0;}
</style>

