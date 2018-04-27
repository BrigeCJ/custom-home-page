import React, { Component } from 'react'
import '../assets/styles/search.css'

import customSearch from '../assets/imgs/customSearch.png'
import searchArrowDown from '../assets/imgs/search-arrow-down.png'

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
      ]
    }
  }
  render () {
    let searchTypes = this.state.searchTypes;
    return (
      <div className="search-box">
        <ul className="search-type-box">
          {
            searchTypes.map((item, index) => <li className="search-type" key={index}>{item.title}</li>)
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
            style={{opacity: 1, borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px'}}>
            <img className="search-logo" src={customSearch} alt='search-logo'/>
            <img className="search-arrow-down" src={searchArrowDown} alt='arrow-down'/>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;