import React, { Component } from 'react'
import Home from './components/Home'
import MainSlideBox from './components/MainSlideBox'
import './assets/styles/app.css'

import bg from './assets/imgs/bg2.jpg'
import windmill from './assets/imgs/windmill.png'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAppCover: false,
      mainSlideBoxClassName: '',
    };

    this.showMainSlideBox = this.showMainSlideBox.bind(this);
    this.closeSlideBox = this.closeSlideBox.bind(this);
    this.changeWrapper = this.changeWrapper.bind(this);
  }
  showMainSlideBox () {
    this.setState({
      showAppCover: true,
      mainSlideBoxClassName: 'slide-show slide-box-shadow',
      windmillClassName: ''
    })
  }
  closeSlideBox () {
    this.setState({
      showAppCover: false,
      mainSlideBoxClassName: ''
    })
  }
  changeWrapper () {
    this.setState({
      windmillClassName: 'rotate'
    })
  }
  render () {
    let showAppCover = this.state.showAppCover;
    let mainSlideBoxClassName = this.state.mainSlideBoxClassName;
    let windmillClassName = this.state.windmillClassName;

    return (
      <div className="app">
        <div className="app-bg" style={{backgroundImage: 'url(' + bg + ')'}}/>
        <div className="app-bg-cover" style={{backgroundColor: 'rgba(0, 0, 0, 0.38'}}/>
        <div className="app-home">
          <Home />
        </div>
        <div className="app-operation" onClick={this.showMainSlideBox}/>
        <div className="app-change-wrapper" style={{display: 'block', visibility: 'visible'}}>
          <img className={`windmill-img ${windmillClassName}`} src={windmill} alt="风车" onClick={this.changeWrapper}/>
          <div className="windmill-rect"/>
        </div>
        <div className="app-cover" style={{display: showAppCover ? 'block': 'none'}} onClick={this.closeSlideBox}/>
        <div id="main-slide-box" className={`app-slideBox ${mainSlideBoxClassName}`} style={{zoom: 1}}>
          <MainSlideBox />
        </div>
      </div>
    )
  }
}

export  default App
