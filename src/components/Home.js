import React, { Component } from 'react';
import Search from './Search'
import Site from './Site'
import '../assets/styles/home.css';
import { throttle } from "../assets/utils/utils";

import { connect } from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1.0
    }
  }
  zoom() { // 按屏幕分辨率来动态缩放
    let xrate = 5.0 / 6,
        yrate = 4.0 / 4.8,
        settingMainZoom = 90;
    let homeBox = this.refs['homeBox'];
    let homeBoxWidth = homeBox.clientWidth - 100,
        homeBoxHeight = homeBox.clientHeight,
        bodyWidth = document.body.clientWidth,
        bodyHeight = document.body.clientHeight;
    let tempXRate = homeBoxWidth / bodyWidth,
        tempYRate = homeBoxHeight / bodyHeight;
    let tempZoom = 1.0;

    if ( tempXRate > xrate || tempYRate > yrate) {
      tempZoom = xrate / tempXRate < yrate / tempYRate ?  xrate / tempXRate : yrate / tempYRate;
      tempZoom = tempZoom.toFixed(2);
    } else if (tempXRate < xrate && tempYRate < yrate) {
      tempZoom = xrate / tempXRate < yrate / tempYRate ? yrate / tempYRate : xrate / tempXRate;
      tempZoom = tempZoom.toFixed(2);
    } else {
      tempZoom = 1;
    }

    if (tempZoom < .5) tempZoom = .5;
    if (tempZoom > 1) tempZoom = 1;
    if ((homeBoxWidth + 100) * tempZoom > 1800) tempZoom = 1.5;
    tempZoom *= settingMainZoom;
    tempZoom /= 100;
    tempZoom = tempZoom.toFixed(2);

    this.setState({
      zoom: tempZoom
    })
  }
  bundleWindowResize () {
    window.onresize = throttle(this.zoom.bind(this), 25)
  }
  init () {
    this.zoom();
    this.bundleWindowResize()
  }
  componentDidMount() {
    this.init()
  }
  render() {
    let zoom = this.state.zoom;
    let { setting } = this.props;
    let isShowSearchBox = setting.isShowSearchBox;
    let searchBoxSize = setting.searchBoxSize;
    let column = setting.column;
    let row = setting.row;
    return (
      <div className={['home-box', ` home-x-${column}`, ` home-y-${row}`].join('')} style={{zoom: zoom}} ref="homeBox">
        <div className="home-search" style={{display: isShowSearchBox ? 'flex': 'none', zoom: (searchBoxSize / 100).toFixed(2)}}>
          <Search />
        </div>
        <div className="home-main">
          <Site />
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

export default connect(mapStateToProps)(Home)