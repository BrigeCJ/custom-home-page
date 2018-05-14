<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-panel">
        <div class="panel-body">
          <div class="brand">
            <img class="brand-img" src="../assets/imgs/logo.png" alt="logo">
            <div class="brand-title">欢迎登录</div>
          </div>
          <form class="login-form">
            <div class="form-group">
              <input type="text" name="username" class="form-control" v-model="username" placeholder="账号" required>
            </div>
            <div class="form-group">
              <input type="password" name="password" class="form-control" v-model="password" placeholder="密码" required>
            </div>
            <div class="form-group">
              <input type="button" value="登 录" class="login-btn" @click="login"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .login {
    height: 100%;
  }
  .login-wrapper {
    background-color: cornflowerblue;
    height: 100%;
    overflow-x: hidden;
  }
  .login-panel {
    width: 400px;
    height: 380px;
    border-radius: 5px;
    background-color: #fff;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: auto;
  }
  .panel-body {
    padding: 30px 40px;
  }
  .brand {
    text-align: center;
  }
  .brand-img {
    width: 50px;
    vertical-align: middle;
  }
  .brand-title {
    font-weight: 500;
    font-size: 20px;
    color: #666;
    margin-top: 20px;
  }
  .form-group {
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
  }
  .form-control {
    position: relative;
    display: block;
    width: 100%;
    height: 36px;
    font-size: 14px;
    line-height: 1.57142857;
    border: 0;
    color: #666;
    outline: none;
    box-shadow: 0 1px 0 #dcdcdc;
    background-color: transparent;
    transition: box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    box-shadow: 0 2px 0 #6495ED;
  }
  .login-btn {
    margin-top: 20px;
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 4px;
    background-color: cornflowerblue;
    color: #fff;
    border: 1px solid #6495ed;
    outline: none;
    box-shadow: none;
    cursor: pointer;
  }
  .login-btn:hover {
    background-color: #8bb1f6;
    border-color: #8bb1f6
  }
</style>
