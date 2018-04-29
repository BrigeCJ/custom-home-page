import React, { Component } from 'react'
import Home from './components/Home'
import MainSlideBox from './components/MainSlideBox'
import SearchSlideBox from './components/SearchSlideBox'
import './assets/styles/app.css'

import bg from './assets/imgs/bg2.jpg'
import windmill from './assets/imgs/windmill.png'

import { connect } from 'react-redux'
import { toggleMainSlideBox } from "./store/actions"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windmillClassName: '',
    };
    this.changeWrapper = this.changeWrapper.bind(this);
  }
  changeWrapper () {
    this.setState({
      windmillClassName: 'rotate'
    })
  }
  render () {
    let { showAppCover, toggleSlideBox } = this.props;
    let windmillClassName = this.state.windmillClassName;

    return (
      <div className="app">
        <div className="app-bg" style={{backgroundImage: 'url(' + bg + ')'}}/>
        <div className="app-bg-cover" style={{backgroundColor: 'rgba(0, 0, 0, 0.38'}}/>
        <div className="app-home">
          <Home />
        </div>
        <div className="app-operation" onClick={() => toggleSlideBox(true)}/>
        <div className="app-change-wrapper" style={{display: 'block', visibility: 'visible'}}>
          <img className={`windmill-img ${windmillClassName}`} src={windmill} alt="风车" onClick={this.changeWrapper}/>
          <div className="windmill-rect"/>
        </div>
        <div className="app-cover" style={{display: showAppCover ? 'block': 'none'}} onClick={() => toggleSlideBox(false)}/>
        <div id="mainSlidBox" className={showAppCover ? 'app-slideBox slide-show slide-box-shadow': 'app-slideBox'} style={{zoom: 1}}>
          <MainSlideBox />
        </div>
        <div id="searchAdd">
          <div className="search-add-background"/>
          <div className="search-add app-slideBox" style={{zoom: 1}}>
            <SearchSlideBox />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showAppCover: state.showMainSlideBox
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSlideBox: (flag) => {
      dispatch(toggleMainSlideBox(flag))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
