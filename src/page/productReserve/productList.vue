<template>
  <div style="width:1150px;">
    <!--搜索栏-->
    <div class="searchbox">
      <span class="search-title">产品名称</span>
      <el-input v-model="title" class="input" placeholder="请输入产品内容"></el-input>
      <span class="search-title">天数</span>
      <el-select v-model="day" placeholder="全部天数" class="input">
        <el-option v-for="item in days" :key="item.value" :label="item.label":value="item.value"></el-option>
      </el-select>
      <span class="search-title">出发日期</span>
      <el-date-picker v-model="startDate" type="date" placeholder="开始天数" class="input_01" @change="endDateChange"></el-date-picker>
      <span class="dateline">——</span>
      <el-date-picker v-model="endDate" type="date" placeholder="结束天数" class="input_01" @change="endDateChange"></el-date-picker>
      <!--出发地-->
      <span class="search-title por">出发地<span v-if="isPod" class="poa">没有该地区名称</span></span>
      <el-autocomplete class="input" v-model="pod" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="departure1" @blur="isToastFun(1)" placeholder="请输入出发地"></el-autocomplete>
      <!--目的地-->
      <span class="search-title por">目的地<span v-if="isDes" class="poa">没有该地区名称</span></span>
      <el-autocomplete class="input" v-model="destination" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="departure2" @blur="isToastFun(2)" placeholder="请输入目的地"></el-autocomplete>
      <!--产品类型-->
      <span class="search-title">产品类型</span>
      <el-select v-model="productType" placeholder="全部类型" class="input">
        <el-option v-for="item in productGenre" :key="item.value" :label="item.label":value="item.value"></el-option>
      </el-select>
    </div>
    <!--按钮-->
    <div class="productButton">
      <el-button type="primary" @click="list(1,pageSize)">搜索</el-button>
      <el-button type="primary" @click="empty()">重置</el-button>
    </div>
    <!--开关-->
    <div class="switch">
      <div class="switchText">直客价</div>
      <el-switch class="switchButton" v-model="customerPrice"></el-switch>
    </div>
    <!--表格-->
    <el-table :data="tableData"  class="labelTable" ref="multipleTable" :header-cell-style="getRowClass" border>
      <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="产品名称" width="249" align="center"></el-table-column>
      <el-table-column prop="productType" label="类型" width="150" align="center">
         <template slot-scope="scope">
            <span v-show="scope.row.productType == 1">跟团游</span>
         </template>
      </el-table-column>
      <el-table-column prop="place" label="出发地/目的地" width="180" align="center"></el-table-column>
      <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="customerPrice == true">{{scope.row.minPrice01}}</span>
            <span v-if="customerPrice == false">{{scope.row.minPrice02}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="day" label="天数" width="80" align="center"></el-table-column>
      <el-table-column prop="date" label="最早出发日期" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="checkIncome(scope.row.id)" type="text" size="small" class="table_details">预订</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
</template>

<script>
  export default {
    data() {
      return {
        //搜索栏
        title:'',//产品名称
        day:'',//天数
        days:[{//产品类型下拉内容
          value: 1,
          label: '1天'
        }, {
          value: 2,
          label: '2天'
        }, {
          value: 3,
          label: '3天'
        }, {
          value: 4,
          label: '4天'
        }, {
          value: 5,
          label: '5天'
        }, {
          value: 6,
          label: '6天'
        }, {
          value: 7,
          label: '7天'
        }, {
          value: 8,
          label: '8天'
        }, {
          value: 9,
          label: '大于8天'
        }],
        startDate:'',//开始天数
        endDate:'',//结束天数
        pod:'',
        podID:0,//出发地
        destination:'',
        destinationID:0,//目的地
        isPod:false,
        isDes:false,
        productType:'',//产品类型
        productGenre:[{//产品类型下拉内容
          value: '0',
          label: '全部类型'
        }, {
          value: '1',
          label: '跟团游'
        }],
        customerPrice:false,
        tableData:[],
        //分页
        pageshow:true,
        pageSize: 10, // 设定默认分页每页显示数
        pageIndex: 1, // 设定当前页数
        total: 0,
      }
    },
    methods:{
      empty(){//搜索栏重置
        this.title = '';
        this.day = '';
        this.startDate = '';
        this.endDate = '';
        this.pod = '';
        this.podID = 0;
        this.destination = '';
        this.destinationID = 0;
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
      handleSizeChange(val){
        this.pageSize = val;
        this.pageIndex = 1;
        this.list(1,val);
      },
      handleCurrentChange(val){
        this.list(val,this.pageSize);
        this.pageIndex=val;
      },
      checkIncome(id){
        this.$router.push({
          path: '/productDetails',
          query: {
              id: id
          }
        })
      },
      //列表
      list(pageIndex=this.pageIndex,pageSize=this.pageSize,title=this.title,day=this.day,startDate=this.startDate,endDate=this.endDate,podID=this.podID,destinationID=this.destinationID,productType=this.productType){
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
        this.$http.post(this.GLOBAL.serverSrc + "/indirect/team/pc/page",{
            "pageIndex":pageIndex,
            "pageSize":pageSize,
            "object": {
                "title": title,
                "day": day?day:0,
                "startDate": startDate,
                "endDate": endDate,
                "podID": podID,
                "destinationID": destinationID,
                "productType": productType?productType:0,
            }
         })
        .then(res => {
            this.tableData=[];
            this.tableData = res.data.objects;
            this.total = res.data.total;
            this.tableData.forEach(v => {
              v.date = v.date.toString();
              let date = v.date.substr(0,4) + '-' + v.date.substr(4,2) + '-' + v.date.substr(6,2);
              v.date=date;
            });
            this.$nextTick(() => {
                this.pageshow = true;
            })
        })
      },
       //目的地
    querySearch(queryString, cb) {
      this.$http.post(this.GLOBAL.serverSrc + '/indirect/universal/area/fuzzy', {
        "object": {
          areaName: queryString
        }
      }).then(res => {
         if (res.data.objects.length > 0) {
          let tableData=[];
          for(let i=0;i<res.data.objects.length;i++){
            tableData.push({
              "value" : res.data.objects[i].areaName,
              "id":res.data.objects[i].id
            })
          }
          var results = queryString ? tableData.filter(this.createFilter(queryString)) : [];
          cb(results)
         }else{
            this.isDes = true;
            this.isPod = true;
            cb && cb([]);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      createFilter(queryString){
        return (restaurant) => {
          return (restaurant.value);
        }
      },
      departure1(item){
        this.podID = item.id;
        this.pod = item.value;
      },
      departure2(item){
        this.destinationID = item.id;
        this.destination = item.value;
      },
      isToastFun(i){
        if(i==1){
          this.isDes = false;
          this.pod = "";
          this.podID = 0;
        }else{
          this.isPod = false;
          this.destination = "";
          this.destinationID = 0;
        }
      },
      endDateChange() {
        let startDate = new Date(this.startDate).getTime();
        let endDate = new Date(this.endDate).getTime();
        if (this.startDate !== "") {
          if (endDate < startDate) {
            this.$message.error("结束时间不能早于开始时间");
            this.endDate = "";
          }
        }
      }
    },
    mounted(){
      this.list(1,this.pageSize);
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
  .poa{position: absolute;left: 76px;top: 30px;width: 100px;color: red;font-size: 12px}
  .por{position: relative}
  /*开关*/
  .switch{ clear: both; padding: 10px 0 20px 0;  overflow: hidden;}
  .switchText{float: left; width: 100px; text-align: right;}
  .switchButton{float: left; margin: 0 0 0 15px;}
  /*表格*/
  .labelTable{margin: 0 30px 20px 30px; text-align: center;max-width: 1100px;}
  /*分页*/
  .pagination{text-align:center;margin:40px 0}
</style>

