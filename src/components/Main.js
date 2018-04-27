import React, { Component } from 'react'
import '../assets/styles/main.css'
import logo from '../assets/imgs/logo.png'

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      homeList: [{
        title: 'chrome 应用',
        icon: logo
      }]
    }
  }
  render () {
    return (
      <div className="main-box">
        <div className="home-main">
          <div className="home-main-box">
            <div className="home-icon-box home-icon-last"/>
            <div className="home-icon-box home-page">
              <div className="home-icon home-icon-setting" draggable="true">
                <div className="home-icon-img" style={{backgroundImage: 'url('+logo+')', backgroundColor: 'transparent'}}>
                  <div className="home-icon-delete"/>
                  <div className="home-icon-edit"/>
                </div>
                <div className="home-icon-name">chrome 应用</div>
              </div>
            </div>
            <div className="home-icon-box home-icon-first"/>
          </div>
        </div>
        <div className="home-pointer"></div>
      </div>
    )
  }
}

export default Main;