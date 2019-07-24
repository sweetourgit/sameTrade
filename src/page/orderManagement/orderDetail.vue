<template>
  <div>
       <!--备注信息弹窗-->
       <el-dialog title="详情" :visible.sync="dialogFormMark" class="city_list" width="800px" style="margin-top:-100px">
          <table border="0" cellpadding="7" cellspacing="10" bgcolor="#f7f7f7" width="760" style="margin-top:-10px">
              <tr>
                  <td>产品名称：</td>
                  <td>新加坡斜坡滑车+空中吊椅索道滑车SkylineLuge景点门票 ( 即订即用 圣淘沙景点门票）</td>
              </tr>
              <tr>
                  <td>订单ID：</td>
                  <td>24093932018091010185273</td>
              </tr>
              <tr>
                  <td>产品ID：</td>
                  <td>24093932018091010185273</td>
              </tr>
              <tr>
                  <td>团期ID：</td>
                  <td>24093932018091010185273</td>
              </tr>
              <tr>
                  <td>下单时间：</td>
                  <td>2018/09/10 13:37</td>
              </tr>
              <tr>
                  <td>订单状态：</td>
                  <td>预定占位 （占位预留 2018/09/11 13:37）</td>
              </tr>
              <tr>
                  <td>套餐名称：</td>
                  <td>君澜日式豪华房 含早餐 双人不限次温泉门票</td>
              </tr>
              <tr>
                  <td>操作人：</td>
                  <td>阳阳</td>
              </tr>
              <tr>
                  <td>同业销售：</td>
                  <td>阳阳</td>
              </tr>
              <tr>
                  <td>联系人：</td>
                  <td>阳阳</td>
              </tr>
              <tr>
                  <td>电话：</td>
                  <td>13852632541</td>
              </tr>
              <tr>
                  <td>单价：</td>
                  <td>成人 3000.00 * 2 儿童 3000.00*1</td>
              </tr>
              <tr>
                  <td>其他费用：</td>
                  <td>签证费 6000.00</td>
              </tr>
              <tr>
                  <td>应付：</td>
                  <td>15000.00</td>
              </tr>
              <tr>
                  <td>已付：</td>
                  <td>0.00</td>
              </tr>
          </table>
          <el-table :data="tourList" ref="multipleTable" class="table" :header-cell-style="getRowClass" border :cell-style="getCellClass">     
             <el-table-column  prop="name" label="姓名" width="100"></el-table-column>
             <el-table-column  prop="type" label="报名类型" width="160"></el-table-column>
             <el-table-column  prop="phone" label="电话" width="150"></el-table-column>
             <el-table-column  prop="cardId" label="身份证" min-width="200"></el-table-column>
             <el-table-column  prop="sex" label="性别" width="100"></el-table-column>
           </el-table>
           <div class="cancel"><el-button @click="close">&nbsp;取消&nbsp;</el-button></div>
       </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    orderId:0,
    variable:0,
    dialogType:0
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
       }] 
    }
  },
  created(){
  },
  watch: {
      variable:function(){        
        if(this.dialogType==1){
          this.dialogFormMark=true;    
        }
     }
  },
  methods: {
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
</style>