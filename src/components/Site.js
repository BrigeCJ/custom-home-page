import React, { Component } from 'react'
import '../assets/styles/site.css'

import { connect } from 'react-redux';
import { toggleSetting, deleteSite } from '../store/actions'

class Site extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 0,
      distance: 0
    };
    this.handleContextMenu = this.handleContextMenu.bind(this);
  }
  handleChangePage (index) {
    let page = this.state.page;
    if (page !== index) {
      let distance = this.state.distance;
      let target = index * (-1300);
      let s = Math.abs(target - distance); // < 0 往右滑  --  > 0 往左滑
      let d = 25;
      let v = Math.floor(s / d);
      if (target < distance) {
        v = -v;
      }
      let timer = setInterval(() => {
        distance += v;
        this.setState({
          distance: distance
        });
        if(target === distance) {
          clearInterval(timer);
          this.setState({
            page: index
          })
        }
      }, 10)
    }
  }
  handleContextMenu (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.toggleSetting(true)
  }
  handleDelete (e, id) {
    e.stopPropagation();
    e.preventDefault();
    this.props.deleteSite(id);
  }
  render () {
    let {sites, setting, showSitesSetting} = this.props;
    let page = this.state.page;
    let distance = this.state.distance;
    // 分页处理
    let tmpSites = [];
    if (setting.row && setting.column) {
      let len = sites.length;
      let row = setting.row;
      let column = setting.column;
      let count = row * column;
      let total = Math.ceil(len / count);
      for (let i = 0; i < total; i++) {
        tmpSites[i] = [];
        let start = i * count;
        let end = start + count;
        for(let j = start; j < len && j < end; j++) {
          tmpSites[i].push(sites[j]);
        }
      }
    }
    let isSimpleModel = setting.isSimpleModel;
    let isShowIconShadow = setting.isShowIconShadow;
    let isOpenFontShadow = setting.isOpenFontShadow;
    let fontColor = setting.fontColor;
    let fontSize = setting.fontSize;
    let iconBorderRadius = setting.iconBorderRadius;
    let iconOpacity = setting.iconOpacity;
    return (
      <div className="main-box">
        <div className="home-main">
          <div className="home-main-box" style={{transform: 'translateX('+ distance +'px)'}}>
            <div className="home-icon-box home-icon-last"/>
            {
              tmpSites.map((arr, i) => (
                <div className="home-icon-box home-page" key={i}>
                  {
                    arr.map((item, index) => (
                      <div className={showSitesSetting ? 'home-icon home-icon-setting home-icon-shake': 'home-icon home-icon-setting'}
                           style={{opacity: (iconOpacity / 100).toFixed(2)}}
                           draggable="true"
                           key={index}>
                        <a href={item.url}
                           target={setting.isOpenLinkNewTab ? '_blank': '_self'}
                           onContextMenu={this.handleContextMenu}
                           className="home-icon-img"
                           style={{backgroundImage: 'url('+item.src+')', boxShadow: isShowIconShadow ? '' : 'none',backgroundColor: 'transparent', borderRadius: iconBorderRadius + '%'}}>
                          <div className="home-icon-delete" title="删除" onClick={(e) => {this.handleDelete(e, item._id)}}/>
                          <div className="home-icon-edit"/>
                        </a>
                        <div className="home-icon-name"
                             style={{display: isSimpleModel ? 'none': 'block', textShadow: isOpenFontShadow ? '' : 'none', color: fontColor, fontSize: fontSize + 'px'}}>{item.title}</div>
                      </div>
                    ))
                  }
                </div>
              ))
            }
            <div className="home-icon-box home-icon-first"/>
          </div>
        </div>
        <div className="home-point-box">
          <ul className="home-point-inner" style={{display: tmpSites.length <= 1 ? 'none' : 'flex'}}>
            {
              tmpSites.map((item, index) => (<li onClick={this.handleChangePage.bind(this, index)} key={index} className={page === index ? 'home-point active' : 'home-point'}/>))
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sites: state.sites,
    setting: state.setting,
    showSitesSetting: state.view.showSitesSetting
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSetting: (flag) => {
      dispatch(toggleSetting(flag))
    },
    deleteSite: (id) => {
      dispatch(deleteSite((id)))
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Site);