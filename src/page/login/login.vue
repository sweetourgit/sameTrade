<template>
  <div class="app">
    <div class="top_handle">
      <div class="top_left">
        <span>嘉麒集团</span>
        <span style="margin-left: 40px;">通行证</span>
      </div>
      <div class="top_right">
        <span>已有账号,</span>
        <span style="margin-left: 5px;color: #429EF7;cursor:pointer;" @click="login">马上登录</span>
        <span style="margin-left: 20px;">|</span>
        <span style="margin-left: 20px;color: #429EF7;cursor:pointer;">返回首页</span>
      </div>
    </div>

    <div class="big" v-show="isRetrieve">
      <!-- <div class="title">嘉麒集团应用管理中心系统</div> -->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm login-container" v-show="show">
        <span class="forget-title">嘉麒同业系统</span>
        <div class="forget-group">
          <div class="forget-account">登录账号</div>
          <div class="forget-border"></div>
        </div>

        <el-button type="text" class="form-forget" @click="forget">忘记密码 ? </el-button>

        <el-form-item prop="user" class="user-input">
          <!-- <div><img src="../../../static/login/user.png" class="img" style="width:35px;"></div> -->
          <el-input  v-model="ruleForm.user" prefix-icon="el-icon-user"  placeholder="用户名" @keyup.enter.native="loginForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="password-input">
          <el-input type="password" prefix-icon="el-icon-lock"  v-model="ruleForm.password" placeholder="密码" @keyup.enter.native="loginForm('ruleForm')"></el-input>
        </el-form-item>

<!-- 
        <div class="verify-box">
          <el-form-item class="verification-input">
            <el-input id="er"  v-model="ruleForm.verification" placeholder="验证码" @focus="aaa()" @keyup.enter.native="loginForm('ruleForm')"></el-input>
            <div  class="pop" v-show="pop">验证码输入错误</div>
            <div  class="pop" v-show="pop1">验证码为空</div>
          </el-form-item>


          <template v-if="yz">
            <img :src="yz1" alt="" class="verify-img" @click="aaa('show')">
          </template>
        </div> -->
        <!-- 验证码 -->


        <el-button type="primary" @keydown.enter="loginForm('ruleForm')" class="button" @click="loginForm('ruleForm')">登录</el-button>

        <el-checkbox class="remember" >记住密码</el-checkbox>
      </el-form>


      <!-- 忘记密码之手机验证 -->
      <el-form ref="phoneruleForm" :model="phoneruleForm" :rules="phonerules" label-width="80px" class="demo-ruleForm login-forget"   v-show="phoneShow">
        <span class="forget-title">嘉麒同业系统</span>
        <!-- 找回密码 -->
        <div class="forget-group">
          <div class="forget-account">找回密码</div>
          <!-- <div class="forget-border"></div> -->
        </div>
        <div class="font_text">
          <span>已有账号,</span>
          <span style="margin-left: 5px;color: #429EF7;cursor:pointer;" @click="login">马上登录</span>
        </div>
        <!-- 立刻登录 -->
        <!-- <el-button type="text" class="form-forget" @click="login">立刻登录</el-button> -->

        <div class="input-with-select">
          <el-form-item prop="phone" class="phone-input">
            <el-input  v-model="phoneruleForm.phone" prefix-icon="el-icon-user"  placeholder="手机号/邮箱"></el-input>
          </el-form-item>
          <!-- <el-button type="primary" @click="send" v-if="!sendMsgDisabled" class="phone-button" ><span style="margin-right:0px">获取验证码</span></el-button>
            <el-button type="primary" plain disabled @click="send" v-if="sendMsgDisabled" class="phone-button">{{time}}S后获取</el-button> -->
        </div>

        <el-form-item class="phone-button">
          <el-button type="primary" class="next-button-phone" @click="submitForm('emailruleForm')" >下一步</el-button>
        </el-form-item>


        <!-- 手机验证码 -->
        <!-- <div>
          <el-form-item prop="phoneVerification" class="phone-verify">
            <el-input  placeholder="请输入手机验证码" v-model="phoneruleForm.phoneVerification"   >
              <el-button slot="append" @click="send" v-if="!sendMsgDisabled" class="phone-button" ><span style="margin-right:0px">获取验证码</span></el-button>
              <el-button slot="append" plain disabled @click="send" v-if="sendMsgDisabled" class="phone-button">{{time}}S后获取</el-button>

            </el-input>
          </el-form-item>
          <el-form-item class="verify-buttom">
            <el-button type="primary" class="next-button-phone" @click="phoneSubmitForm('phoneruleForm')" >下一步</el-button>
          </el-form-item>
        </div> -->
      </el-form>


      
      <!-- 忘记密码之邮箱验证 -->
      <el-form ref="emailruleForm" :model="emailruleForm" :rules="emailrules" label-width="80px" class="demo-ruleForm login-forget" v-show="emailShow" >
        <span class="forget-title">嘉麒同业系统</span>
        <div class="forget-group">
          <div class="forget-account">找回密码</div>
          <div class="forget-border"></div>
        </div>
        <el-button type="text" class="form-forget" @click="login">立刻登录</el-button>

        <div class="input-with-email" >
          <el-form-item prop="email">
            <el-input placeholder="请输入邮箱号码" v-model="emailruleForm.email"  >
              <el-select v-model="select" slot="prepend" placeholder="邮箱号" style="width:80px"  @change="haha">
                <el-option label="手机号" value="0"></el-option>
                <el-option label="邮箱" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item class="email-buttom">
          <el-button type="primary" class="next-button-email" @click="submitForm('emailruleForm')" >下一步</el-button>
        </el-form-item>
      </el-form>





      <!-- 忘记密码找回 -->
      <el-form ref="passwordruleForm" :model="passwordruleForm" :rules="newpasswordrules" label-width="80px" class="demo-ruleForm login-forget" v-show="newpasswordShow" >
        <span class="forget-title">嘉麒同业系统</span>
        <div class="forget-group">
          <div class="forget-account">找回密码</div>
          <div class="forget-border"></div>
        </div>
        <el-button type="text" class="form-forget" @click="login" >立刻登录</el-button>

        <div>
          <el-form-item prop="newpassword" class="input-with-newpassword">
            <el-input type="password" placeholder="请输入新密码" v-model="passwordruleForm.newpassword"  ></el-input>
          </el-form-item>
          <el-form-item prop="repassword" class="input-with-repassword">
            <el-input type="password" placeholder="请再次输入密码" v-model="passwordruleForm.repassword"  >
            </el-input>
          </el-form-item>
        </div>
        <el-form-item class="newbuttom">
          <el-button type="primary" class="next-button-email" @click="newSubmitForm('passwordruleForm')" >下一步</el-button>
        </el-form-item>
      </el-form>




      <div class="foot">
        Copy right @2018 嘉麒集团版权所有 辽ICP备辽B2 - 20150118
      </div>
    </div>

    <!-- 找回密码页面 -->
    <div class="retrievePass" v-show="!isRetrieve">

      <!-- 找回密码 -->
      <div v-show="isView">
        <div class="passView">
          <div class="passHand">
            <div class="passTop">账号安全</div>
          </div>
          <div class="passBody">找回密码</div>
          <div style="margin-top: 40px;">
            <el-form ref="passForm" :model="passForm" label-width="270px">

              <el-form-item>
                <el-input class="passInput" v-model="passForm.account" placeholder="手机号/邮箱"></el-input>
              </el-form-item>

              
              <el-form-item>
                <el-button class="passButton" type="primary" @click="onSubmit">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 找回密码END -->

      <!-- 找回密码手机 -->
      <div v-show="isView">
        <div class="passView">
          <div class="passHand">
            <div class="passTop">账号安全</div>
          </div>
          <div class="passBody">找回密码</div>
          <div style="margin-top: 40px;">
            <el-form ref="passForm" :model="passForm" label-width="270px">

              <el-form-item>
                <el-input class="passInput" v-model="passForm.account" placeholder="手机号/邮箱"></el-input>
              </el-form-item>

              <el-form-item>
                <el-input style="width: 200px" v-model="passForm.account" placeholder="验证码"></el-input>
                <el-button style="width: 110px;margin-left: 20px;" type="primary">发送验证码</el-button>
              </el-form-item>
              
              <el-form-item>
                <el-button class="passButton" type="primary" @click="onSubmit">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 找回密码手机END -->

      <!-- 修改密码 -->
      <div v-show="isView">
        <div class="passView">
          <div class="passHand">
            <div class="passTop">账号安全</div>
          </div>
          <div class="passBody">修改密码</div>
          <div style="margin-top: 40px;" v-show="isView">
            <el-form ref="passForm" :model="passForm" label-width="270px">

              <el-form-item>
                <el-input class="passInput" v-model="passForm.account" placeholder="设置密码"></el-input>
              </el-form-item>

              <el-form-item>
                <el-input class="passInput" v-model="passForm.account" placeholder="确认密码"></el-input>
              </el-form-item>

              
              <el-form-item>
                <el-button class="passButton" type="primary" @click="onSubmit">下一步</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div style="margin-top: 90px;text-align: center;">
            <div>您已成功设置密码,请试用新密码登录</div>
            <el-button style="margin-top: 40px;" class="passButton" type="primary" @click="onSubmit">马上登录</el-button>
          </div>
        </div>
      </div>
      <!-- 修改密码END -->

      <!-- 邮箱提示 -->
      <div>
        <div class="passView">
          <div class="passHand">
            <div class="passTop">账号安全</div>
          </div>
          <div class="passBody">找回密码</div>

          <div style="width: 390px;margin: 50px 0 0 270px;line-height: 30px;">
            <div>我们已像您的注册邮箱 <span>84*****420@qq.com</span> 发送了一封密码找回邮件 请您注意 <span style="color: red;">接收文件</span></div>
            <el-button style="margin-top: 40px;" class="passButton" type="primary" @click="onSubmit">去邮箱接收文件</el-button>
            <div style="font-size: 13px;color: #A9A9A9;margin-top: 10px;">请注意查收邮件,并按照邮件中的提示操作,完成安全认证。</div>
            <div style="float: left; font-size: 13px;color: #A9A9A9;margin-top: -10px;">没有收到?</div>
            <div style="float: left; font-size: 13px;color: red; margin: -10px 0 0 10px;">重新发送</div>
          </div>
        </div>
      </div>
      <!-- 邮箱提示END -->

      
      <div class="passFoot">
          Copy right @2018 嘉麒集团版权所有 辽ICP备辽B2 - 20150118
      </div>
    </div>



  </div>
</template>

<script>

  var store = {
    save(key,value) {
      window.localStorage.setItem(key,value)
    },
    fetch(key) {
      return JSON.parse(sessionStorages.getItem(key)) || []
    }
  }
  import axios from 'axios'
  export default {
    data(){
      // 判断验证码
      var checkAge = (rule, value, callback) => {
        if (!value) {
          document.getElementById("er").style ='border-color: #f56c6c;'
          this.pop=false;
          return callback(new Error('验证码不能为空'));



        }

      };
      // 判断修改密码
      var validatepass = (rule, value, callback) => {
        if (this.passwordruleForm.newpassword === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.passwordruleForm.newpassword !== this.passwordruleForm.repassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isRetrieve: false, // 找回密码页面
        isView: false,
        show: true,
        phoneShow: false,
        verifyShow: true,
        emailShow:false,
        newpasswordShow:false,
        pop:false,
        pop1: false,
        passForm: {
          account: ''
        },
        // input5: '',
        // input:'',
        select: '0',
        value: '',
        ruleForm: {
          user: '15642947778',
          password: '123456789',
          // verification: '',



        },
        //  手机验证
        phoneruleForm: {
          // email: '',
          phone: '',
          phoneVerification: '',

        },
        // 邮箱验证
        emailruleForm: {
          email: '',
        },
        // //  新密码和重复密码
        passwordruleForm:{
          newpassword:'',
          repassword:'',
        },
        // 邮箱和手机
        phonerules:{
          phone: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            // { pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: "手机格式错误!"}
          ],
          // phoneVerification: [
          //   { required: true, message: '请输入手机验证码', trigger: 'blur' },
          //   { min: 6, max: 6, message: '请输入六位手机验证码', trigger: 'blur' }
          // ],

        },
        //  邮箱验证
        emailrules:{
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "邮箱格式错误!"}
          ],
        },
        //  修改密码验证
        newpasswordrules:{
          newpassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9]{6,10}$/, message: "密码格式错误(6-20位数字与字母)"}
          ],
          repassword:[
            { validator: validatepass, }
          ]
        },
        rules: {
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          // verification: [
          //   { validator: checkAge, trigger: 'blur' }

          // ],




        },
        //登录首页验证码
        checkCode: "",
        // picLyanzhengma: "",

        //  邮箱找回JS
        emailTableVisible: false,
        emailFormVisible: false,

        //  手机号码找回JS
        phoneTableVisible: false,
        phoneFormVisible: false,

        // 设置新密码
        newpasswordTableVisible: false,
        newpasswordFormVisible: false,

        // 发送验证码倒计时
        time: 60,
        sendMsgDisabled: false,
        show:true,

        yz: false,
        yz1: '',
        logClick: true,
        logClick1: false,
      };
    },


    methods: {
      haha:function(a){
        if(a == '0'){
          this.emailShow = false
          this.phoneShow = true
          this.newpasswordShow = false
        } else if(a == '1'){
          this.phoneShow = false
          this.emailShow = true
          this.newpasswordShow = false
        }
      },
      forget(){
        this.select = '0'
        this.show = false;
        this.phoneShow = true;
        this.phoneruleForm.phone = ''
        this.phoneruleForm.phoneVerification = ''
        this.emailruleForm.email = ''
        this.passwordruleForm.newpassword = '';
        this.passwordruleForm.repassword = '';
        this.emailShow = false;
        // this.time = 60;
        // this.time = 0;
        // console.log(this.show)

        // console.log(this.show)
        // console.log(this.phoneShow)
      },
      //  邮箱验证验证
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$message.success('验证信息已经发送到您的邮箱,请通过验证邮件修改密码!');
            this.$alert('验证信息已经发送到您的邮箱,请通过验证邮件修改密码!', {
              confirmButtonText: '确定',
            });
            this.emailruleForm.email = ''
            this.emailShow = false;
            this.newpasswordShow = true;
            this.passwordruleForm.newpassword = '';
            this.passwordruleForm.repassword = '';
          } else {
            this.$message.error('验证失败');
            this.emailruleForm.email = ''
            return false;
          }
        });
      },
      // 手机验证
      phoneSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success('验证成功!');
            this.phoneruleForm.phone = ''
            this.phoneruleForm.phoneVerification = ''
            this.phoneShow = false;
            this.newpasswordShow = true;
          } else {
            // this.$message.error('验证失败');
            this.phoneruleForm.phone = ''
            this.phoneruleForm.phoneVerification = ''
            return false;
          }
        });
      },
      // 修改新密码验证
      newSubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success('密码设置成功!');
            // this.phoneShow = false;
            this.newpasswordShow = false;
            this.show = true;
            this.phoneShow = false;
            this.passwordruleForm.newpassword = '';
            this.passwordruleForm.repassword = '';
          } else {
            console.log('验证失败');
            return false;
          }
        });
      },

      //登录
      loginForm(formName) {
        
        this.$refs['ruleForm'].validate(valid => {
          if(valid){
            this.pop1=false
           
            // 把这些注释解开验证码就可以重新用

            // this.$http.post(this.GLOBAL.serverSrc+'/code/api/check ',this.qs.stringify({
            //   "key": localStorage.getItem('code'),
            //   // "code": this.ruleForm.verification
            // })).then(res => {

              // if(res.data){

                this.$http.post(this.GLOBAL.serverSrc+'/user/api/silogin',{
                  'userName': this.ruleForm.user,
                  'passWord': this.ruleForm.password,
                }).then(res => {
                  if(res.data == ''){
                    this.$message.error('账号或密码错误');
                    console.log("出错了")
                    this.ruleForm.password = "";
                    this.ruleForm.verification = "";
                      // this.$http.post(this.GLOBAL.serverSrc+'/code/api/getguid',{

                      // }).then(res => {
                      //   localStorage.setItem("code",res.data)
                      //   this.bbb()
                      // }).catch(err => {

                      // })
                    
                          console.log(localStorage.getItem('token'));
                    
                  } else {
                    store.save('token',res.data)
                    //localStorage.setItem('token',JSON.parse(res.data).access_token)
                    this.$http.post(this.GLOBAL.serverSrc+'/universal/localcomp/api/Login',{
                        "phone": this.ruleForm.user,
                        "passWord": this.ruleForm.password
                    },{
                      headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                      }

                    }).then(res => {
                        console.log(res)
                      sessionStorage.setItem('aid',res.data.object.localCompID)
                      sessionStorage.setItem('id',res.data.object.id)
                      sessionStorage.setItem('type',res.data.object.peerUserType)
                      sessionStorage.setItem('account',this.ruleForm.user)
                      this.$router.push('/productList')
                      this.$message.success('登录成功');
                    }).catch(err => {

                    })
                  }
                }).catch(err => {

                })

              //这两段代码千万别删除 

              // } else {
              //   document.getElementById("er").style ='border-color: #f56c6c;'
              //   setTimeout(() => {
              //     this.pop=true;
              //   },90)
              //   this.aaa('show');
              // }

            // }).catch(err => {
            //     document.getElementById("er").style ='border-color: #f56c6c;'
            //     setTimeout(() => {
            //       this.pop=true;
            //     },90)
            //     this.aaa('show');
            // })

          } else {
            if(this.ruleForm.verification == ''){
                document.getElementById("er").style ='border-color: #f56c6c;'
                setTimeout(() => {

                  this.pop1=true;

                },90)
 
            }
            

          }
        })
        
      },



      //手机验证码倒计时
      send() {
        if(this.phoneruleForm.phone === ''){
          this.$message.error('手机号为空！')
        } else {
          var str = this.phoneruleForm.phone
          var patt = /^[1][3,4,5,7,8][0-9]{9}$/
          if(str.match(patt)){
            let me = this;
            me.sendMsgDisabled = true;
            // this.$message.success("验证码已经发送到您的手机,请您注意接收,防止泄露.")
            this.$alert('验证码已经发送到您的手机,请您注意接收,防止泄露.', {
              confirmButtonText: '确定',

            });
            let interval = window.setInterval(function() {
              if ((me.time--) <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          } else {
            this.$message.error('请填写正确的手机号！')
          }
        }
      },
      // 立刻登录
      login() {
        this.show = true;
        this.emailShow = false;
        this.newpasswordShow = false;
        this.phoneShow = false;
        this.isRetrieve = true;
      },
      aaa(show){
        if(this.logClick || show == 'show'){
          this.$http.post(this.GLOBAL.serverSrc+'/code/api/getguid',{

          }).then(res => {
            localStorage.setItem("code",res.data)
            this.bbb()
          }).catch(err => {

          })
        }

      },
      bbb(){
        this.$http.post(this.GLOBAL.serverSrc+'/code/api/getcode',this.qs.stringify({
          "key": localStorage.getItem('code'),
        })).then(res => {
          this.yz = true;
          this.yz1 = 'data:image/png;base64,' + res.data
          this.logClick = false
        }).catch(err => {

        })
      },

      onSubmit() {

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
  .top_handle {
    height: 5%;
  }
  .top_left {
    float: left;
    position: absolute;
    top: 4%;
    padding-left:5% !important;
    font-size: 20px;
  }
  .top_right {
    float: right;
    position: absolute;
    top: 4%;
    right: 15%;
    padding-left:5% !important;
    font-size: 15px;
  }

  .top{
    // position: fixed;
    // top:0px;
    height: 5%;
    margin-bottom:50px;
  }
  .top-titleone{
    position:fixed;
    top:4%;
    padding-left:5% !important;
    line-height: 5%;
    font-size: 22px;
    color:#666;
  }
  .top-titletwo{
    top:4%;
    position:fixed;
    padding-left:13% !important;
    line-height:5%;
    font-size: 22px;
    color:#666;
  }
  .top-account {
    margin: 35px 200px 0 0;
    // line-height:5%;
  }

  .big{
    overflow: hidden;
    position: fixed;
    width:100%;
    height:90% !important;
    top: 10%;
    right: 20px;
    left:0px;
    // background:green;
    background-image:url('../../../static/login-img/login.png');
    // background-repeat: no-repeat
    background-size:100% 80%;

  }

  .title{
    text-align: center;
    padding-top:5%;
    color: #fff;
    font-size: 30px;
    margin-bottom:5%;
  }
  .form-title {
    position: relative;
    //  top:5%;
    margin: 0 auto;
    text-align: center;
    color: #444;
    font-size:24px;
  }
  .login-container {
    position: absolute;
    -webkit-border-radius: 5px;
    border-radius: 6px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    // margin: 0 auto;

    float: right;
    height:500px;
    width: 455px;
    margin: 5% 10% 10% 65%;
    background: #fff;
    // border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;
    background-color:rgba(255,255,255,.7);
    // display:true;

  }
  .login-forget{
    position: absolute;
    -webkit-border-radius: 5px;
    border-radius: 6px;
    -moz-border-radius: 5px;
    background-clip: padding-box;

    // margin: 0 auto;
    float: right;
    height:380px;
    width: 455px;
    margin: 5% 10% 10% 65%;
    background: #fff;
    // border: 1px solid #eaeaea;
    // box-shadow: 0 0 25px #cac6c6;
    background-color:rgba(255,255,255,.7);

  }
  .login-group{
    position:absolute;
    height:20%;
    float:left;
    // top:10%;
    left: 3%;
    // margin-bottom:10%;
  }
  .login-account{
    position:relative;
    left: 30%;
    top:22%;
    color: #008FF4;
    font-size:20px;
    // border-bottom: #008FF4 solid 3px;
  }
  .login-border{
    position: relative;
    // float:left;
    left: 30%;
    top:45%;
    height:3px;
    width:85px;
    background:#008FF4;
  }
  .find-pass{
    position:relative;
    width:20%;
    top:17%;
    left:9%;
    color: #008FF4;
    font-size:20px;
    // border-bottom: #008FF4 solid 3px;
  }

  .form-forget{
    position:relative;
    float: right;
    margin-top:19.3%;
    right:10%;
    color: #888;
    font-size:18px;
    border-bottom: #888 solid 3px;
  }
  .font_text {
    float: right;
    font-size: 15px;
    margin: 120px 50px 0 0;
  }
  .input-with-select{
    position: relative;
    top: 35px;
    right: 35px;
    width:445px;
  }

  .input-with-email{
    position: relative;
    margin-top:25%;
    right:9%;
  }

  .user-input{
    position:relative;
    margin-top:5%;
    float:left;
    width:100%;
    right: 8%;
  }
  .password-input{
    position:relative;
    float:left;
    width:100%;

    right: 8%;
  }
  .verification-input{
    position:relative;
    float:left;
    width:70%;
    right:10% !important;
    // width:55% !important;
    // left:-10%;
  }
  // 登录页验证码按钮
  .verification-button{
    text-align:center;
    position: relative;
    float: right;
    right:10% !important;
    right:60px;
    height:41px;
    width:100px;

  }
  .button{
    position: relative;
    float: left;
    width:80%;

    // left: 2%;
    margin:5% 10%;
    // margin:0 auto;
  }
  // 手机找回页面的下一步按钮
  .next-button-phone{
    position:relative;
    margin-top:45px;
    float:left;
    width:365px;
    right: 35px;
  }
  .next-button-email{
    position: relative;
    //  这个地方写的有问题
    width:70%;
    // right: 25%;
    // margin-bottom:10%;
    top:50px;
  }
  .remember {
    // position: relative;
    float:left;
    // margin-top:5%;
    // top: 50%;
    // left: 10%;
    margin-left:10%;
    color: #008FF4;
  }
  .verify-img{
    width:27%;
    height:40px;
    position:relative;
    float:right;
    right:10%;
    bottom:0px;
  }
  .iconfont{
    position: relative;
    font-size: 30px;
    right: 10px;
  }
  .forget{
    position:relative;
    float:right;

    right:37px;
    top:8px;
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
  .login-button{
    text-align:center;
  }

  .foot{
    position: fixed;
    bottom:0px;
    background: #fff;
    height:18%;
    width:100%;
    text-align: center;
    line-height:140px;
    color: #666;
    font-size:15px;
  }
  .passFoot {
    position: fixed;
    bottom:0px;
    height:20%;
    width:100%;
    text-align: center;
    // line-height:140px;
    // color: #666;
    font-size:15px;
  }

  .phone{
    width:65%;margin:0 auto;
  }
  .phone-input{
    position:relative;
    float:left;
    width:100%;
  }

  // 手机找回页面的验证码输入框
  .phone-verification-input{
    width:300px;
    right:103px;
    margin-left:30px;

  }
  .phone-button{
    position:relative;
    margin-top:5%;
    float:left;
    width:100%;
  }
  .email{
    width:50%;
    margin:0 auto;
  }
  .newpassword-input{
    width:300px;
    right:83px;
  }
  .repassword-input{
    width:300px;
    right:83px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  // 手机验证码输入框
  .input-verify{
    position:relative;
    width:50%;
    margin-top:10%;
    margin-left:4%;
    right:10px;
  }
  .phone-verify{
    position: relative;
    float:left;
    width:85%;
    top:0px;
    // right:46px;
    // margin-top:20%;
    right:5%;
  }
  .verify-buttom{
    position:relative;
    top:85px;
    width:50%;
  }
  .input-with-newpassword{
    // position: absolute;
    margin-top:90px;
    width:80%;

  }
  .input-with-repassword{
    // position: absolute;
    margin-top:20px;
    width:80%;

  }
  .newbuttom{
    // position: relative;
    margin-top:-10%;
    width:80%;
  }
  .forget-group{
    position:relative;
    height:8%;
    margin-top:21%;
    float:left;
    // top:15%;
    left: 5%;
    // margin-bottom:10%;
  }
  .input-phone{
    position: relative;
    float: left;
    top: 20%;
  }

  .forget-account{
    position:relative;
    // float:left;
    // width:25%;
    left: 30%;
    top:5px;
    color: #008FF4;
    font-size:18px;
  }
  .forget-border{
    position: relative;
    // float:left;
    left: 30%;
    top:19px;
    height:3px;
    width:77px;
    background:#008FF4;
  }
  .email-buttom{
    position:relative;
    right:10%;
  }
  .pop{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .retrievePass {
    margin-top: 50px;
    height: 100%;
    background: #F4F4F4;
  }
  .passView {
    width: 900px;
    height: 390px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    background: #fff;
  }
  .passHand {
    height: 40px;
    border-radius: 6px 6px 0 0;
    background: #008CF6;
  }
  .passTop {
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 18px;
  }
  .passBody {
    text-align: center;
    margin-top: 78px;
    font-size: 18px;
  }
  .passInput {
    width: 335px;
  }
  .passButton {
    width: 335px;
  }
</style>
