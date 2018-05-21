import React, { Component } from 'react'
import Home from './components/Home'
import MainSlideBox from './components/MainSlideBox'
import SearchSlideBox from './components/SearchSlideBox'
import './assets/styles/app.css'

import axios from 'axios';
import windmill from './assets/imgs/windmill.png'

import { connect } from 'react-redux'
import { toggleMainSlideBox, toggleSearchSlideBox, toggleSuggestions, toggleSetting, togglePopupMenu, setAllSearchEngines, setCurrentSearchEngine, setCurrentBg, setCurrentSites, setCurrentSetting } from "./store/actions"
import { CustomSetting, showMessage } from './assets/utils/utils'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windmillClassName: '',
      contextMenu: {
        top: 0,
        left: 0
      },
      firstVisitedMainSlideBox: true
    };
    this.changeWrapper = this.changeWrapper.bind(this);
    this.initSetting = this.initSetting.bind(this);
  }
  changeWrapper () {
    this.setState({
      windmillClassName: 'rotate'
    });
    showMessage('正在搜寻随机壁纸...', 0);
    axios.get('/api/wallpapers/get/random').then((res) => {
      showMessage('随机壁纸切换成功', 3000);
      setTimeout(() => {
        let data = res.data;
        if (data.status === 200 && data.message === 'ok') {
          this.props.setCurrentBg({
            type: 'image',
            src: data.data.row[0].src,
            color: 'transparent'
          });
        } else {
          console.error(data.message)
        }
        this.setState({
          windmillClassName: ''
        });
      }, 900)
    }).catch((err) => {
      this.setState({
        windmillClassName: ''
      });
      showMessage('切换随机壁纸失败！', 3000);
      console.error(err);
    })
  }
  initSetting () {
    let status = CustomSetting.getStatus();
    // 设置默认缓存
    if (!status || status.isFirstLogin) {
      CustomSetting.setStatus(false);
      CustomSetting.setDefaultSearchEngine();
      CustomSetting.setAllEngines([]);
      CustomSetting.setCurrentEngine(CustomSetting.getDefaultSearchEngine());
      CustomSetting.setCustomEngines([]);
      CustomSetting.setDefaultSites();
      CustomSetting.setDefaultBg();
      CustomSetting.setDefaultSetting();
    }
    // 设置应用状态
    this.props.setAllSearchEngines(CustomSetting.getAllEngines());
    this.props.setCurrentSearchEngine(CustomSetting.getCurrentEngine());
    this.props.setCurrentBg(CustomSetting.getBg());
    this.props.setCurrentSites(CustomSetting.getSites());
    this.props.setCurrentSetting(CustomSetting.getSetting());
  }
  initEventBundle () {
    document.addEventListener('click', () => {
      this.props.toggleSuggestions(false);
      this.props.toggleSetting(false);
      this.props.togglePopupMenu(false);
    });
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      // 判断元素是否显示
      let isShow = this.props.showPopupMenu;
      if (isShow) {
        this.props.togglePopupMenu(false);
        return false;
      }
      // 获取隐藏元素的宽高
      let contextMenu = this.refs.contextMenu;
      let cloneDOM = contextMenu.cloneNode(true);
      cloneDOM.style.display = 'block';
      cloneDOM.style.top = '-1000px';
      contextMenu.parentNode.appendChild(cloneDOM);
      let ow = cloneDOM.offsetWidth;
      let oh = cloneDOM.offsetHeight;
      contextMenu.parentNode.removeChild(cloneDOM);
      // 获取文档宽高信息
      let dw = document.body.clientWidth || document.documentElement.clientWidth;
      let dh = document.body.clientHeight || document.documentElement.clientHeight;
      let ww = window.screen.availWidth;
      let wh = window.screen.availHeight;
      let w = dw < ww ? dw : ww;
      let h = dh < wh ? dh : wh;
      // 获取鼠标点击位置信息
      let x = e.clientX;
      let y = e.clientY;
      // 计算出现的位置
      let l = (w - x) > ow ? x : x - ow;
      let t = (h - y) > oh ? y : y - oh;
      this.setState({
        contextMenu: {
          top: t,
          left: l
        }
      });
      this.props.togglePopupMenu(true)
    })
  }
  init () {
    this.initSetting();
    this.initEventBundle();
  }
  componentDidMount () {
    this.init();
  }
  render () {
    let { showAppCover, showPopupMenu, showSearcherCover, currentBg, setting, toggleMainSlideBox, toggleSearchSlideBox, toggleSetting, togglePopupMenu, firstVisitedSearchSlideBox } = this.props;
    let windmillClassName = this.state.windmillClassName;
    let contextMenu = this.state.contextMenu;
    let firstVisitedMainSlideBox = this.state.firstVisitedMainSlideBox;
    let rightSlideZoom = setting.rightSlideZoom || 100;
    return (
      <div className="app">
        <div className="app-bg" style={{backgroundImage: 'url(' + currentBg.src + ')'}}/>
        <div className="app-bg-cover" style={{backgroundColor: 'rgba(0, 0, 0, '+(setting.bgOpacity / 100).toFixed(2)+')'}}/>
        <div className="app-home">
          <div className="app-home-container" style={{zoom: (setting.mainZoom / 100).toFixed(2)}}>
            <Home />
          </div>
        </div>
        <div className="app-operation"
             onClick={() => {
               if (firstVisitedMainSlideBox) {
                 this.setState({
                   firstVisitedMainSlideBox: false
                 });
               }
               toggleMainSlideBox(true)
             }
           }
        />
        <div className="app-change-wrapper" style={{display: setting.isShowRandomWallpaperBtn ? 'block' : 'none', visibility: 'visible'}}>
          <img className={`windmill-img ${windmillClassName}`} src={windmill} alt="风车" onClick={this.changeWrapper}/>
          <div className="windmill-rect"/>
        </div>
        <div className="app-cover" style={{display: showAppCover ? 'block': 'none'}} onClick={() => toggleMainSlideBox(false)}/>
        <div id="mainSlidBox" className={showAppCover ? 'app-slideBox slide-show slide-box-shadow': 'app-slideBox'} style={{zoom: rightSlideZoom / 100.0}}>
          {
            !firstVisitedMainSlideBox ? <MainSlideBox/> : ''
          }
        </div>
        <div id="searchAdd">
          <div className="search-add-background" style={{display: showSearcherCover ? 'block' : 'none'}} onClick={() => toggleSearchSlideBox(false)}/>
          <div className={showSearcherCover ? 'search-add app-slideBox slide-show slide-box-shadow': 'search-add app-slideBox'} style={{zoom: 1}}>
            {
              !firstVisitedSearchSlideBox ? <SearchSlideBox/> : ''
            }
          </div>
        </div>
        <div className="contextMenu" ref="contextMenu" style={{display: showPopupMenu? 'block' : 'none', top: contextMenu.top + 'px', left: contextMenu.left + 'px'}}>
          <ul>
            <li onClick={
              this.changeWrapper
            }>随机壁纸</li>
            <li onClick={
              (e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                toggleSetting(true);
                togglePopupMenu(false)
              }
            }>编辑图标</li>
            <li><a href={currentBg.src} download>下载壁纸</a></li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showAppCover: state.view.showMainSlideBox,
    showSearcherCover: state.view.showSearchSlideBox,
    showPopupMenu: state.view.showPopupMenu,
    currentBg: state.currentBg,
    setting: state.setting,
    firstVisitedSearchSlideBox: state.firstVisitedSearchSlideBox
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleMainSlideBox: (flag) => {
      dispatch(toggleMainSlideBox(flag))
    },
    toggleSearchSlideBox: (flag) => {
      dispatch(toggleSearchSlideBox(flag))
    },
    toggleSuggestions: (flag) => {
      dispatch(toggleSuggestions(flag))
    },
    toggleSetting: (flag) => {
      dispatch(toggleSetting(flag))
    },
    togglePopupMenu: (flag) => {
      dispatch(togglePopupMenu(flag))
    },
    setAllSearchEngines: (searchEngines) => {
      dispatch(setAllSearchEngines(searchEngines))
    },
    setCurrentSearchEngine: (searchEngine) => {
      dispatch(setCurrentSearchEngine(searchEngine))
    },
    setCurrentBg: (bgInfo) => {
      dispatch(setCurrentBg(bgInfo))
    },
    setCurrentSites: (sites) => {
      dispatch(setCurrentSites(sites))
    },
    setCurrentSetting: (setting) => {
      dispatch(setCurrentSetting(setting))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
