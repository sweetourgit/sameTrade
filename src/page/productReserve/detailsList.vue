<template>
  <div class="reserveList">
    <div class="color_d7">ID:{{arr.id}}</div>
    <div class="title">{{arr.title}}</div>
    <div class="mt20">
    <!--左侧轮播图和日历-->
      <div class="picture">
        <!--图片轮播-->
        <el-carousel trigger="click" height="380px">
          <el-carousel-item v-for="(item,index) in bannerList" :key="item">
            <img :src=item style="width:100%;height:380px;">
          </el-carousel-item>
        </el-carousel>
        <div class="w570">
          <ul class="mouth" id="month">
            <li v-for="(item,index) in calendarDate" v-bind:class="{current: currentIndex==index}" class="mouth_date" @click="pickNav('nav',item.Year,item.Month,index)">{{item.Year}}年{{item.Month}}月</li>
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
            <li v-for="(item,index) in arrDay" v-bind:class="{active:chooseDate==currentYear+'-'+currentMonth+'-'+item}">             
              <div class="tc">{{item}}</div>
              <!--判断是否是当前年和月份-->
              <div v-for="date in calendarDate" v-if="date.Year==currentYear||date.Month==currentMonth">
                <!--判断当前日期是否有计划，有则显示-->
                <div v-for="day in date.list" v-bind:class="{price_color:day.surplus==0}" v-if="day.DepartureDate==currentYear+'-'+currentMonth+'-'+item" @click="chooseDateMes(day.DepartureDate,day.surplus,day.ID)">
                  <div>{{day.CKPrice}}</div>
                  <div v-if="day.surplus==0">已售罄</div>
                  <div v-else>余位{{day.surplus}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--右侧基本信息-->
      <div style="float:left;">
        <div class="information">
        <div class="infor_bor">
          <div>
            <div class="infor_title" style="width: 50px">亮点：</div>
            <div v-for="(item,i) in arr.strengths " class="fl">{{item.strength}}&nbsp</div>
          </div>
          <div>
            <div class="infor_title">行程天数：</div>
            <div class="fl">{{arr.night}}晚{{arr.day}}天</div>
          </div>
          <div>
            <div class="infor_title">出游人群：</div>
            <div v-if="this.arr.crowdID == 1" class="fl">亲子&nbsp</div>
            <div v-if="this.arr.crowdID == 2" class="fl">情侣&nbsp</div>
            <div v-if="this.arr.crowdID == 3" class="fl">朋友/同事&nbsp</div>
            <div v-if="this.arr.crowdID == 4" class="fl">父母&nbsp</div>
            <div v-if="this.arr.crowdID == -1" class="fl">无&nbsp</div>
          </div>
          <div>
            <div class="infor_title">主题：</div>

            <div v-if="this.arr.themeID ==1" class="fl">情侣&nbsp</div>
            <div v-if="this.arr.themeID ==2" class="fl">公园/乐园&nbsp</div>
            <div v-if="this.arr.themeID ==3" class="fl">人文/赏景&nbsp</div>
            <div v-if="this.arr.themeID ==4" class="fl">健康旅游&nbsp</div>
            <div v-if="this.arr.themeID ==5" class="fl">古镇游&nbsp</div>
            <div v-if="this.arr.themeID ==6" class="fl">度假村&nbsp</div>
            <div v-if="this.arr.themeID ==7" class="fl">户外&nbsp</div>
            <div v-if="this.arr.themeID ==8" class="fl">海岛游&nbsp</div>
            <div v-if="this.arr.themeID ==9" class="fl">温泉&nbsp</div>
            <div v-if="this.arr.themeID ==10" class="fl">游学&nbsp</div>
            <div v-if="this.arr.themeID ==11" class="fl">滑雪&nbsp</div>
            <div v-if="this.arr.themeID ==12" class="fl">禅修&nbsp</div>
            <div v-if="this.arr.themeID ==13" class="fl">自驾&nbsp</div>
            <div v-if="this.arr.themeID ==14" class="fl">都市游&nbsp</div>
            <div v-if="this.arr.themeID ==15" class="fl">酒店控&nbsp</div>
            <div v-if="this.arr.themeID ==16" class="fl">其他&nbsp</div>
            <div v-if="this.arr.themeID ==-1" class="fl">无&nbsp</div>
          </div>
          <div>
            <div class="infor_title">套餐：</div>
            <div class="block">
              <div class="package_01" v-for="item in packageList">
                <div class="package_01_title">{{item.title}}</div>
                <div class="tc">出发地：{{item.origin}}</div>
                <div class="tc">目的地：{{item.destination}}</div>
              </div>
            </div>
          </div>
          <div style="clear:both;">
            <div class="infor_title">出行日期：</div>
            <div class="fl">2019-05-28</div>
          </div>
          <div>
            <div class="adult">
              <div>成人￥16999.00*{{adult}}</div>
              <div><el-input-number v-model="adult" :min="0" :max="10" label="描述文字" size="mini"></el-input-number></div>
            </div>
            <div class="adult">
              <div>儿童￥16999.00*{{children}}</div>
              <div><el-input-number v-model="children" :min="0" :max="10" label="描述文字" size="mini"></el-input-number></div>
            </div>
            <div class="adult">单房差￥16999.00*2</div>
          </div>
        </div>
        
      </div>
      <div class="price">
          <div class="price_text">总价：32980.00</div>
          <el-button class="price_button" type="primary">预订</el-button>
      </div>
      </div>
    </div>
    <div style="clear:both">
      <div class="survey">产品概况</div>
      <div class="line"></div>
      <div style="width:1050px; height:300px; margin:20px 0 0 20px;background:#f6f6f6;"></div>
    </div>
    <div style="clear:both">
      <div class="survey">行程信息</div>
      <div class="line"></div>
      <div style="margin:0 0 0 94px;">
        <div class="package_02" v-for="item in packageList">
          <div class="package_01_title">{{item.title}}</div>
          <div class="tc">出发地：{{item.origin}}</div>
          <div class="tc">目的地：{{item.destination}}</div>
        </div>
      </div>
      <div class="nav">
        <div class="nav_left">
          <div class="nav_left_01">出行信息</div>
          <div class="nav_left_02">酒店信息</div>
          <div class="nav_left_02">日程信息</div>
        </div>
        <div class="travel">
          <!--出行信息-->
          <div class="travel_bc">
            <div class="nav_right">
              <div>
                <div class="nav_days">第一天</div>
                <div class="fl">
                  <div class="nav_travel">沈阳-上海</div>
                  <div class="airport">
                    <div class="fb">08:15</div>
                    <div class="airport01">沈阳桃仙国际机场</div>
                  </div>
                  <div class="aviation">
                    <div class="aviation_01">港龙航空KA905</div>
                    <div class="aviation_line"></div>
                    <div class="fb">经停：烟台3小时</div>
                  </div>
                  <div class="airport">
                    <div class="fb">10:55</div>
                    <div class="airport01">上海浦东国际机场</div>
                  </div>
                </div>
                <div style="clear:both; padding:30px 0 0 60px;">
                  <div class="nav_travel">沈阳-上海</div>
                  <div class="airport">
                    <div class="fb">08:15</div>
                    <div class="airport01">沈阳桃仙国际机场</div>
                  </div>
                  <div class="aviation">
                    <div class="aviation_01">港龙航空KA905</div>
                    <div class="aviation_line"></div>
                    <div class="fb">经停：烟台3小时</div>
                  </div>
                  <div class="airport">
                    <div class="fb">10:55</div>
                    <div class="airport01">上海浦东国际机场</div>
                  </div>
                </div>
              </div>
              <div style="clear:both; padding:30px 0 0 0;">
                <div class="nav_days">第六天</div>
                <div class="fl">
                  <div class="nav_travel">沈阳-上海</div>
                  <div class="airport">
                    <div class="fb">08:15</div>
                    <div class="airport01">沈阳桃仙国际机场</div>
                  </div>
                  <div class="aviation">
                    <div class="aviation_01">港龙航空KA905</div>
                    <div class="aviation_line"></div>
                    <div class="fb">经停：烟台3小时</div>
                  </div>
                  <div class="airport">
                    <div class="fb">10:55</div>
                    <div class="airport01">上海浦东国际机场</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--酒店信息-->
          <div class="hotel">
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
              <div style="clear:both">酒店周边环境很好，景色优美，非常适合拍照，饮食娱乐也都很方便。酒店员工服务非常的热情，房间宽敞明亮，各种设施齐全，值得推荐！</div>
            </div>
          </div>
          <!--日程信息-->
          <div class="schedule">
            <div>
              <div class="dateDays">1</div>
              <div class="fl lh50">沈阳-昆明</div>
            </div>
            <div class="schedule_hotel">
              <div class="w60">酒店：</div>
              <div class="fl">洲际斐济高尔夫度假村及Spa</div>
            </div>
            <div class="schedule_hotel">
              <div class="food">餐饮：</div>
              <div class="ml60">
                <div>早餐：自理</div>
                <div>午餐：自理</div>
                <div>晚餐：自理</div>
              </div>
            </div>
            <div class="schedule_hotel">
              <div class="food">详情：</div>
              <div class="ml60">位于苏州古城西北，东西红尘中“一二等富贵风流之地”阊门，西至“吴中第一名胜”虎丘，全长约3600米，约合七华里，故称“七里山塘到虎丘”。白居易在《武丘寺路》中写道：“自开山寺路，水陆往来频。银勒牵骄马，花船载丽人。芰荷生欲遍，桃李种仍新。好住湖堤上，长留一道春。”白居易堪称“山塘始祖”。</div>
            </div>
            <div class="schedule_hotel">
              <div class="food">活动：</div>
              <div class="bc_f2">
                <div>
                  <div class="fl ml20"><span class="fb">类型：</span>景点</div>
                  <div class="fl ml20"><span class="fb">城市：</span>昆明</div>
                  <div class="fl ml20"><span class="fb">景点名称：</span>木渎景区</div>
                  <div class="fl ml20"><span class="fb">活动时间：</span>2小时</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">详情说明：</div>
                  <div class="w700">位于苏州城西，太湖之滨，是江南著名古镇。，在木渎内您既可感受到【虹饮山房】内如皇家园林般的恢弘气势、亦可感受到【严家花园】内私家园林的精巧与细致境内风光秀丽，物产丰饶，又恰在天平、灵岩、狮山、七子等吴中名山环抱之中，故有“聚宝盆”之称。</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">景点简介：</div>
                  <div class="w700">清代乾隆南巡六下江南，六次来到木渎，其中有乾隆亲题的御码头，乾隆与他的老师沈德潜吟诗唱和，与他的好友徐士元茶棋相娱，留下了一个个脍炙人口的传说。至今木渎古镇内仍保存完好的明清江南园林随处可见</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">图片：</div>
                  <div class="w700" style="margin:20px 0 20px 0;">
                    <div class="fl"><img style="width:300px; height200px; margin:0 0 0 10px" src="http://192.168.1.186:3009/upload/2019/4/10/6a8255d4-8270-4c25-b0ec-9af74c3be7ca.jpg"></div>
                    <div class="fl"><img style="width:300px; height200px; margin:0 0 0 10px" src="http://192.168.1.186:3009/upload/2019/4/10/6a8255d4-8270-4c25-b0ec-9af74c3be7ca.jpg"></div>
                  </div>
                </div>
              </div>
              <div class="bc_f2">
                <div>
                  <div class="fl ml20"><span class="fb">类型：</span>购物</div>
                  <div class="fl ml20"><span class="fb">名称：</span>昆明土特产</div>
                  <div class="fl ml20"><span class="fb">营业产品：</span>土豆</div>
                  <div class="fl ml20"><span class="fb">活动时间：</span>2小时</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">详情说明：</div>
                  <div class="w700">位于苏州城西，太湖之滨，是江南著名古镇。，在木渎内您既可感受到【虹饮山房】内如皇家园林般的恢弘气势、亦可感受到【严家花园】内私家园林的精巧与细致境内风光秀丽，物产丰饶，又恰在天平、灵岩、狮山、七子等吴中名山环抱之中，故有“聚宝盆”之称。</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">景点简介：</div>
                  <div class="w700">清代乾隆南巡六下江南，六次来到木渎，其中有乾隆亲题的御码头，乾隆与他的老师沈德潜吟诗唱和，与他的好友徐士元茶棋相娱，留下了一个个脍炙人口的传说。至今木渎古镇内仍保存完好的明清江南园林随处可见</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">图片：</div>
                  <div class="w700" style="margin:20px 0 20px 0;">
                    <div class="fl"><img style="width:300px; height200px; margin:0 0 0 10px" src="http://192.168.1.186:3009/upload/2019/4/10/6a8255d4-8270-4c25-b0ec-9af74c3be7ca.jpg"></div>
                    <div class="fl"><img style="width:300px; height200px; margin:0 0 0 10px" src="http://192.168.1.186:3009/upload/2019/4/10/6a8255d4-8270-4c25-b0ec-9af74c3be7ca.jpg"></div>
                  </div>
                </div>
              </div>
              <div class="bc_f2">
                <div>
                  <div class="fl ml20"><span class="fb">类型：</span>自费项目</div>
                  <div class="fl ml20"><span class="fb">名称：</span>昆明方特</div>
                  <div class="fl ml20"><span class="fb">参考价格：</span>100/人</div>
                  <div class="fl ml20"><span class="fb">活动时间：</span>2小时</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">详情说明：</div>
                  <div class="w700">位于苏州城西，太湖之滨，是江南著名古镇。，在木渎内您既可感受到【虹饮山房】内如皇家园林般的恢弘气势、亦可感受到【严家花园】内私家园林的精巧与细致境内风光秀丽，物产丰饶，又恰在天平、灵岩、狮山、七子等吴中名山环抱之中，故有“聚宝盆”之称。</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">景点简介：</div>
                  <div class="w700">清代乾隆南巡六下江南，六次来到木渎，其中有乾隆亲题的御码头，乾隆与他的老师沈德潜吟诗唱和，与他的好友徐士元茶棋相娱，留下了一个个脍炙人口的传说。至今木渎古镇内仍保存完好的明清江南园林随处可见</div>
                </div>
                <div style="clear:both;">
                  <div class="w80">图片：</div>
                  <div class="w700" style="margin:20px 0 20px 0;">
                    <div class="fl"><img style="width:300px; height200px; margin:0 0 0 10px" src="http://192.168.1.186:3009/upload/2019/4/10/6a8255d4-8270-4c25-b0ec-9af74c3be7ca.jpg"></div>
                    <div class="fl"><img style="width:300px; height200px; margin:0 0 0 10px" src="http://192.168.1.186:3009/upload/2019/4/10/6a8255d4-8270-4c25-b0ec-9af74c3be7ca.jpg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--费用说明-->
    <div style="clear:both;">
      <div class="survey">费用说明</div>
      <div class="line"></div>
      <div style="margin:20px 0 0 0;">
        <div class="nav_left">
          <div class="nav_left_01">费用包含</div>
          <div class="nav_left_02">费用不包含</div>
          <div class="nav_left_02">温馨提示</div>
          <div class="nav_left_02">儿童政策</div>
          <div class="nav_left_02">购物场所</div>
          <div class="nav_left_02">自费项目</div>
        </div>
        <div class="cost">
          <div class="schedule">
            <div class="cost_title">#费用包含</div>
            <ul>
              <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
              <li>123</li>
            </ul>
          </div>
          <div class="schedule">
            <div class="cost_title">#费用不包含</div>
            <ul>
              <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
              <li>123</li>
            </ul>
          </div>
          <div class="schedule">
            <div class="cost_title">#温馨提示</div>
            <ul>
              <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
              <li>123</li>
            </ul>
          </div>
          <div class="schedule">
            <div class="cost_title">#儿童政策</div>
            <ul>
              <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
              <li>123</li>
            </ul>
          </div>
          <div class="schedule">
            <div class="cost_title">#购物场所</div>
            <ul>
              <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
              <li>123</li>
            </ul>
          </div>
          <div class="schedule">
            <div class="cost_title">#自费项目</div>
            <ul>
              <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
              <li>123</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--预订须知-->
    <div style="clear:both;">
      <div class="survey">预订须知</div>
      <div class="line"></div>
      <div style="margin:20px 0 0 0;">
        <div class="cost_01 schedule">
          <div class="cost_title">#行前准备</div>
          <ul>
            <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
            <li>123</li>
          </ul>
        </div>
      </div>
    </div>
    <!--使用说明-->
    <div style="clear:both;">
      <div class="survey">使用说明</div>
      <div class="line"></div>
      <div style="margin:20px 0 0 0;">
        <div class="cost_01 schedule">
          <div class="cost_title">#使用说明</div>
          <ul>
            <li>交通：沈阳-上海往返经济舱含税机票（不含您家往返您当地机场的交通费，为了节省您的出行成本，产品展示报价为系统默认预定实时低价航班组合，多为夜航或廉价航空，若您对航班以及时间有特殊要求或指定，请出票前联系客服补差价，团队机票一经开出，不退，不改，不签！行程中披露航班时间仅供参考，以实际出票为准！具体航班信息请参考出团通知书。）； 普通航班含行李托运20KG（部分廉航除外） ，乘坐廉价航空（如春秋，九元，联航等）的旅客，可免费携带一件重量不超过5KG的非托运行李进入客舱，其体积不得超过20×40×55厘米。逾重行李请旅客自行到各机场值机柜台购买，提前到达机场，预留逾重购买行李额的时间。</li>
            <li>123</li>
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
          arr:"",
          tid:1,
          title:"沈阳往返昆明+大理+丽江玉龙雪山冰川大索道6天5晚精品跟团游（洱海吉普车旅拍越野+网红地标打卡+丽水金沙+昆大丽精华景点+泡温泉）",
        bannerList:[],
        mark:'',
        packageList:[{
          title:'精品昆大丽豪华6日游',
          origin:'沈阳',
          destination:'昆明'
        },{
          title:'精品昆大丽豪华6日游',
          origin:'沈阳',
          destination:'昆明'
        },],
        adult: 0,//成人计数器
        children:0,//儿童计数器
        tabPosition:'left',
        //日历
        calendarDate:[{
          Month:'08',
          Year:'2019',
          list:[{
            CKPrice:'8999.00',
            DepartureDate:"2019-08-10",
            ID:1,
            surplus:4
          },{
            CKPrice:'8999.00',
            DepartureDate:"2019-08-18",
            ID:2,
            surplus:4
          },
          {
            CKPrice:'9299.00',
            DepartureDate:"2019-08-22",
            ID:3,
            surplus:0
          }]
        },
        {
          Month:'09',
          Year:'2019',
          list:[{
            CKPrice:'8999.00',
            DepartureDate:"2019-09-18",
            ID:1,
            surplus:4
          },
          {
            CKPrice:'9299.00',
            DepartureDate:"2019-09-22",
            ID:2,
            surplus:0
          }]
        },
        {
          Month:'10',
          Year:'2019',
          list:[{
            CKPrice:'8999.00',
            DepartureDate:"2019-10-18",
            ID:1,
            surplus:4
          }]
        },
        {
          Month:'11',
          Year:'2019',
          list:[{
            CKPrice:'8999.00',
            DepartureDate:"2019-11-18",
            ID:1,
            surplus:4
          }]
        }],
        currentYear: 0, // 当前月的年份
        currentMonth: 0,// 当前月的月份
        arrDay:[], //日历日期
        currentIndex:0,//当前选中月份索引
        chooseDate:0,//选中团期
        ulLeft:0,
      }
    },
    methods:{
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
          if(this.currentIndex<this.calendarDate.length-1){
            this.currentIndex++; 
            this.sider("next");
          }
        }
        //点击导航
        if(type == "nav"){
          this.currentIndex=index;
        }
        this.currentYear=this.calendarDate[this.currentIndex].Year;
        this.currentMonth=this.calendarDate[this.currentIndex].Month;
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
        if(this.calendarDate.length>4){
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
          this.currentYear=this.calendarDate[0].Year;
          this.currentMonth=this.calendarDate[0].Month;
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
      //选择团期
      chooseDateMes(dep,surplus,id){  //dep：计划日期,surplus：选中日期余位，id：团期计划id
         if(surplus!=0){
           this.chooseDate=dep;
           //通过id调用套餐等方法预留
           console.log(id);
         }
      },
        oneInfo(){
          var that = this
            this.$http.post(
                this.GLOBAL.serverSrc + "/team/api/teamget",
                {
                    "id":this.$route.query.id
                },
            )
                .then(function (obj) {

                    that.arr = obj.data.object
                    console.log(that.arr)


                })
                .catch(function (obj) {
                })
        }
    },
    created(){  
      this.initCalendarTbody();
        this.oneInfo()
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
.mouth{list-style-type: none;padding:0;margin-left: 25px;margin-top: 30px;display:flex;width:100%;position: absolute;left:0;}
ul{list-style-type: none;}
.mouth_fl{position: absolute;left:0;top:30px;font-size: 16px;font-weight:bold;}
.mouth_fr{position: absolute;right:0;top:30px;font-size: 16px;font-weight:bold;}

.mouth_date{float: left;width: 130px;text-align: center;flex-shrink:0;}

.week{ width: 570px; height: 30px; line-height: 30px; background: #f6f6f6; overflow: hidden;margin:65px 0 0 -40px;}
.week li{width: 80px; float: left; text-align: center;}
.days{width:570px;margin:10px 0 0 -40px;}
.days li{width: 80px; height: 80px;line-height: 25px; float: left;}
.tc{text-align: center;}
.information{width: 500px; border: 1px solid #e6e6e6;margin: 0 0 0 25px;line-height: 30px; overflow: hidden;}
.infor_bor{width: 470px; margin: 15px 15px 0 15px;}
.infor_title{width: 80px; float: left;}
.package_01{width: 180px; border:1px solid #e6e6e6; float: left; margin: 0 10px 0 0;cursor:pointer;}
.package_01_title{margin: 0 0 0 10px;}
.block{width:390px; overflow:hidden; float:left; margin:10px 0 10px 0;}
.adult{float: left; margin: 0 25px 30px 0;}
.price{border-left: 1px solid #f6f6f6;border-right: 1px solid #f6f6f6;border-bottom: 1px solid #f6f6f6;height: 60px; clear: both; width: 500px;margin: 0 0 0 25px;}
.price_text{margin: 0 0 0 15px; float: left;line-height: 60px; font-weight: bold; color: #000;}
.price_button{float: right;margin: 10px 15px 0 0;}
.survey{padding: 20px 0 0 10px; overflow: hidden;height: 40px; font-size: 16px;}
.line{width: 1080px; text-align: center; height: 1px; background: #e5e5e5; overflow: hidden; margin: 0 0 0 10px;}
.package_02{border:1px solid #e6e6e6; float: left; margin: 20px 20px 0 0;cursor:pointer;padding: 10px;}
.travel{float:left; margin:0 0 0 40px;}
.travel_bc{width:930px; height:465px; background:#f2f2f2; border-radius:5px;overflow: hidden;}
.nav{clear:both; padding:40px 0 0 0;}
.nav_left{line-height:40px; text-align:center; float:left; width: 94px;}
.nav_left_01{ width:94px; border-right:2px solid #87695e;cursor:pointer}
.nav_left_02{ width:94px; border-right:2px solid #d8d8d8;cursor:pointer}
.nav_right{margin:50px 50px 50px 80px;}
.nav_days{float:left; font-weight:bold; font-size:18px; margin:30px 0 0 0; width:60px;}
.fl{float: left;}
.nav_travel{float:left; margin:30px 80px 0 80px;}
.airport{float:left; margin:0 0 0 10px; width:60px; text-align:center; line-height:25px;}
.fb{font-weight: bold;}
.airport01{font-weight:bold; width:60px;}
.aviation{float:left; text-align:center; line-height:25px; width:200px;}
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
.cost{float: left; margin: 0 0 0 40px;}
.cost_title{ color: #87695e; font-size: 20px;font-weight: bold; line-height: 40px; }
.schedule ul{ margin: 0 0 0 -40px;list-style:decimal none outside;}
.schedule ul li{display:list-item;text-align:-webkit-match-parent;}
.cost_01{margin: 0 0 0 134px;}
/*日历*/
.current{color: #2e94f9}
.price_color{color:#b5b5b6;}
.active{border:1px solid #2e94f9;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
      

  
</style>

