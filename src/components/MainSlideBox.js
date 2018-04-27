import React, { Component } from 'react'
import '../assets/styles/mainSlideBox.css'

import logo from '../assets/imgs/logo.png'

class MainSlideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: 0
    }
  }
  render () {
    // let showIndex = this.state.showIndex;
    return (
      <div className="main-slide-box">
        <div className="slide-title">
          <div className="slide-close"/>
          <ul className="slide-title-box">
            <li className="slide-menu">添加</li>
            <div className="slide-separate"/>
            <li className="slide-menu">我的</li>
            <div className="slide-separate"/>
            <li className="slide-menu">发现</li>
            <div className="slide-separate"/>
            <li className="slide-menu">设置</li>
          </ul>
        </div>
        <div className="main-slide-box-content">
          <div className="add-all">
            <div className="add-all-search">
              <input className="slide-search add-search" type="search" placeholder="搜索网站"/>
              <div className="add-custom-btn"/>
            </div>
            <div className="add-all-inner">
              <ul className="add-nav">
                <li className="add-nav-list">搜索</li>
                <li className="add-nav-list">受欢迎的</li>
                <li className="add-nav-list">用户分享</li>
                <li className="add-nav-list">游戏与娱乐</li>
                <li className="add-nav-list">应用</li>
                <li className="add-nav-list">新闻</li>
                <li className="add-nav-list">音乐与视频</li>
                <li className="add-nav-list">图片</li>
                <li className="add-nav-list">购物与团购</li>
                <li className="add-nav-list">社交与博客</li>
                <li className="add-nav-list">体育与旅行</li>
                <li className="add-nav-list">生活方式</li>
                <li className="add-nav-list">教育与招聘</li>
                <li className="add-nav-list">数码科技</li>
                <li className="add-nav-list">金融</li>
                <li className="add-nav-list">阅读</li>
                <li className="add-nav-list">其他</li>
              </ul>
              <ul className="add-content">
                <li className="add-item">
                  <div className="add-item-content">
                    <div className="add-icon">
                      <div className="add-icon-img" style={{backgroundImage: 'url('+logo+')'}}/>
                    </div>
                    <div className="add-icon-info">
                      <div className="add-icon-name">Chrome 应用</div>
                      <div className="add-icon-desc">暂无描述</div>
                    </div>
                  </div>
                  <div className="add-item-buts">
                    <div className="add-btn-out">
                      <div className="add-item-addbu">
                        <span className="add-btn-added">已添加</span>
                        <span className="add-btn-text">添加</span>
                        <div className="infinity-loading add-text-loading"/>
                      </div>
                    </div>
                    <div className="add-btn-out">
                      <div className="add-item-addbu">
                        <span>打开</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainSlideBox;
