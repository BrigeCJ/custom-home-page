<template>
  <div class="home">
    <Header></Header>
    <Sidebar></Sidebar>
    <section class="home-content">
      <div class="home-content__inner">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import Header from '@/components/commons/Header'
import Sidebar from '@/components/commons/Sidebar'
export default {
  name: 'Home',
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      caption: 'This is home page'
    }
  }
}
</script>

<style>
  .home {
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: none;
    background-color: #f6f6f6;
  }
  .home-content {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 240px;
    width: calc(100% - 240px);
    height: calc(100% - 60px);
    padding: 10px;
    padding-left: 0;
  }
  .home-content__inner {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    border: 1px solid #ebebeb;
  }
</style>
