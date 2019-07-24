<template>
  <div class="reserveList">
    <div class="color_d7">ID:1234567</div>
    <div class="title">沈阳往返昆明+大理+丽江玉龙雪山冰川大索道6天5晚精品跟团游（洱海吉普车旅拍越野+网红地标打卡+丽水金沙+昆大丽精华景点+泡温泉）</div>
    <div class="mt20">
      <div class="picture">
        <!--图片轮播-->
        <div id="topBanner" style="padding-top: 5px;" class="slide" >
          <div v-for="(imgUrl, index) in bannerList" v-show="index===mark" :key="index" class="slideshow">
                <a>
                  <img :src='imgUrl'>
                </a>
          </div>
          <div class="bar">
                 <span v-for="(item, index) in bannerList" :key="index"></span>
          </div>
      </div>



      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerList:["/static/image/banner01.jpg","/static/image/banner02.jpg","/static/image/banner01.jpg" ],
        mark:'',
      }
    },
    methods:{
      autoPlay () {  
        this.mark++;  
        if (this.mark === 3) { //当遍历到最后一张图片置零  
          this.mark = 0  
        }  
      },  
      play () {  
        setInterval(this.autoPlay, 2500)  
      },  
      change (i) {  
        this.mark = i  
      }  
    },
    created () {  
      this.play()  
    } 
  }



</script>

<style scoped>
.reserveList{ width: 1100px; overflow: hidden; font-size: 14px; margin: 0 0 100px 0;}
.color_d7{color: #ccc;}
.title{font-size: 16px; line-height: 30px; margin: 10px 0 0 0;}
.picture{width: 540px;}
.banner{width: 540px; height: 360px;}
.mt20{margin: 20px 0 0 0;}


.slide {  
    width: 950px;  
    height: 150px;  
    margin: 0 auto;  
    margin-top: 50px;  
    overflow: hidden;  
    position: relative;  
  }  
  .slideshow {  
    width: 95px;  
    height: 150px;  
  }  
  li {  
    position: absolute;  
  }  
  img {  
    width: 95px;  
    height: 150px;  
  }  
  .bar {  
    position: absolute;  
    width: 100%;  
    bottom: 10px;  
    margin: 0 auto;  
    z-index: 10;  
    text-align: center;  
  }  
  .bar span {  
    width: 20px;  
    height: 5px;  
    border: 1px solid;  
    background: white;  
    display: inline-block;  
    margin-right: 10px;  
  }  
  .active {  
    background: #bfd6b6 !important;  
  }  


  
</style>

