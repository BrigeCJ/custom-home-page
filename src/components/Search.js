import React, { Component } from 'react'
import '../assets/styles/search.css'

import customSearch from '../assets/imgs/customSearch.png'
import searchArrowDown from '../assets/imgs/search-arrow-down.png'
import add from '../assets/imgs/add.png'

import { connect } from 'react-redux'
import { toggleSearchSlideBox, toggleSuggestions, setCurrentSearchEngine, deleteSearchEngine, changeInitialSearchSlideBoxFlag } from "../store/actions"
import { CustomSetting, showMessage } from '../assets/utils/utils'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: 0,
      showSearchEngine: false,
      suggestions: [],
      keyword: '',
      selectedIndex: -1
    };
    this.changeSearchType = this.changeSearchType.bind(this);
    this.showSearchSelect = this.showSearchSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  handleChange (event) {
    let val = event.target.value;
    let obj = {
      keyword: val,
    };
    if (!val) {
      obj.selectedIndex = -1;
    }
    this.setState(obj);
    let timestamp = new Date().getTime();
    let url = `http://suggestion.baidu.com/su?wd=${val}&p=3&t=${timestamp}&cb=window.baidu.sug`;
    // 定义回调函数
    window.baidu = {
      sug: (json) => {
        this.props.toggleSuggestions(true);
        this.setState({
          suggestions: json.s
        })
      }
    };
    // 动态添加脚
    let jsonpScript = document.getElementById('jsonpScript');
    if (jsonpScript) {
      document.getElementsByTagName("head")[0].removeChild(jsonpScript);
    }
    let script = document.createElement("script");
    script.src = url;
    script.id = 'jsonpScript';
    document.getElementsByTagName("head")[0].appendChild(script);
  }
  handleKeyDown(event) {
    event.stopPropagation();
    let keyCode = event.keyCode;
    if (keyCode === 13) {
      this.handleSearch(event.target.value)
    } else if ( keyCode === 38 || keyCode === 40) { // 向上 或者 向下
      let suggestions = this.state.suggestions;
      let len = suggestions.length;
      if (len !== 0) {
         let selectedIndex = this.state.selectedIndex;
         if (keyCode === 38) {
           if (selectedIndex === - 1) {
             selectedIndex = len - 1;
           } else {
             selectedIndex--;
           }
         } else {
           if (selectedIndex === len - 1) {
             selectedIndex = -1;
           } else {
             selectedIndex++;
           }
         }
         let keyword = this.state.keyword;
         event.target.value = selectedIndex === -1 ? keyword : suggestions[selectedIndex];
         this.setState({
           selectedIndex: selectedIndex
         })
      }
    }
  }
  handleClick (event) {
    let val = this.refs.input.value;
    this.handleSearch(val);
  }
  handleSearch (value) {
    let {currentEngine, setting} = this.props;
    let showIndex = this.state.showIndex;
    let isSearchInNewTab = setting.isSearchInNewTab;
    let url = currentEngine.types[showIndex].url;
    if (isSearchInNewTab) {
      window.open(url + value);
    } else {
      window.location.href = url + value;
    }
  }
  handleDelete (event, item) {
     event.stopPropagation();
     let { currentEngine, deleteSearchEngine } = this.props;
     if (currentEngine._id === item._id) {
       showMessage('当前使用的搜索引擎无法删除', 3000);
       return false;
     }
     deleteSearchEngine(item._id);
  }
  render () {
    let showIndex = this.state.showIndex;
    let showSearchEngine = this.state.showSearchEngine;
    let suggestions = this.state.suggestions;
    let selectedIndex = this.state.selectedIndex;

    let { currentEngine, allEngines, setting, showSuggestions, toggleSearchSlideBox, toggleSuggestions, setCurrentSearchEngine, firstVisitedSearchSlideBox, changeInitialSearchSlideBoxFlag } = this.props;

    let isShowSearchType = setting.isShowSearchType;
    let isShowSearchBtn = setting.isShowSearchBtn;
    let searchBoxShadow = setting.searchBoxShadow;
    let isOpenFontShadow = setting.isOpenFontShadow;
    let fontColor = setting.fontColor;
    let searchBoxRadius = setting.searchBoxRadius;
    let searchBoxOpacity = setting.searchBoxOpacity;
    return (
      <div className="search-box">
        <ul className="search-type-box" style={{visibility: isShowSearchType ? 'visible' : 'hidden'}}>
          {
            currentEngine.types.map((item, index) => <li className={showIndex === index ? 'search-type selected' : 'search-type'} style={{textShadow: isOpenFontShadow ? '' : 'none', color: fontColor}} key={index} onClick={() => this.changeSearchType(index)}>{item.name}</li>)
          }
        </ul>
        <div className="search-input-box" style={{boxShadow: searchBoxShadow ? '' : 'none', borderRadius: searchBoxRadius + 'px', opacity: (searchBoxOpacity / 100).toFixed(2)}}>
          <input className="search-input"
                 autoFocus
                 ref="input"
                 type="search" placeholder="输入并搜索..."
                 onKeyDown={this.handleKeyDown}
                 onChange={this.handleChange}
                 style={{paddingRight: isShowSearchBtn ? '94px' : '20px', borderRadius: searchBoxRadius + 'px', background: 'rgb(255, 255, 255)'}}/>
          <button className="search-button"
                  onClick={this.handleClick}
                  style={{display: isShowSearchBtn ? 'block' : 'none', borderTopRightRadius: searchBoxRadius + 'px', borderBottomRightRadius: searchBoxRadius + 'px', opacity: 1}}/>
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
                  <div className="search-item-delete" title="删除" onClick={(event) => this.handleDelete(event, item)}/>
                </div>
                <img className="search-item-img" src={item.logo} alt={item.title}/>
                <div className="search-item-name">{item.title}</div>
              </div>))
            }
            <div className="search-item search-item-addBtn"
                 onClick={() => {
                   if (firstVisitedSearchSlideBox) {
                     changeInitialSearchSlideBoxFlag(false);
                   }
                   toggleSearchSlideBox(true)
                 }
               }
            >
              <div className="search-add-out">
                <img className="search-item-img search-item-add" src={add} alt="默认搜索图标"/>
              </div>
              <div className="search-item-name">添加</div>
            </div>
          </div>
          <div className="search-suggestion-out" style={{display: showSuggestions ? 'block' : 'none'}}>
            <ul className="search-suggestion-list">
              {
                suggestions.map((item, index) => (<li className={['search-suggestion-item', selectedIndex === index ? ' active' : ''].join('')} key={index} onClick={() => {toggleSuggestions(false); this.handleSearch(item);}}>{item}</li>))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentEngine: state.currentSearchEngine,
    allEngines: state.allSearchEngines,
    showSuggestions: state.view.showSuggestions,
    setting: state.setting,
    firstVisitedSearchSlideBox: state.firstVisitedSearchSlideBox
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSearchSlideBox: (flag) => {
      dispatch(toggleSearchSlideBox(flag))
    },
    toggleSuggestions: (flag) => {
      dispatch(toggleSuggestions(flag))
    },
    setCurrentSearchEngine: (searchEngine) => {
      dispatch(setCurrentSearchEngine(searchEngine))
    },
    deleteSearchEngine: (searchEngineId) => {
      dispatch(deleteSearchEngine(searchEngineId))
    },
    changeInitialSearchSlideBoxFlag: (flag) => {
      dispatch(changeInitialSearchSlideBoxFlag(flag))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);