import React, { Component } from 'react'
import Home from './components/Home'
import MainSlideBox from './components/MainSlideBox'
import SearchSlideBox from './components/SearchSlideBox'
import './assets/styles/app.css'

import axios from 'axios';
import windmill from './assets/imgs/windmill.png'

import { connect } from 'react-redux'
import { toggleMainSlideBox, toggleSearchSlideBox, toggleSuggestions, toggleSetting, setAllSearchEngines, setCurrentSearchEngine, setCurrentBg, setCurrentSites, setCurrentSetting } from "./store/actions"
import { CustomSetting, showMessage } from './assets/utils/utils'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windmillClassName: '',
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
    // 绑定document事件
    document.addEventListener('click', () => {
      this.props.toggleSuggestions(false);
      this.props.toggleSetting(false);
    })
  }
  componentDidMount () {
    this.initSetting();
  }
  render () {
    let { showAppCover, showSearcherCover, currentBg, setting, toggleMainSlideBox, toggleSearchSlideBox } = this.props;
    let windmillClassName = this.state.windmillClassName;
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
        <div className="app-operation" onClick={() => toggleMainSlideBox(true)}/>
        <div className="app-change-wrapper" style={{display: setting.isShowRandomWallpaperBtn ? 'block' : 'none', visibility: 'visible'}}>
          <img className={`windmill-img ${windmillClassName}`} src={windmill} alt="风车" onClick={this.changeWrapper}/>
          <div className="windmill-rect"/>
        </div>
        <div className="app-cover" style={{display: showAppCover ? 'block': 'none'}} onClick={() => toggleMainSlideBox(false)}/>
        <div id="mainSlidBox" className={showAppCover ? 'app-slideBox slide-show slide-box-shadow': 'app-slideBox'} style={{zoom: rightSlideZoom / 100.0}}>
          <MainSlideBox />
        </div>
        <div id="searchAdd">
          <div className="search-add-background" style={{display: showSearcherCover ? 'block' : 'none'}} onClick={() => toggleSearchSlideBox(false)}/>
          <div className={showSearcherCover ? 'search-add app-slideBox slide-show slide-box-shadow': 'search-add app-slideBox'} style={{zoom: 1}}>
            <SearchSlideBox />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showAppCover: state.view.showMainSlideBox,
    showSearcherCover: state.view.showSearchSlideBox,
    currentBg: state.currentBg,
    setting: state.setting
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
