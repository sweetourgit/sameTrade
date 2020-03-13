<template>
  <div class="app">
    <div class="top_handle">
        <span>嘉麒集团</span>
        <span>通行证</span>
    </div>
    <div class="big">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="login-container">
        <span class="forget-title">嘉麒同业系统</span>
        <div class="forget-group">
          <div class="forget-account">用户登录</div>
          <div class="forget-border"></div>
        </div>
        <el-form-item prop="user" class="user-input">
          <el-input  v-model="ruleForm.user" prefix-icon="el-icon-user"  placeholder="用户名" @keyup.enter.native="loginForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password-input">
          <el-input type="password" prefix-icon="el-icon-lock"  v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="loginForm('ruleForm')"></el-input>
        </el-form-item>
        <el-button type="primary" @keydown.enter="loginForm('ruleForm')" class="button" @click="loginForm('ruleForm')">登录</el-button>
      </el-form>
      <div class="foot">
        Copy right @2018 嘉麒集团版权所有 辽ICP备辽B2 - 20150118
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        ruleForm: {
          user: '13022222222',
          password: '123456',
        },
        rules:{
          user:[{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    },
    methods: {
      //登录
      loginForm(formName) {
        this.$refs['ruleForm'].validate(valid => {
          if(valid){
                this.$http.post(this.GLOBAL.serverSrc+'/user/api/silogin',{
                  'userName': this.ruleForm.user,
                  'passWord': this.ruleForm.password,
                }).then(res => {
                  if(!JSON.parse(res.data).access_token){
                    this.$message.error('账号或密码错误');
                    this.ruleForm.password = "";               
                  } else {
                    sessionStorage.setItem('tyToken',JSON.parse(res.data).access_token);
                    this.$http.post(this.GLOBAL.serverSrc+'/indirect/peeruser/api/info').then(res => {
                      sessionStorage.setItem('tyUserInfo',JSON.stringify(res.data));
                      this.$router.push('/productList');
                      this.$message.success('登录成功');
                    }).catch(err => {

                  })
                }
              }).catch(err => {

            })
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .app{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#FFF;
  }
  .top_handle{
    font-size: 22px;
    height: 50px;
    padding-top:30px;
  }
  .top_handle span{
    margin-left:40px
  }
  .big{
    overflow: hidden;
    position: fixed;
    width:100%;
    height:90% !important;
    top: 10%;
    left:0px;
    background-image:url('../../../static/login-img/login.png');
    background-repeat: no-repeat;
    background-size:100% 80%;
  }
  .login-container {
    position: absolute;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    height:450px;
    width: 455px;
    margin: 5.5% 10% 10% 65%;
    background: #fff;
    background-color:rgba(255,255,255,.7);
  }
  .forget-title{
    position: relative;
    top:50px;
    margin: 0 75px;
    text-align: center;
    color: #444;
    font-size:22px;
    font-weight: lighter;
  }
  .forget-group{
    position:relative;
    height:8%;
    margin-top:21%;
    float:left;
    left: 5%;
  }
  .forget-account{
    position:relative;
    left: 25%;
    top:5px;
    color: #008FF4;
    font-size:18px;
  }
  .forget-border{
    position: relative;
    left: 25%;
    top:19px;
    height:3px;
    width:77px;
    background:#008FF4;
  }
  .user-input{
    position:relative;
    margin-top:5%;
    float:left;
    width:100%;
    right: 9%;
  }
  .password-input{
    position:relative;
    float:left;
    width:100%;
    right: 9%;
  }
  .button{
    position: relative;
    float:left;
    left:9%;
    top:3%;
    width:82%;
  }
  .foot{
    position: fixed;
    bottom:0px;
    background: #fff;
    height:18%;
    width:100%;
    text-align: center;
    line-height:80px;
    color: #666;
    font-size:17px;
  }
</style>