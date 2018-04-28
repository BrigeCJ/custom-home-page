import React, { Component } from 'react'
import AddSite from './AddSite'
import Setting from './Setting'
import '../assets/styles/mainSlideBox.css'

import { toggleMainSlideBox } from '../store/actions'
import { connect } from 'react-redux'

class MainSlideBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: 0
    };
  }
  changeContent (index) {
    if (this.state.showIndex !== index ) {
      this.setState({
        showIndex: index
      })
    }
  }
  render () {
    let showIndex = this.state.showIndex;
    let { closeSlideBox } = this.props;
    return (
      <div className="main-slide-box">
        <div className="slide-title">
          <div className="slide-close" title="关闭" onClick={closeSlideBox}/>
          <ul className="slide-title-box">
            <li className={ showIndex === 0 ? 'slide-menu selected' : 'slide-menu'} onClick={this.changeContent.bind(this, 0)}>添加</li>
            <div className="slide-separate"/>
            <li className={ showIndex === 1 ? 'slide-menu selected' : 'slide-menu'} onClick={this.changeContent.bind(this, 1)}>我的</li>
            <div className="slide-separate"/>
            <li className={ showIndex === 2 ? 'slide-menu selected' : 'slide-menu'} onClick={this.changeContent.bind(this, 2)}>发现</li>
            <div className="slide-separate"/>
            <li className={ showIndex === 3 ? 'slide-menu selected' : 'slide-menu'} onClick={this.changeContent.bind(this, 3)}>设置</li>
          </ul>
        </div>
        {/* -- 添加 -- */}
        <div className="main-slide-box-content" style={{display: showIndex === 0 ? 'block' : 'none'}}>
          <AddSite />
        </div>
        {/* -- 设置 -- */}
        <div className="main-slide-box-content setting" style={{display: showIndex === 3 ? 'block' : 'none'}}>
          <Setting />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeSlideBox: () => {
      dispatch(toggleMainSlideBox(false))
    }
  }
};

export default connect(null, mapDispatchToProps)(MainSlideBox);
