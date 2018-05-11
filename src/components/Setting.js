import React, {Component} from 'react'
import '../assets/styles/setting.css'

import { connect } from 'react-redux'
import {
  setAllSearchEngines,
  setCurrentBg,
  setCurrentSearchEngine,
  setCurrentSetting,
  setCurrentSites,
  updateCurrentSetting
} from "../store/actions";
import {CustomSetting} from "../assets/utils/utils";

import layout24 from '../assets/imgs/2_4.png';
import layout25 from '../assets/imgs/2_5.png';
import layout26 from '../assets/imgs/2_6.png';
import layout27 from '../assets/imgs/2_7.png';

class Setting extends Component {
  constructor (props) {
    super(props);
    this.state = {
      colors: [
        'rgb(221, 221, 221)',
        'rgb(244, 67, 54)',
        'rgb(255, 152, 0)',
        'rgb(255, 235, 59)',
        'rgb(76, 175, 80)',
        'rgb(0, 188, 212)',
        'rgb(33, 150, 243)',
        'rgb(103, 58, 183)',
        'rgb(51, 51, 51)',
      ],
      layouts: [
        [{
          row: 2,
          col: 4,
          img: layout24
        },{
          row: 2,
          col: 5,
          img: layout25
        }],
        [{
          row: 2,
          col: 6,
          img: layout26
        },{
          row: 2,
          col: 7,
          img: layout27
        }]
      ]
    };
  }
  handleCheckboxChange (key, event) {
    let flag = event.target.checked;
    this.props.updateCurrentSetting(key, flag);
  }
  handleStepChange (value, key, event) {
    event.stopPropagation();
    if(value < 50 || value > 150) {
      return false;
    }
    this.props.updateCurrentSetting(key, value);
  }
  handleRangeChange (key, event) {
    let value = event.target.value;
    this.props.updateCurrentSetting(key, value);
  }
  handleLayooutChange (item, event) {
    event.stopPropagation();
    let setting = this.props.setting;
    let row = setting.row;
    let col = setting.column;
    if (row === item.row && col === item.col) {
      return;
    }
    this.props.updateCurrentSetting('row', item.row);
    this.props.updateCurrentSetting('column', item.col);
  }
  handleReset () {
    CustomSetting.setDefaultSearchEngine();
    CustomSetting.setAllEngines([]);
    CustomSetting.setCurrentEngine(CustomSetting.getDefaultSearchEngine());
    CustomSetting.setCustomEngines([]);
    CustomSetting.setDefaultSites();
    CustomSetting.setDefaultBg();
    CustomSetting.setDefaultSetting();
    this.props.setAllSearchEngines(CustomSetting.getAllEngines());
    this.props.setCurrentSearchEngine(CustomSetting.getCurrentEngine());
    this.props.setCurrentBg(CustomSetting.getBg());
    this.props.setCurrentSites(CustomSetting.getSites());
    this.props.setCurrentSetting(CustomSetting.getSetting());
  }
  render () {
    let { setting, updateCurrentSetting } = this.props;
    let colors = this.state.colors;
    let layouts = this.state.layouts;
    return (
      <div className="setting-box">
        <div className="setting-item-wrapper">
          <div className="setting-item-title">目标打开方式</div>
          <div className="setting-item">
            <div className="setting-toggle">
                <div className="setting-toggle-text setting-text-btn-max-width">
                  <span>在新标签页中打开网站</span>
                </div>
                <input type="checkbox" className="checkbox-toggle" name="isOpenLinkNewTab" checked={setting.isOpenLinkNewTab} onChange={this.handleCheckboxChange.bind(this, 'isOpenLinkNewTab')}/>
            </div>
            <div className="setting-toggle">
                <div className="setting-toggle-text setting-text-btn-max-width">
                  <span>在新标签页中打开第三方搜索结果</span>
                </div>
                <input type="checkbox" className="checkbox-toggle" name="isSearchInNewTab" checked={setting.isSearchInNewTab} onChange={this.handleCheckboxChange.bind(this, 'isSearchInNewTab')}/>
            </div>
            <div className="setting-toggle">
              <p className="tips">注意：以上打开方式仅作用于该应用</p>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">视图</div>
          <div className="setting-item">
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-add-max-width">
                <span>主屏幕视图缩放</span>
              </div>
              <div className="setting-add-reduce-box">
                <button className="setting-reduce-btn setting-reduce-add-common" onClick={this.handleStepChange.bind(this, setting.mainZoom - 10, 'mainZoom')}/>
                <span className="setting-reduce-add-number">{setting.mainZoom}%</span>
                <button className="setting-add-btn setting-reduce-add-common" onClick={this.handleStepChange.bind(this, setting.mainZoom + 10, 'mainZoom')}/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-add-max-width">
                <span>侧边栏视图缩放</span>
              </div>
              <div className="setting-add-reduce-box">
                <button className="setting-reduce-btn setting-reduce-add-common" onClick={this.handleStepChange.bind(this, setting.rightSlideZoom - 10, 'rightSlideZoom')}/>
                <span className="setting-reduce-add-number">{setting.rightSlideZoom}%</span>
                <button className="setting-add-btn setting-reduce-add-common" onClick={this.handleStepChange.bind(this, setting.rightSlideZoom + 10, 'rightSlideZoom')}/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>在右下角显示随机切换壁纸按钮</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" checked={setting.isShowRandomWallpaperBtn} onChange={this.handleCheckboxChange.bind(this, 'isShowRandomWallpaperBtn')}/>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">布局</div>
          <div className="setting-item">
            {
              layouts.map((line, i) => {
                return (
                  <div className="setting-setlayout-line-box" key={i}>
                    {
                      line.map((item, index) => (
                        <div className={['setting-setlayout-item-box', setting.row === item.row && setting.column === item.col ? ' active' : ''].join('')}
                             key={index}
                            onClick={this.handleLayooutChange.bind(this, item)}>
                          <div className="setting-setlayout-item" style={{backgroundImage: 'url('+ item.img+')'}}/>
                          <p className="setting-setlayout-item-number">{item.row} * {item.col}</p>
                        </div>
                      ))
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">图标</div>
          <div className="setting-item">
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>极简模式</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" checked={setting.isSimpleModel} onChange={this.handleCheckboxChange.bind(this, 'isSimpleModel')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>图标阴影</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" checked={setting.isShowIconShadow} onChange={this.handleCheckboxChange.bind(this, 'isShowIconShadow')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>图标圆角</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="50" value={setting.iconBorderRadius} data-progress={setting.iconBorderRadius + '%'} onChange={this.handleRangeChange.bind(this, 'iconBorderRadius')}/>
                <progress className="setting-progress" max="50" value={setting.iconBorderRadius || 0}/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>图标不透明</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="10" max="100" value={setting.iconOpacity} data-progress={(setting.iconOpacity / 100).toFixed(2)} onChange={this.handleRangeChange.bind(this, 'iconOpacity')}/>
                <progress className="setting-progress" max="90" value={setting.iconOpacity - 10 || 0}/>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">搜索框</div>
          <div className="setting-item">
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>显示搜索框</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" name="isShowSearchBox" checked={setting.isShowSearchBox} onChange={this.handleCheckboxChange.bind(this, 'isShowSearchBox')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>显示搜索类别</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" name="isShowSearchType" checked={setting.isShowSearchType} onChange={this.handleCheckboxChange.bind(this, 'isShowSearchType')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>显示搜索按钮</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" name="isShowSearchBtn" checked={setting.isShowSearchBtn} onChange={this.handleCheckboxChange.bind(this, 'isShowSearchBtn')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框阴影</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" name="searchBoxShadow" checked={setting.searchBoxShadow} onChange={this.handleCheckboxChange.bind(this, 'searchBoxShadow')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框大小</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="50" max="150" value={setting.searchBoxSize} data-progress={setting.searchBoxSize + '%'} onChange={this.handleRangeChange.bind(this, 'searchBoxSize')}/>
                <progress className="setting-progress" max="100" value={setting.searchBoxSize - 50 || 0}/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框圆角</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="33" value={setting.searchBoxRadius} data-progress={setting.searchBoxRadius} onChange={this.handleRangeChange.bind(this, 'searchBoxRadius')}/>
                <progress className="setting-progress" max="33" value={setting.searchBoxRadius || 0}/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框不透明度</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="10" max="100" value={setting.searchBoxOpacity} data-progress={(setting.searchBoxOpacity / 100).toFixed(2)} onChange={this.handleRangeChange.bind(this, 'searchBoxOpacity')}/>
                <progress className="setting-progress" max="90" value={setting.searchBoxOpacity - 10 || 0}/>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">字体</div>
          <div className="setting-item">
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>字体阴影</span>
              </div>
              <input type="checkbox" className="checkbox-toggle" name="isOpenFontShadow" checked={setting.isOpenFontShadow} onChange={this.handleCheckboxChange.bind(this, 'isOpenFontShadow')}/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>字体大小</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="12" max="30" value={setting.fontSize} data-progress={setting.fontSize} onChange={this.handleRangeChange.bind(this, 'fontSize')}/>
                <progress className="setting-progress" max="18" value={setting.fontSize - 12 || 0}/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>字体颜色</span>
              </div>
              <div className="setting-font-color-box">
                <div className="add-custom-color-box">
                  {
                    colors.map((item, index) => (<div className="add-custom-color"
                                                      key={index}
                                                      style={{backgroundColor: item, border: setting.fontColor === item ? `1px solid ${item}` : ''}}
                                                      onClick={() => updateCurrentSetting('fontColor', item)}/>))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">壁纸遮罩浓度</div>
          <div className="setting-item">
            <div className="setting-range-progress-wallpapers">
              <input type="range" className="setting-range" min="0" max="100" value={setting.bgOpacity} data-progress={setting.bgOpacity + '%'} onChange={this.handleRangeChange.bind(this, 'bgOpacity')}/>
              <progress className="setting-progress" max="100" value={setting.bgOpacity || 0}/>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div>
            <div className="setting-item-title">还原默认设置</div>
          </div>
          <div className="setting-toggle">
            <div className="tips">执行操作后将所有设置项还原</div>
            <div className="reset-btn-box">
              <button className="reset-btn" onClick={this.handleReset.bind(this)}>立即还原</button>
            </div>
          </div>
        </div>
        <div className="tips no-more">
          <div className="line"/>
          <span>我是有底线的</span>
          <div className="line"/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    setting: state.setting
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCurrentSetting: (key, value) => {
      dispatch(updateCurrentSetting(key, value))
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);