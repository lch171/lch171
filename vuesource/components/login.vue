<template>
<div class="login-container">
    <el-form :model="loginForm" label-position="left" ref="loginForm1"  label-width="0px" :rules="loginRules"
      class="demo-ruleForm login-page">
      <el-form-item prop="username">
        <h3 class="title">欢迎使用本系统</h3>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="off" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" name="password" type="password" auto-complete="off" placeholder="密码"/>
      </el-form-item>
      <el-form-item style="width:100%;margin-top: 20px;">
        <el-button type="primary" style="width:100%;" @click="login" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { HttpInterceptorService } from '@/common/Services/request'
import { Staff } from '@/common/Entity/User/Staff'
import { ResultObject } from '@/common/Entity/ResultObjects'
import { CommonUtil } from '@/common/Utils/Common'
import { Common } from '@/common/Const/common'

// HelloWorld class will be a Vue component
var validateUsername = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('用户名不能为空'))
    // } else if (!isValidUsername(value)) {
    //  callback(new Error('请输入正确的用户名'));
    console.log(value)
  } else {
    callback()
  }
}
var validatePass = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('密码不能为空'))
    // } else if (value.length < 5) {
    //  callback(new Error('密码不能小于5位'));
  } else {
    callback()
  }
}
@Options({
  name: 'login'
})

export default class login extends Vue {
  private loginForm = { username: null, password: null }

  $CommonUtil!: CommonUtil
  $message: any
  $https!: HttpInterceptorService
  public login ():void{
    this.$https.post('/api/Login/GetLoginUserInfo', { username: this.loginForm.username, password: this.loginForm.password }).then((res: any) => {
      this.GetEvaluateInfo(res)
    }).catch(
      (error: any) => {
        console.log(error)
      }
    )
  }

  GetEvaluateInfo (event: any): void {
    if (event.data.Code !== Common.RESULT_SUCCESS) {
      this.$message.error(event.data.Message)
      return
    }
    const res: ResultObject<Staff> = this.$CommonUtil.ResultObjectToEntity(event.data, Staff)
    const varStaff: Staff = JSON.parse(JSON.stringify(res.Result))
    this.$store.commit('setloginstate', varStaff)
    this.$router.push('/mainview/evalualist')
  }
}
</script>

<style scoped>
  .login-container {
    width: 100%;
    height: 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 10px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

/*  label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
  } */
  #wjPwd{
    text-decoration: none;
    color: #409EFF;
  }
  #wjPwd:hover{
    color: orange;
  }
</style>
