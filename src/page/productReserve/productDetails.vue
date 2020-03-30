<template>
  <div class="reserveList">
    <div class="color_d7">ID:{{ruleForm.id}}</div>
    <div class="title">{{ruleForm.title}}</div>
    <div class="mt20 oh">
    <!--左侧轮播图和日历-->
      <div class="picture">
        <!--图片轮播-->
        <el-carousel :interval="6000" trigger="click" height="380px">
          <el-carousel-item v-for="(item,index) in ruleForm.pepeatpic" :key="item.id">
            <img :src=item.picturePath style="width:100%;height:380px;">
          </el-carousel-item>
        </el-carousel>
        <!--日历-->
        <div class="w570">
          <ul class="mouth" id="month">
            <li v-for="(item,index) in monthsTitle" v-bind:class="{current: currentIndex==index}" class="mouth_date" @click="pickNav('nav',item.Year,item.Month,index)">{{item.Year}}年{{item.Month}}月</li>
          </ul>
          <div class="mouth_fl" @click="pickNav('pre')"><</div>
          <div class="mouth_fr" @click="pickNav('next')">></div>
          <ul class="week">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
          <ul class="days">
            <!--显示日期-->
            <li v-for="(item,index) in arrDay" v-bind:class="{active:chooseDate==currentYear+currentMonth+(item<10?'0'+item:item)}">             
              <div class="tc">{{item}}</div>
                <!--判断当前日期是否有计划，有则显示-->
                <!-- surplus为0余位才是0 -->
                <div v-for="day in calendarDate" v-bind:class="{price_color:day.remaining==0}" v-if="day.date==currentYear+currentMonth+(item<10?'0'+item:item)" @click="chooseDateMes(day.date,day.surplus,day)">
                  <div>{{$route.query.customerPrice?day.enrolls[0].price_01:day.enrolls[0].price_02}}</div>
                  <div v-if="day.remaining==0">已售罄</div>
                  <div v-else>余位{{day.remaining}}</div>
                </div>
            </li>
          </ul>
        </div>
      </div>
      <!--右侧基本信息-->
      <div class="fl">
        <div class="information">
        <div class="infor_bor">
          <div>
            <div class="infor_title">亮点：</div>
            <div v-for="(item,i) in ruleForm.strengths" :key="i" class="fl">{{item.strength}} &nbsp;</div>
          </div><br/>
          <div>
            <div class="infor_title">行程天数：</div>
            <div class="fl">{{ruleForm.day}}天{{ruleForm.night}}晚</div>
          </div><br/>
          <div>
            <div class="infor_title">出游人群：</div>
            <div class="fl">{{this.ruleForm.crowdID}}&nbsp;</div>
          </div><br/>
          <div>
            <div class="infor_title">主题：</div>
            <div class="fl">{{this.ruleForm.themeID}}&nbsp;</div>
          </div><br/>
          <div>
            <div class="infor_title">套餐：</div>
            <div class="block" >
              <div class="package_01" v-bind:class="{border_blue:currentPIndex==index}" v-for="(item, index) in ruleForm.package" :key="index" @click="clickPackage(index)">
                <div class="package_01_title">{{item.name}}</div>
                <div class="tc">出发地：{{item.pod}}</div>
                <div class="tc">目的地：{{item.destination}}</div>
              </div>
            </div>
          </div>
          <div class="cb">
            <div class="infor_title">出行日期：</div>
            <div class="fl">{{rowDate.travelTime}}</div>
          </div>
          <br/>
          <div>
            <div class="adult" v-for="(item, k) in rowDate.enrolls" :key="k">
              <div>{{item.enrollName}}￥{{$route.query.customerPrice?item.price_01:item.price_02}}*{{item.adult}}</div>
              <div><el-input-number v-model="item.adult" :min="0" :max="item.quota==0?rowDate.remaining:item.quota" size="mini" @change="handleChange(item)"></el-input-number></div>
            </div>
          </div>
        </div>
      </div>
      <div class="price">
          <div class="price_text">总价：{{rowDate.Total}}</div>
          <el-button class="price_button" type="primary" @click="handeSave">预订</el-button>
      </div>
      </div>
    </div>
    <!--产品概况-->
    <div class="cb">
      <div class="survey">产品概况</div>
      <div class="line"></div>
      <div class="mark" v-html="ruleForm.mark"></div>
    </div>
    <div class="cb oh">
      <div class="survey">行程信息</div>
      <div class="line content-day"></div>
      <div style="margin-left:94px;" class="oh">
        <div class="package_02" v-bind:class="{border_blue:currentPIndex==index}" v-for="(item, index) in ruleForm.package" :key="index" @click="clickPackage(index)">
           <div class="package_01_title">{{item.name}}</div>
           <div class="tc">出发地：{{item.pod}}</div>
           <div class="tc">目的地：{{item.destination}}</div>
        </div>
      </div>
      <div class="oh">
        <div class="nav">
        <div v-bind:class="['nav_left',{'fx':fixed===true}]">
          <div v-bind:class="['nav_left_02',{navactive:active===k}]" v-for="(item, k) in scheduleData" @click="scrollTo(k,1)">{{item.name}}</div>
        </div>
        </div>
        <div class="travel">
          <!--出行信息-->
          <div class="travel_bc oh">
            <div class="nav_right">
              <div style="clear:both; padding:20px 0 80px 30px;" v-for="(item, k) in this.packageInfo.traffic" :key="k">
                <div class="nav_days">第{{item.day}}天</div>
                <div class="fl">
                  <div class="nav_travel">{{item.podCity}}-{{item.arriveCity}}</div>
                  <div class="airport">
                    <div class="fb">{{item.podTime}}</div>
                    <div class="airport01">{{item.podPlace}}</div>
                  </div>
                  <div class="aviation">
                    <div class="aviation_01">{{item.company}}{{item.theNumber}}</div>
                    <div class="aviation_line"></div>
                    <div class="fb" v-if="item.ext_Stopover != '[]'">经停：{{item.ext_Stopover}}</div>
                  </div>
                  <div class="airport">
                    <div class="fb">{{item.arriveTime}}</div>
                    <div class="airport01">{{item.arrivePlace}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--酒店信息-->
          <div class="hotel content-day" v-if="false">
            <div class="mt20">
              <div class="hotel_img"></div>
              <div class="holiday">
                <div class="holiday_title">洲际斐济高尔夫度假村及Spa</div>
                <div>InterContinental Fiji Golf Resort & Spa</div>
                <div><span class="fb">地址：</span>Maro Road, 辛加东卡, 斐济</div>
                <div><span class="fb">星级：</span>3星</div>
                <div><span class="fb">入住晚数：</span>3晚</div>
                <div><span class="fb">房型：</span>海景房</div>
                <div><span class="fb">床型：</span>大床房</div>
              </div>
              <div class="cb">酒店周边环境很好，景色优美，非常适合拍照，饮食娱乐也都很方便。酒店员工服务非常的热情，房间宽敞明亮，各种设施齐全，值得推荐！</div>
            </div>
          </div>
          <!--日程信息-->
          <div class="content-day h50"></div>
          <div class="schedule" v-for="(item, k) in this.packageInfo.schedules" :key="k">
            <div>
              <div class="dateDays">{{k + 1}}</div>
              <div class="fl lh50">{{item.subject}}</div>
            </div>
            <div class="schedule_hotel">
              <div class="w60">酒店：</div>
              <div class="fl">{{JSON.parse(item.ext_Hotel).Details}}</div>
            </div>
            <div class="schedule_hotel">
              <div class="food">餐饮：</div>
              <div class="ml60" v-for="(data, i) in JSON.parse(item.ext_Meals)" :key="i">
                <div>
                  <span v-if="i==0">早餐：</span>
                  <span v-if="i==1">午餐：</span>
                  <span v-if="i==2">晚餐：</span>
                  <span v-if="data.Myself==1">{{data.Detail}}</span>
                  <span v-if="data.Myself==0">{{data.Detail}}</span>          
                </div>
              </div>
            </div>
            <div class="schedule_hotel">
              <div class="food">详情：</div>
              <div class="ml60" v-html="item.info"></div>
            </div>
            <div class="schedule_hotel">
              <div class="food">活动：</div>
              <div class="bc_f2" v-for="(row, r) in item.activitys" :key="r">
                <div>
                  <div class="fl ml20"><span class="fb">类型：</span>
                    <span v-show="row.activityType == 0">景点</span>
                    <span v-show="row.activityType == 1">购物</span>
                    <span v-show="row.activityType == 2">自费</span>
                  </div>
                  <div class="fl ml20"><span class="fb">城市：</span>{{row.name}}</div>
                  <div class="fl ml20"><span class="fb">景点名称：</span>{{row.typeExt}}</div>
                  <div class="fl ml20"><span class="fb">活动时间：</span>{{row.time}}分钟</div>
                </div>
                <div class="cb">
                  <div class="w80">详情说明：</div>
                  <div class="w700" v-html="row.details"></div>
                </div>
                <div class="cb">
                  <div class="w80">景点简介：</div>
                  <div class="w700 memo" v-html="row.memo"></div>
                </div>
                <div class="cb">
                  <div class="w80">图片：</div>
                  <div class="w700" style="margin:20px 0">
                    <div class="fl" v-for="(pic,index) in JSON.parse(row.picture)"><img style="width:300px; height200px; margin:0 10px 0 0" :src="row.picturePath.split('，',index+1)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--费用说明-->
    <div class="cb" ref="instructions">
      <div class="survey">费用说明</div>
      <div class="line"></div>
      <div style="margin:20px 0 0 0">
        <div class="nav">
        <div v-bind:class="['nav_left',{'fx':fixed1===true}]">
          <div v-bind:class="['nav_left_02',{navactive:active1===index}]" v-for="(list, index) in ruleForm.instructions" :key="index" @click="scrollTo(index,2)">{{list.title}}</div>
        </div>
        </div>
        <div class="cost">
          <div class="schedule content-schedule" v-for="(list, index) in ruleForm.instructions" :key="index">
            <div class="cost_title">#{{list.title}}</div>
            <ul>
              <li v-html="list.content"></li>
            </ul>
          </div>     
        </div>
      </div>
    </div>
    <!--预订须知-->
    <div class="cb" ref="instructions1">
      <div class="survey">预订须知</div>
      <div class="line"></div>
      <div style="margin:20px 0 0 0;" v-for="(list, index) in ruleForm.others" :key="index">
        <div class="cost_01 schedule" v-if="list.menuType==2">
          <div class="cost_title">#{{list.title}}</div>
          <ul>
            <li v-html="list.content"></li>
          </ul>
        </div>
      </div>
    </div>
    <!--使用说明-->
    <div class="cb">
      <div class="survey">使用说明</div>
      <div class="line"></div>
      <div style="margin:20px 0 0 0;" v-for="(list, index) in ruleForm.others" :key="index">
        <div class="cost_01 schedule" v-if="list.menuType==3">
          <div class="cost_title">#{{list.title}}</div>
          <ul>
            <li v-html="list.content"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        crowdlist:[],
        themelist:[],
        ruleForm:{},
        packageInfo: '', //选中的套餐
        currentPIndex:0, //选中的套餐index
        scheduleData: [
        {name: '出行信息'},
        //{name: '酒店信息'},
        {name: '日程信息'}
        ],
        //日历
        monthsTitle:[],
        calendarDate:[],
        currentYear: 0, // 当前月的年份
        currentMonth: 0,// 当前月的月份
        currentIndex:0,//当前选中月份索引
        arrDay:[], //日历日期        
        chooseDate:0,//选中团期
        rowDate:{
          'travelTime': '----年--月--日',
          'Total': 0
        },
        ulLeft:0,
        fixed:false,
        active: 0, // 当前激活的导航索引
        fixed1:false,
        active1: 0 
      }
    },
    mounted(){  
      document.getElementById("viewBox").addEventListener('scroll', this.onScroll)
      document.getElementById("viewBox").addEventListener('scroll', this.onScroll1)
      this.getCrowdlist();
      this.getThemelist();
      setTimeout(() => {
        this.getProductInfo();
      },300);
    },
    methods:{
      onScroll(){
        // 获取所有锚点元素
        const navContents = document.querySelectorAll('.content-day')
        // 所有锚点元素的 offsetTop
        const offsetTopArr = []
        navContents.forEach(item => {
          offsetTopArr.push(item.offsetTop)
        })
        const scrollTop = document.getElementById("viewBox").scrollTop 
        // 定义当前点亮的导航下标
        let navIndex = 0
        if(scrollTop >= offsetTopArr[0]&&scrollTop <= this.$refs['instructions'].offsetTop-180){
            this.fixed=true;
          }else{
            this.fixed=false;
        }
        for (let n = 0; n < offsetTopArr.length; n++) {
          // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
          // 那么此时导航索引就应该是 n 了     
          if (scrollTop >= offsetTopArr[n]) {
            navIndex = n; 
          }
        }
        // 把下标赋值给 vue 的 data
        this.active = navIndex;
      },
      onScroll1(){
        // 获取所有锚点元素
        const navContents = document.querySelectorAll('.content-schedule')
        // 所有锚点元素的 offsetTop
        const offsetTopArr = []
        navContents.forEach(item => {
          offsetTopArr.push(item.offsetTop)
        })
        const scrollTop = document.getElementById("viewBox").scrollTop 
        // 定义当前点亮的导航下标
        let navIndex = 0
        if(scrollTop >= offsetTopArr[0]&&scrollTop <= this.$refs['instructions1'].offsetTop-180){
            this.fixed1=true;
          }else{
            this.fixed1=false;
        }
        for (let n = 0; n < offsetTopArr.length; n++) {
          // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
          // 那么此时导航索引就应该是 n 了     
          if (scrollTop >= offsetTopArr[n]) {
            navIndex = n; 
          }
        }
        // 把下标赋值给 vue 的 data
        this.active1 = navIndex;
      },
      scrollTo(index,i) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      let targetOffsetTop = 0;
      if(i==1){
        targetOffsetTop = document.querySelectorAll('.content-day')[index].offsetTop
      }else{
        targetOffsetTop = document.querySelectorAll('.content-schedule')[index].offsetTop
      }
      
      // 获取当前 offsetTop
      let scrollTop = document.getElementById("viewBox").scrollTop
      // 定义一次跳 50 个像素，数字越大跳得越快
      const STEP = 50
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
      // 定义往下滑函数
      function smoothDown() {
          // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
          if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
              scrollTop += STEP
            } else {
              scrollTop = targetOffsetTop
            }
            document.getElementById("viewBox").scrollTop = scrollTop
            // 屏幕在绘制下一帧时会回调传给 requestAnimationFrame 的函数
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            requestAnimationFrame(smoothDown)
          }
        }
        // 定义往上滑函数
        function smoothUp() {
          if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
              scrollTop -= STEP
            } else {
              scrollTop = targetOffsetTop
            }
            document.getElementById("viewBox").scrollTop = scrollTop
            requestAnimationFrame(smoothUp)
          }
        }
      },
      getCrowdlist(){
        this.$http.post(this.GLOBAL.serverSrc + "/indirect/universal/crowd/crowdlist",{
         'object':{isDeleted: 0}
        }).then(res => {
          this.crowdlist=res.data.objects;
       })
      },
      getThemelist(){
        this.$http.post(this.GLOBAL.serverSrc + "/indirect/universal/theme/themelist",{
         'object':{isDeleted: 0}
        }).then(res => {
          this.themelist=res.data.objects;
       })
      },
      getProductInfo(){
        this.$http.post(this.GLOBAL.serverSrc + "/indirect/team/mobile/detail",{
          "id":this.$route.query.id
        }).then(res => {
          this.ruleForm = res.data.object;
          //人群
          this.crowdlist.filter(v => {
            if(v.id==this.ruleForm.crowdID){
              this.ruleForm.crowdID = v.name
            }
          });
          //主题
          this.themelist.filter(v => {
            if(v.id==this.ruleForm.themeID){
              this.ruleForm.themeID = v.name
            }
          });
          this.clickPackage(0);   
        })
      },
      getMonths(){
        if(this.calendarDate.length!=0){
          //生成月份数组
          let arr=[];
          for(let i=0;i<this.calendarDate.length;i++){
              if(arr.length==0){
                 arr.push({'Month':this.calendarDate[0].date.toString().substr(4,2),'Year':this.calendarDate[0].date.toString().substr(0,4)});
              }
              let a=0;
              for(let j=0;j<arr.length;j++){               
                if(this.calendarDate[i].date.toString().substr(0,6)==arr[j].Year+''+arr[j].Month){
                   a=1;
                }
              }
              if(a==0){
                  arr.push({'Month':this.calendarDate[i].date.toString().substr(4,2),'Year':this.calendarDate[i].date.toString().substr(0,4)});
                }
          }
          this.monthsTitle=arr;          
        }else{
          this.monthsTitle=[{'Month':new Date().getMonth()+1>9?new Date().getMonth()+1:'0'+(new Date().getMonth()+1),'Year':new Date().getFullYear()}]
        }      
        this.currentYear=this.monthsTitle[0].Year;
        this.currentMonth=this.monthsTitle[0].Month;
        this.currentIndex=0;
        this.initCalendarTbody();
      },
      // 按套餐获取详情数据
      clickPackage(index) {
        this.currentPIndex=index;
        this.packageInfo=this.ruleForm.package[index];
        this.getCalendarDate();
      },
      //获取日历数据
      getCalendarDate(){
        this.chooseDate=0;
        this.rowDate = {
          'travelTime': '----年--月--日',
          'Total': 0
        };
        let month = new Date().getMonth()+1 < 10 ? '0' + (new Date().getMonth()+1) : new Date().getMonth()+1;
        this.$http.post(this.GLOBAL.serverSrc + '/indirect/team/mobile/package', {
          'object': {
            'packageID': this.ruleForm.package[this.currentPIndex].id
          }
        }).then(res => {
          // 处理日历数据
          res.data.objects.map(v => {
            v.enrolls.map(k => {
              k.adult = 0;
            })
          })
          this.calendarDate = [];
          this.calendarDate = res.data.objects;
          this.getMonths();
        })
      },
      //日历导航切换
      pickNav(type,year,month,index){
        //向前翻页
        if(type == "pre"){
          if(this.currentIndex>0){
            this.currentIndex--;
            this.sider("pre");
          }        
        }
        //向后翻页
        if(type == "next"){
          if(this.currentIndex<this.monthsTitle.length-1){
            this.currentIndex++; 
            this.sider("next");
          }
        }
        //点击导航
        if(type == "nav"){
          this.currentIndex=index;
        }
        this.currentYear=this.monthsTitle[this.currentIndex].Year;
        this.currentMonth=this.monthsTitle[this.currentIndex].Month;
        this.initCalendarTbody();
      },
      sider(type){  //滑动效果
        var _this = this;
        //target定义的滑动终点的left值
        var target; 
        if(type=="next"){
          target = this.ulLeft == 0?-130:Number(this.ulLeft.slice(0,-2))-130;
        }else{
          target = this.ulLeft == 0?130:Number(this.ulLeft.slice(0,-2))+130;
        }    

        var oDiv = document.getElementById("month");
        if(this.monthsTitle.length>4){
           var timer = setInterval(sider,'10');
        }
        //滑动方法
        function sider(){
          var left = _this.ulLeft;
          left = left == 0?0:left.slice(0,-2);
          left=Number(left);       
          //左右翻页判断
          if(type=="next"){
            if(left>target){
             left-=5;
            }else{
               clearInterval(timer);//如果到终点就把定时器关掉
            }
          }else{
            if(left<target){
             left+=5;
            }else{
               clearInterval(timer);
            }
          }
          _this.ulLeft=oDiv.style.left=left+'px';
        }
      },
      //生成日历
      initCalendarTbody(){
        //默认选中数据第一个月份
        if(this.currentYear==0){
          this.currentYear=this.monthsTitle[0].Year;
          this.currentMonth=this.monthsTitle[0].Month;
        }
        //贮存每一天
        for (var i = 0; i < 42; i++) {
            this.arrDay[i] = "";
        }
        //循环团期的每一天，没有团期时为当前月份
        for (var i = 0; i < new Date(this.currentYear, this.currentMonth, 0).getDate(); i++) {
            this.arrDay[i + new Date(this.currentYear, this.currentMonth - 1, 1).getDay()] = i + 1;  //判断1号是星期几确定日期从第几个表格开始显示
        }
      },
      handleChange(item) {
        let numberNum = 0;
        this.rowDate.enrolls.forEach(v => 
          numberNum += v.adult *(this.$route.query.customerPrice==true?v.price_01:v.price_02)
        )
        this.rowDate.Total = numberNum
      },
      //选择团期
      chooseDateMes(dep,surplus,item){  //dep：计划日期,surplus：选中日期余位
      // surplus为0余位才是0
        if(surplus!=0){
          this.chooseDate=dep;
          item.Total = 0;
          item.travelTime = String(item.date).substring(0, 4) + '年' + String(item.date).substring(4, 6) + '月' + String(item.date).substring(6) + '日';
          this.rowDate = item;
        }
      },    
      // 预定按钮
      handeSave(){  
        if(this.chooseDate==0){
          this.$message.error("请选择团期");
          return;
        } 
        this.$router.push({
          name: '详情预定',
          params: {
            page: this.rowDate
          },
          query: {
              id: this.$route.query.id
          }
        })
      }
    }
  }



  
</script>
<style scoped>
.reserveList{ width: 1100px; overflow: hidden; font-size: 14px; margin: 0 0 100px 0;}
.color_d7{color: #ccc;}
.title{font-size: 16px; line-height: 30px; margin: 10px 0 0 0;}
.picture{width: 570px; float: left;}
.banner{width: 570px; height: 380px;}
.mt20{margin: 20px 0 0 0;}
.w570{width: 570px; overflow: hidden;position: relative;}
.cb{clear: both}
.mark{width:1050px;margin:15px 0 0 15px;background:#f6f6f6;padding: 15px;line-height: 22px}
.mark >>> img{width: 100%}
.mouth{list-style-type: none;padding:0;margin-left: 25px;margin-top: 30px;display:flex;width:100%;position: absolute;left:0;}
ul{list-style-type: none}
.mouth_fl{position: absolute;left:0;top:30px;font-size: 16px;font-weight:bold;background-color:#fff;width: 20px;cursor:pointer;}
.mouth_fr{position: absolute;right:-8px;top:30px;font-size: 16px;font-weight:bold;background-color:#fff;width: 20px;cursor:pointer;}
.mouth_date{float: left;width: 130px;text-align: center;flex-shrink:0;cursor:pointer;}
.week{ width: 570px; height: 30px; line-height: 30px; background: #f6f6f6; overflow: hidden;margin:65px 0 0 -40px;}
.week li{width: 80px; float: left; text-align: center;}
.days{width:570px;margin:10px 0 0 -40px;}
.days li{width: 80px; height: 80px;line-height: 25px; float: left;cursor:pointer;}
.tc{text-align: center;}
.information{width: 500px; border: 1px solid #e6e6e6;margin: 0 0 0 25px;line-height: 30px; overflow: hidden;}
.infor_bor{width: 470px; margin: 15px 15px 0 15px;}
.infor_title{width: 80px; float: left;}
.package_01{width: 180px; border:1px solid #e6e6e6; float: left; margin: 10px 10px 0 0;cursor:pointer;}
.package_02{width:150px;border:1px solid #e6e6e6;float: left; margin: 15px;padding: 10px;cursor:pointer;}
.border_blue{border:1px solid #2e94f9;}
.package_01_title{margin: 0 0 0 10px;}
.block{width:390px; overflow:hidden; float:left; margin:0 0 10px 0;}
#isBlock{border: solid 1px #409EFF !important;}
#isPage{border: solid 1px #87695e;}
.adult{float: left; margin: 0 25px 30px 0;}
.price{border-left: 1px solid #f6f6f6;border-right: 1px solid #f6f6f6;border-bottom: 1px solid #f6f6f6;height: 60px; clear: both; width: 500px;margin: 0 0 0 25px;}
.price_text{margin: 0 0 0 15px; float: left;line-height: 60px; font-weight: bold; color: #000;}
.price_button{float: right;margin: 10px 15px 0 0;}
.survey{padding: 20px 0 0 10px; overflow: hidden;height: 40px; font-size: 16px;}
.line{width: 1080px; text-align: center; height: 1px; background: #e5e5e5; overflow: hidden; margin: 0 0 0 10px;}
.travel{float:left; margin:0 0 0 140px;}
.travel_bc{width:930px;background:#f2f2f2; border-radius:5px;overflow: hidden;}
.nav{clear:both; padding:20px 0 0 0;position: relative;}
.nav_left{line-height:40px; text-align:center;width: 94px;position: absolute;top:0;left:0;}
#isSchedules{ width:94px; border-right:2px solid #87695e;cursor:pointer}
.nav_left_02{ width:94px; border-right:2px solid #d8d8d8;cursor:pointer;overflow: hidden;line-height: 20px;padding:10px 0}
.nav_right{margin:50px 50px 50px 80px;}
.nav_days{float:left; font-weight:bold; font-size:18px; margin:30px 0 0 0; width:60px;}
.fl{float: left;}
.nav_travel{float:left; margin:30px 80px 0 80px; width: 100px;}
.airport{float:left; margin:0px 10px 0 10px; width:60px; text-align:center; line-height:25px;}
.fb{font-weight: bold;}
.airport01{font-weight:bold; width:60px;}
.aviation{float:left; text-align:center; line-height:25px; width:250px;}
.aviation_01{font-weight:bold; font-size:18px;}
.aviation_line{border:1px solid #797979; margin:15px 0 0 0;}
.hotel{margin: 20px 0 0 0; line-height: 30px;}
.hotel_img{width: 360px; height: 270px; background: #eee; float: left;}
.holiday{float: left;margin: 0 0 0 30px; width: 540px; overflow: hidden;}
.holiday_title{font-size:18px; font-weight: bold; line-height: 50px;}
.mt20{margin: 20px 0 0 0;}
.dateDays{width: 50px; height: 50px; background: #87695e; color: #fff; font-size: 18px; line-height: 50px; text-align: center; border-radius: 50%;font-weight: bold;float: left;margin: 0 20px 0 0;}
.lh50{line-height: 50px;}
.schedule{margin: 20px 0 0 0; line-height: 30px; width: 930px; overflow: hidden;}
.schedule_hotel{clear: both;padding: 20px 0 0 0;}
.w60{width: 50px; float: left; font-weight: bold;}
.food{width: 50px; font-weight: bold;}
.ml60{margin: 0 0 0 60px;}
.bc_f2{background: #f2f2f2; width: 820px; border-radius: 5px; margin: 10px 0 0 0;}
.ml20{margin: 10px 40px 0 20px;}
.w80{width: 80px; float: left;font-weight: bold; margin: 0 0 0 20px;}
.w700{width: 700px; overflow: hidden;}
.cost{float: left; margin: 0 0 0 140px;}
.cost_title{ color: #87695e; font-size: 20px;font-weight: bold; line-height: 40px; }
.schedule ul{ margin: 0 0 0 -40px;list-style:decimal none outside;}
.schedule ul li{display:list-item;text-align:-webkit-match-parent;}
.cost_01{margin: 0 0 0 134px;}
.oh{overflow: hidden;}
/*日历*/
.current{color: #2e94f9}
.price_color{color:#b5b5b6;}
.active{border:1px solid #2e94f9;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.navactive{background-color: #eee}
.fx{position:fixed;left:240px;top:60px;z-index: 100}
.h50{height: 50px}
</style>

