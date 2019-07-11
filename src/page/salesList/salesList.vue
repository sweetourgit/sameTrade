<template>
  <div>
    <div >
      <div class="borderstyle" style="margin-left: 20px">
          <el-button type="success" icon="el-icon-check"  class="iconstyle" circle></el-button>
          <span style="    float: left;margin-left: 46px;margin-top: 31px;">本月下单</span>
          <span style="    float: left;margin-top: 60px;margin-left: -60px;font-size: 25px;">4</span>
          <i class="el-icon-caret-bottom" style="color: red; float: left;margin-top: 86px;margin-left: -66px;"></i>
          <span style="color: red; float: left;margin-top: 85px;margin-left: -42px;">10%</span>
          <span style=" float: left;margin-left: 2px;margin-top: 85px;">同比上月</span>
      </div>
        <div class="borderstyle" style="margin-left: 100px">
            <el-button type="success" icon="el-icon-check"  class="iconstyle" circle></el-button>
            <span style="    float: left;margin-left: 46px;margin-top: 31px;">本月销售额</span>
            <span style="    float: left;margin-top: 60px;margin-left: -78px;font-size: 25px;">54,323</span>
            <i class="el-icon-caret-bottom" style="color: red; float: left;margin-top: 86px;margin-left: -80px;"></i>
            <span style="color: red; float: left;margin-top: 85px;margin-left: -60px;">10%</span>
            <span style=" float: left;margin-left: -9px;margin-top: 85px;">同比上月</span>
        </div>
        <div class="borderstyle" style="margin-left: 150px">
            <el-button type="success" icon="el-icon-check"  class="iconstyle" circle></el-button>
            <span style="    float: left;margin-left: 46px;margin-top: 31px;">退款订单(个)</span>
            <span style="    float: left;margin-top: 60px;margin-left: -78px;font-size: 25px;">6</span>
            <i class="el-icon-caret-bottom" style="color: red; float: left;margin-top: 86px;margin-left: -80px;"></i>
            <span style="color: red; float: left;margin-top: 85px;margin-left: -60px;">10%</span>
            <span style=" float: left;margin-left: -9px;margin-top: 85px;">同比上月</span>
        </div>
    </div>
    <div class="search">
        <div style="margin-top: 30px;margin-left: 45px">
            <span>销售:</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" round style="    margin-left: 70px;">搜索</el-button>
            <el-button plain>重置</el-button>
        </div>
    </div>
      <div style="float: left;width: 900px; margin-left: 20px;margin-top: 20px">
        <el-button type="primary">导出excel</el-button>
      </div>

      <div style=" width: 1160px;margin-left: 20px;margin-top: 20px">
          <div style="float:left; margin-top: 10px">
              <span>日期选择</span>
              <el-select v-model="value" placeholder="请选择">
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
          </div>

          <div style=" margin-top: 20px; float:left; width: 1500px">
              2016-01 <span style=" margin-left: 20px;">年度销售总额:</span> <span style=" font-size: 18px">123.90元:</span>
              <span style=" margin-left: 20px;">年度总订单数:</span> <span style=" font-size: 18px">12笔:</span>
              <span style=" margin-left: 20px;">本月销售总额:</span> <span style=" font-size: 18px">123.90元:</span>
              <span style=" margin-left: 20px;">本月销售总额:</span><span style=" font-size: 18px">12笔:</span>
          </div>
          <div style="float:left; margin-top: 20px">
            <el-table
                  :data="tableData"
                  border
                  style="width: 100%;">
              <el-table-column
                      prop="date"
                      label="订单号"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="商品名称"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="订单金额">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="销售">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="数量">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="订单联系人">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="订单状态">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="订单创建日期">
              </el-table-column>
              <el-table-column
                      prop="address"
                      label="操作">
                  <template slot-scope="scope">
                      <template>
                          <a style="color: #6AABFB">查看订单</a>
                      </template>
                  </template>
              </el-table-column>
          </el-table>
          </div>
          <div style="    margin-bottom: 65px;float: left;margin-top: 20px;">
              <el-pagination

                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="400">
              </el-pagination>
          </div>
      </div>



  </div>
</template>

<script>
  export default {
    data() {
      return {
          currentPage4: 4,
          tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀'
          }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金'
          }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金'
          }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙'
          }],
          options: [{
              value: '选项1',
              label: '黄金糕'
          }, {
              value: '选项2',
              label: '双皮奶'
          }, {
              value: '选项3',
              label: '蚵仔煎'
          }, {
              value: '选项4',
              label: '龙须面'
          }, {
              value: '选项5',
              label: '北京烤鸭'
          }],
          value: ''

      }
    },
    methods:{
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }

    }
  }



</script>

<style scoped>
    .borderstyle{
        width: 300px;
        height: 120px;
        border: 1px solid #E8E8E8;
        float: left;
    }
    .iconstyle{
        width: 83px;
        height: 80px;
        margin-left: 10px;
        margin-top: 20px;
        float: left;
    }
    .search{
        height: 105px;
        width: 1160px;
        background-color: #F7F7F7;
        float: left;
        margin-left: 20px;
        margin-top: 19px;

    }
</style>

