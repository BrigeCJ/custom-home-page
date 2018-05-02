<template>
  <header class="header">
    <div class="logo">
      <span>Checkson</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <div class="btn-bell">
          <el-badge :value="3" class="item">
            <el-tooltip effect="dark" :content="'有3条未读消息'" placement="bottom">
              <i class="el-icon-bell"></i>
            </el-tooltip>
          </el-badge>
        </div>
        <div class="user-avator"><img src="../../assets/imgs/avator.jpg"></div>
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link">
            admin <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>关于作者</el-dropdown-item>
            <a href="https://github.com/checkson/custom-home-page" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      caption: 'This is Header page'
    }
  }
}
</script>

<style>
  .header {
    position: relative;
    height: 60px;
    background: rgba(255, 255, 255, 0.9);
    border-top: 3px solid cornflowerblue;
    border-bottom: 1px solid #ebebeb;
  }
  .logo {
    font-weight: 700;
    color: cornflowerblue;
    font-family: "Comic Sans MS", cursive, sans-serif;
    height: 56px;
    line-height: 56px;
    display: inline-block;
    padding: 0 25px;
    text-align: center;
    font-size: 24px;
  }
  .header-right {
    float: right;
    padding-right: 25px;
  }
  .header-user-con {
    display: flex;
    height: 56px;
    align-items: center;
  }
  .btn-bell {
    position: relative;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-bell i:before {
    font-size: 24px;
  }
  .user-name{
    margin-left: 10px;
  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: cornflowerblue;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
