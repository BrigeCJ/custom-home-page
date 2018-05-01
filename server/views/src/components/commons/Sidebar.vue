<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <ul class="sidebar-menu">
        <li class="sidebar-menu__item" v-for="(item, index) in menus" :key="index" :class="{active: index === sidebarNavIndex}">
          <router-link :to="item.link" class="item-group">
            <i :class="item.icon" class="item-group__icon"></i>
            <span class="item-group__name">{{item.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters({
      sidebarNavIndex: 'getCurrentSidebarNavIndex'
    })
  },
  data () {
    return {
      menus: [
        {
          title: '网站管理',
          link: '/site',
          icon: 'fa fa-link'
        },
        {
          title: '搜索引擎',
          link: '/searchEngine',
          icon: 'fa fa-search'
        },
        {
          title: '壁纸管理',
          link: '/wallpaper',
          icon: 'fa fa-paper-plane-o'
        }
      ]
    }
  }
}
</script>

<style>
  .sidebar {
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 240px;
    height: calc(100% - 60px);
    padding: 10px;
  }
  .sidebar-inner {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .sidebar-menu {
    display: block;
    list-style: none;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .sidebar-menu__item {
    list-style-type: none;
    position: relative;
    display: block;
  }
  .sidebar-menu__item .item-group{
    position: relative;
    display: block;
    padding: 10px 15px;
    margin: 10px;
    border-radius: 3px;
    transition: all 300ms linear;
    color: #a9afbb;;
  }
  .sidebar-menu__item .item-group:hover{
    text-shadow: none;
    color: #6495ED;
    background-color: #fafafa;
  }
  .sidebar-menu__item.active .item-group {
    color: #fff;
    background-color: #6495ED;
    box-shadow: 0 12px 20px -10px rgba(100,149,237, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(100,149,237, 0.2);
  }
  .item-group__icon {
    font-size: 24px;
    float: left;
    margin-right: 15px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    vertical-align: middle;
  }
  .item-group__name {
    line-height: 30px;
    font-size: 14px;
  }
</style>
