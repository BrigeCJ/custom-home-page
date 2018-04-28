import React, { Component } from 'react'
import '../assets/styles/search.css'

import customSearch from '../assets/imgs/customSearch.png'
import searchArrowDown from '../assets/imgs/search-arrow-down.png'
import add from '../assets/imgs/add.png'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTypes: [
        { title: '网页', type: 0},
        { title: '图片', type: 1},
        { title: '新闻', type: 2},
        { title: '视频', type: 3},
        { title: '地图', type: 4},
      ],
      showIndex: 0,
      showSearchEngine: false
    };
  }
  changeSearchType (index) {
    if (index !== this.state.showIndex) {
      this.setState({
        showIndex: index
      })
    }
  }
  showSearchSelect (flag) {
    this.setState({
      showSearchEngine: flag
    })
  }
  render () {
    let searchTypes = this.state.searchTypes;
    let showIndex = this.state.showIndex;
    let showSearchEngine = this.state.showSearchEngine;
    return (
      <div className="search-box">
        <ul className="search-type-box">
          {
            searchTypes.map((item, index) => <li className={showIndex === index ? 'search-type selected' : 'search-type'} key={index} onClick={this.changeSearchType.bind(this, index)}>{item.title}</li>)
          }
        </ul>
        <div className="search-input-box">
          <input className="search-input"
                 autoFocus
                 type="search" placeholder="输入并搜索..."
                 style={{paddingRight: '94px', borderRadius: '4px', background: 'rgb(255, 255, 255)'}}/>
          <button className="search-button"
                  style={{display: 'block', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', opacity: 1}}/>
          <div className="search-choice"
            style={{opacity: 1, borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px'}} onClick={this.showSearchSelect.bind(this, true)}>
            <img className="search-logo" src={customSearch} alt='search-logo'/>
            <img className="search-arrow-down" src={searchArrowDown} alt='arrow-down'/>
          </div>
          <div className={showSearchEngine ? 'search-cover fadeIn' : 'search-cover fadeOut'}
               style={{display: showSearchEngine ? 'block' : 'none'}} onClick={this.showSearchSelect.bind(this, false)}/>
          <div className={showSearchEngine ? 'search-select-box fadeIn' : 'search-select-box fadeOut'}
              style={{display: showSearchEngine ? 'flex' : 'none'}}>
            <div className="search-item">
              <img className="search-item-img" src={customSearch} alt="搜索"/>
              <div className="search-item-name">搜索</div>
            </div>
            <div className="search-item search-item-addBtn">
              <div className="search-add-out">
                <img className="search-item-img search-item-add" src={add} alt="默认搜索图标"/>
              </div>
              <div className="search-item-name">添加</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;