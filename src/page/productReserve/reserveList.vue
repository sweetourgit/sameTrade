<template>
  <div class="reserveList">
    <div style="float:right;">
      <el-button type="primary" @click="submit">预订</el-button>
      <el-button>取消</el-button>
    </div>
    <div class="reserveTitle">
      <span>{{ProductName}}</span>
    </div>
    {{this.find}}
    <table class="reserveTable">
      <tr>
        <td>
          <div class="reserveTd_01">团期计划：</div>
          <div class="reserveTd_02">{{ProductId}}</div>
        </td>
        <td>
          <div class="reserveTd_01">套餐名称：</div>
          <div class="reserveTd_02">{{tcName}}</div>
        </td>
        <td>
          <div class="reserveTd_01">出发地：</div>
          <div class="reserveTd_02">{{cfaddress}}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="reserveTd_01">目的地：</div>
          <div class="reserveTd_02">{{mdaddress}}</div>
        </td>
        <td>
          <div class="reserveTd_01">出发日期：</div>
          <div class="reserveTd_02">{{addDate}}</div>
        </td>
        <td>
          <div class="reserveTd_01">同业：</div>
          <div class="reserveTd_02">{{type}}</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="reserveTd_01">剩余额度：</div>
          <div class="reserveTd_02">{{qutoto}}</div>
        </td>
      </tr>
    </table>
    <!--同业销售、报名人数-->
    <div class="switchText">
      <div class="table_details">
        <div><span class="table_details_01">*</span>同业销售</div>
        <el-select v-model="tradeSales" placeholder="请选择" class="table_details_02">
          <el-option v-for="item in manager" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="table_details">
        <div><span class="table_details_01">*</span>直客价：</div>
        <div class="table_details_02"><el-switch class="switchButton" v-model="customerPrice"></el-switch></div>
      </div>
      <div class="line"></div>
      <div><span class="table_details_01">*</span>报名人数</div>
      <div class="mb10">
        <div class="adult" v-for="item in arrprice" >
            <div class="ml10">{{item.enrollName}}￥{{item.price_02}}.00*{{item.adult}}</div>
          <div class="ml10"><el-input-number @change="handleChange(value,item.enrollName)" v-model="item.adult" :min="0" :max="10" label="描述文字" size="mini"></el-input-number></div>
          <div>余位：9</div>
        </div>
        <!--<div class="children">单房差￥16999.00*2</div>-->
        <div class="order">
          <div class="ml10">其他费用</div>
          <div class="ml10">
            <el-input class="order_input01" v-model="other_price" @change="otheriput"></el-input>
            <el-input class="order_input02" v-model="other_note"></el-input>
          </div>
          <div class="fr">总价：{{Total}}</div>
        </div>
        <div class="line"></div>
        <div><span class="table_details_01">*</span>下单方式</div>
        <div class="ml10">
          <el-radio v-model="order" label="1">确认占位</el-radio>
          <el-radio v-model="order" label="2">预订占位</el-radio>
          <el-radio v-model="order" label="3">预订不占位</el-radio>
        </div>
      </div>
    </div>
    <!--联系人-->
    <div class="switchText mb10">
      <div class="people">
        <div><span class="table_details_01">*</span>订单联系人</div>
        <el-input v-model="ordertinker" class="ml10 w300"></el-input>
      </div>
      <div class="people">
        <div><span class="table_details_01">*</span>联系电话</div>
        <el-input v-model="orderphone" class="ml10 w300"></el-input>
      </div>
      <div class="line"></div>
      <table cellpadding="5" cellspacing="0" width="100%" class="tour-list">
        <tr bgcolor="#f7f7f7">
          <td width="100">姓名</td>
          <td width="160">报名类型</td>
          <td width="160">电话</td>
          <td>身份证</td>
          <td width="100">性别</td>
        </tr>
        <tr v-for="(item, index) in ruleForm.guests" :key="index" @click="handleDelete(index)">
          <td><el-input v-model="item.cnName"></el-input></td>
          <td><el-input v-model="item.enrollName" disabled></el-input></td>
          <td><el-input v-model="item.mobile"></el-input></td>
          <td><el-input v-model="item.idCard"></el-input></td>
          <td>
            <el-select v-model="item.sex" placeholder="请选择">
              <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>

    </div>
    

  </div>
</template>

<script>
  export default {
    data() {
      return {
          planID:'',
          ruleForm:{
              guests:[

              ]
          },
          options: [{
              value: 1,
              label: '男'
          },{
              value: 2,
              label: '女'
          },{
              value: 3,
              label: '未知'
          }],
          ordertinker:'',
          orderphone:'',
          Total:'',
          other_price:'',
          other_note:'',
          arrprice:"",
          ProductName:"绝美斯米兰 蓝调普吉6晚8日游（往返转机）",
          ProductId:"TC-GTY-1001-01-180806-01",
          tcName:"绝美斯米兰",
          cfaddress:"沈阳",
          mdaddress:"普吉岛",
          addDate:"2018-06-06",
          type:"国旅",
          qutoto:"270,164.00",

          id:0,
        tradeSales:'',//同业销售model
        manager:[{//同业销售下拉框
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
        customerPrice:true,//直客价开关
        adult: 0,//成人计数器
        children:0,//儿童计数器
        order:'1',//下单方式
        tableData: [{//联系人表格
          name: '洋洋',
          type: '成人',
          phone: '15624542154',
          IDcard:'215468198703154568',
          sex:'男'
        },{
          name: '洋洋',
          type: '成人',
          phone: '15624542154',
          IDcard:'215468198703154568',
          sex:'男'
        },{
          name: '洋洋',
          type: '成人',
          phone: '15624542154',
          IDcard:'215468198703154568',
          sex:'男'
        }],
          find:{}

      }
    },
    methods:{
        submit(){
            //联系人信息
            var tinker = {}
            var cout = ""
            tinker.Name = this.ordertinker
            tinker.Tel = this.orderphone
                this.arrprice.forEach(v =>{
                  cout+= parseInt(v.adult)
            })
            var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/order/all/api/siorderinsert",
                {
                    "object": {
                        "teamID":that.$route.query.id,
                        "planID":that.planID,
                        "orderStatus": 1,
                        "refundStatus": 1,
                        "occupyStatus": that.order,
                        "payable": that.Total,
                        "favourable": [
                            {
                                "id": 0,
                                "createTime": 0,
                                "orderID": 0,
                                "price": that.other_price,
                                "title": that.other_note,
                                "favMode": 1,
                                "mark": "string"
                            }
                        ],
                        "contact": JSON.stringify(tinker),
                        "endTime": 0,
                        "orderChannel": 1,
                        "orgID": sessionStorage.getItem('aid'),
                        "userID": that.tradeSales,
                        "guest": that.ruleForm.guests,
                        "number": cout,
                        "productType": 1,
                        "remark": "string"
                    }
                },
            )
                .then(function (obj) {
                    console.log(obj)

                })
                .catch(function (obj) {
                })
            this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
            });
            this.$router.push({
                path: '/productList',
                
            })
        },
        otheriput(){
            this.changecout()
        },
      oneinfo(){
          var that = this
          this.$http.post(
              this.GLOBAL.serverSrc + "/teamquery/get/api/teampreview",
              {
                  "id":that.id
              },
          )
              .then(function (obj) {
                that.ProductName = obj.data.object.title
                that.ProductId = obj.data.object.groupCode
                that.tcName = obj.data.object.package
                that.cfaddress = obj.data.object.pod
                that.mdaddress = obj.data.object.destination
                that.addDate = obj.data.object.date

              })
              .catch(function (obj) {
              })

          this.$http.post(
              this.GLOBAL.serverSrc + "/universal/localcomp/api/get",
              {
                  "id":sessionStorage.getItem('aid')?sessionStorage.getItem('aid'):1
              },
          )
              .then(function (obj) {
                  that.type = obj.data.object.name
                  that.qutoto = obj.data.object.quota


              })
              .catch(function (obj) {
              })

          this.$http.post(
              this.GLOBAL.serverSrc + " /universal/localcomp/api/PeerUserList",
              {
                  "object": {
                      "peerUserType": 2,
                      "localCompID": sessionStorage.getItem('aid'),
                  }
              },
          )
              .then(function (obj) {
                  console.log(obj)


              })
              .catch(function (obj) {
              })



      },
      saverlist(){
          var att = []
          var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/universal/localcomp/api/PeerUserList",
                {
                    "object": {

                        "peerUserType": 2,
                        "localCompID":  sessionStorage.getItem('aid'),

                    }
                },
            )
                .then(function (obj) {
                   console.log(obj.data.objects)
                    that.manager  = obj.data.objects.map(v => {
                        return {
                            'label': v.name,
                            'value': v.id
                        }
                    })
                })
                .catch(function (obj) {
                })
        },
      changeinfo(date){
        console.log(date)
          this.planID = date.planID
         this.addDate = date.date
         this.Total = date.Total
         this.arrprice = date.plan_Enrolls
          console.log(this.arrprice)
          this.arrprice.forEach(v => {
              for (var i= 0; i< v.adult; i++){
                  this.ruleForm.guests.push({
                      'cnName': '',
                      'enName': 0,
                      'enrollName': v.enrollName,
                      'mobile': '',
                      'idCard': '',
                      'sex': '',
                      'isDeleted': 0,
                      'enrollPrice': v.price_02,
                      'productType': 1,
                      'enrollID': 1,
                      'singlePrice': v.price_02,
                      'bornDate': 0,
                      'credType': 0,
                      'credCode': 0,
                      'credTOV': 0,
                      'orderID': 0,
                      'orgID': sessionStorage.getItem('aid'),
                      'userID': 1,
                      "teamID":this.$route.query.id,
                      "planID":this.planID,
                      'createTime': Date.parse(new Date()),
                      'code': 0
                  })
              }
          })
        },
      handleChange(value,name){
          let numberNum = 0;
          this.arrprice.forEach(v => numberNum+=v.adult);
          console.log(numberNum)
          if(numberNum >= this.ruleForm.guests.length) {
              for(let i=this.ruleForm.guests.length; i<numberNum; i++) {

                  this.ruleForm.guests.push({
                      'cnName': '',
                      'enName': 0,
                      'enrollName': name,
                      'mobile': '',
                      'idCard': '',
                      'sex': '',
                      'isDeleted': 0,
                      'enrollPrice': v.price_02,
                      'productType': 1,
                      'enrollID': 1,
                      'singlePrice': v.price_02,
                      'bornDate': 0,
                      'credType': 0,
                      'credCode': 0,
                      'credTOV': 0,
                      'orderID': 0,
                      'orgID': sessionStorage.getItem('aid'),
                      'userID': 1,
                      "teamID":this.$route.query.id,
                      "planID":this.planID,
                      'createTime': Date.parse(new Date()),
                      'code': 0
                  })
              }
              console.log(this.ruleForm.guests)

          } else {
              // let isNum = this.ruleForm.guests.length;
              // for(let i=0; i<(isNum-value); i++) {
              //   this.ruleForm.guests.pop();
              // }
          }

          //总价
            this.changecout()
        },
        changecout(){
            var cout = 0;

            this.arrprice.forEach( v=>{
                cout += v.adult * v.price_02
            })
            cout += parseInt(this.other_price)
            this.Total = cout
        },
        handleDelete(key) {
            let numberNum = 0;
            this.arrprice.forEach(v => numberNum+=v.adult);
            if(numberNum < this.ruleForm.guests.length) {
                this.$confirm('是否删除该条信息', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ruleForm.guests.splice(key, 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },

    },
    created(){
       this.id =  this.$route.query.id;
        this.oneinfo()
        this.saverlist()
        this.changeinfo(this.$route.params.page)

    }
  }



</script>

<style scoped>
.reserveList{ width: 1100px; overflow: hidden; font-size: 14px; margin: 0 0 100px 0;}
.reserveTitle{ width: 1100px; background: #f6f6f6; line-height: 40px; overflow: hidden;margin: 60px 0 0 0; }
.reserveTitle span{ margin: 0 0 0 10px; }
.reserveTable{ width: 1100px; background: #f6f6f6; line-height: 40px; overflow: hidden;margin:20px 0 0 0; }
.reserveTable td{width: 360px;}
.reserveTd_01{width:80px; text-align:right; overflow: hidden;float: left;}
.reserveTd_02{margin: 0 0 0 10px;text-align: left; float: left;}
.switchText{ width: 1100px; background: #f6f6f6; line-height: 40px; overflow: hidden;margin:20px 0 0 0;}
.switchText td{width: 260px;}
.table_details{float:left; width:450px; margin: 0 0 15px 0;}
.table_details_01{color:red; margin:0 0 0 10px;}
.table_details_02{ margin:0 0 0 10px;}
.line{width: 1080px; text-align: center; height: 1px; background: #e5e5e5; overflow: hidden; margin: 0 0 0 10px;}
.mb10{margin-bottom:10px; }
.ml10{margin-left:10px; }
.adult{float:left; width:200px; text-align:center;}
.children{float:left; width:150px; text-align:center; margin:0 0 0 30px;}
.order{float:left;margin:0 0 0 30px;}
.fr{float:right}
.order_input01{float:left;width:200px;}
.order_input02{float:left;width:200px; margin:0 0 0 20px}
.people{width:400px; float:left; margin:0 0 15px 0;}
.w300{width: 300px;}
.tableData{width: 901px; clear: both;overflow: hidden;}

  
</style>

