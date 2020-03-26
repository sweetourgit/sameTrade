<template>
  <div class="nav">
  <el-row class="tac">
  <el-col :span="12" class="col">
    <el-menu
      :default-active="this.$route.name"
      class="el-menu-vertical-demo"
      background-color="#0F2350"
      text-color="#B9B9BB"
      active-text-color="#fff"
      :router='isRouter'
      @open='handleOpen'
      ref='menu'
      >
      <el-submenu class="nav_mouseActive" v-for="(item,index) in category" :key="index" :index="String(index)">
        <template slot="title">
          <i class='mouseActive' :id="'d'+index"></i><img :src="('../static/navLeft/'+item.img)" width="15px" alt="">
          <span class="actionName">{{item.name}}</span>
        </template>
        <template v-for="(data,index1) in item.items">
          <el-menu-item class="suboptions" :index="data.value" :route="{path:data.router}"  :key="index1">{{data.value}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
</div>
</template>

<script>
  export default {
  data () {
    return {
        category: [
            {
              name: '同业系统',
              img: 'account.png',
              items: [
                {
                  value: '产品列表',
                  router:'/productList'
                },
                {
                    value: '订单管理',
                    router:'/orderManagement'
                },
                {
                    value: '账户信息',
                    router:'/userList'
                }//,{
                 //   value: '销售统计',
                 //   router:'/salesList'
                //}
              ]
            },
        ],
        isRouter:true,
        menuNumber:[],
        index: ''
    }
  },
  methods: {
    handleOpen(key){
      let aa = Number(key)
      for(let i=0;i<this.category.length;i++){
        this.menuNumber[i] = i
      }
      if(this.menuNumber.indexOf(aa) !== -1){
        for(let i=0;i<this.menuNumber.length;i++){
          if(aa !== this.menuNumber[i]){
            let bb = String(this.menuNumber[i])
            this.$refs.menu.close(bb)
          }
        }
      }
    },
  }
}
</script>
<style scoped>
.suboptions{
  float: left;
  min-width: 0 !important;
  max-width: 200px;
  width: 200px;
  background: #183984 !important
}
.el-menu-vertical-demo{
  height: 100%;
  width: 200px;
  user-select:none;
}
.tac{text-align: left;height:100%;}
.nav{height:100%;}
.col{height:100%;}
.actionName{margin-left: 7px;}
.twoLevel>>>.el-submenu__title{
  background: #183984 !important;
}
.suboptions:hover{
  color: #fff !important;
}
.el-submenu>>>.el-submenu__title:hover{
  color: #fff !important;
}
.nav_mouseActive:hover .mouseActive {
  content:'';
  position:absolute;
  top:0;
  left: 0;
  width:4px;
  height:100%;
  background:#3095FA;
  display:block;
}
</style>

