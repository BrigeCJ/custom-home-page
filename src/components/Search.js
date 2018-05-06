import React, { Component } from 'react'
import '../assets/styles/search.css'

import customSearch from '../assets/imgs/customSearch.png'
import searchArrowDown from '../assets/imgs/search-arrow-down.png'
import add from '../assets/imgs/add.png'

import { connect } from 'react-redux'
import { toggleSearchSlideBox, setCurrentSearchEngine, deleteSearchEngine } from "../store/actions"
import { CustomSetting } from '../assets/utils/utils'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: 0,
      showSearchEngine: false
    };
    this.changeSearchType = this.changeSearchType.bind(this);
    this.showSearchSelect = this.showSearchSelect.bind(this);
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
    let showIndex = this.state.showIndex;
    let showSearchEngine = this.state.showSearchEngine;

    let { currentEngine, allEngines, toggleSearchSlideBox, setCurrentSearchEngine , deleteSearchEngine} = this.props;

    return (
      <div className="search-box">
        <ul className="search-type-box">
          {
            currentEngine.types.map((item, index) => <li className={showIndex === index ? 'search-type selected' : 'search-type'} key={index} onClick={() => this.changeSearchType(index)}>{item.name}</li>)
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
            style={{opacity: 1, borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px'}} onClick={() => this.showSearchSelect(true)}>
            <img className="search-logo" src={currentEngine.logo} alt={currentEngine.title}/>
            <img className="search-arrow-down" src={searchArrowDown} alt='arrow-down'/>
          </div>
          <div className={showSearchEngine ? 'search-cover fadeIn' : 'search-cover fadeOut'}
               style={{display: showSearchEngine ? 'block' : 'none'}} onClick={() => this.showSearchSelect(false)}/>
          <div className={showSearchEngine ? 'search-select-box fadeIn' : 'search-select-box fadeOut'}
              style={{display: showSearchEngine ? 'flex' : 'none'}}>
            <div className="search-item" onClick={() => {setCurrentSearchEngine(CustomSetting.getDefaultSearchEngine()); this.showSearchSelect(false)}}>
              <img className="search-item-img" src={customSearch} alt="搜索"/>
              <div className="search-item-name">搜索</div>
            </div>
            {
              allEngines.map((item, index) => (<div className="search-item" key={index} onClick={() => {setCurrentSearchEngine(item); this.showSearchSelect(false)}}>
                <div className="search-item-delete-out">
                  <div className="search-item-delete" title="删除" onClick={(e) => {e.stopPropagation(); deleteSearchEngine(item._id);}}/>
                </div>
                <img className="search-item-img" src={item.logo} alt="搜索"/>
                <div className="search-item-name">{item.title}</div>
              </div>))
            }
            <div className="search-item search-item-addBtn" onClick={() => toggleSearchSlideBox(true)}>
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

const mapStateToProps = (state) => {
  return {
    currentEngine: state.currentSearchEngine,
    allEngines: state.allSearchEngines
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSearchSlideBox: (flag) => {
      dispatch(toggleSearchSlideBox(flag))
    },
    setCurrentSearchEngine: (searchEngine) => {
      dispatch(setCurrentSearchEngine(searchEngine))
    },
    deleteSearchEngine: (searchEngineId) => {
      dispatch(deleteSearchEngine(searchEngineId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);