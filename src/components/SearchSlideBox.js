import React, {Component} from 'react'
import '../assets/styles/searchSlideBox.css'
import axios from 'axios'

import { connect } from 'react-redux'
import { toggleSearchSlideBox, addSearchEngine } from '../store/actions'

class SearchSlideBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabIndex: 0,
      tabs: [{
        title: '默认搜索引擎'
      }, {
        title: '其他搜索引擎'
      }],
      defaultSearchEngines: []
    }
    this.changeTabIndex = this.changeTabIndex.bind(this)
  }
  init () {
    this.initData()
  }
  initData () {
    axios.get('/api/searchEngines/get').then((res) => {
      this.handleResponse(res)
    }).catch((err) => {
      console.error(err);
    })
  }
  handleResponse (res) {
    let data = res.data;
    let status = data.status;
    let message = data.message;
    if (status === 200 && message === 'ok') {
      this.setState({
        defaultSearchEngines: data.data.row
      })
    } else {
      console.error(message)
    }
  }
  changeTabIndex (index) {
    this.setState({
      tabIndex: index
    })
  }
  componentDidMount () {
    this.init();
  }
  render () {
    let { defaultSearchEngines, tabs, tabIndex } = this.state;
    let { allEngines, toggleSearchSlideBox, addSearchEngine } = this.props;
    return (
      <div className="search-slide-box">
        <div className="slide-title">
          <div className="slide-close search-close" onClick={() => toggleSearchSlideBox(false)}/>
          <div className="slide-title-box">
            <span className="search-slide-title">添加搜索引擎</span>
          </div>
        </div>
        <div className="search-add-tabs">
          {
            tabs.map((item, index) => (
              <button className={tabIndex === index ? 'search-add-tab active' : 'search-add-tab'}
                      type="button"
                      key={index}
                      onClick={() => this.changeTabIndex(index)}>
                <span>{item.title}</span>
              </button>
            ))
          }
        </div>
        <div className="search-tab-content" style={{display: tabIndex === 0 ? 'block' : 'none'}}>
          <div className="search-add-default">
            <div className="search-add-default-list">
              {
                defaultSearchEngines.map((item, index) => {
                  let tempClass = 'search-item-slide';
                  for (let i = 0, len = allEngines.length; i < len; i++) {
                    if (allEngines[i]._id === item._id) {
                        tempClass += ' added';
                        break;
                    }
                  }
                  return (<div className={tempClass} key={index}>
                    <div className="search-item-logo-wrapper">
                      <img className="search-item-logo" src={item.logo} alt={item.title}/>
                    </div>
                    <div className="search-item-content">
                      <div className="search-item-title">{item.title}</div>
                      <div className="search-item-desc">{item.description}</div>
                      <div className="search-item-operate-area">
                        <button className="search-item-btn" type="button" onClick={() => addSearchEngine(item)}>添加
                        </button>
                        <span className="search-add-tip">已添加</span>
                      </div>
                    </div>
                  </div>)
                })
              }
            </div>
          </div>
        </div>
        <div className="search-tab-content" style={{display: tabIndex === 1 ? 'block' : 'none'}}>
          <div className="search-add-custom">
            <div className="search-add-custom-list">
              <button className="search-create-custom-btn" type="button">
                <span>添加搜索引擎</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allEngines: state.allSearchEngines
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSearchSlideBox: (flag) => {
      dispatch(toggleSearchSlideBox(flag))
    },
    addSearchEngine: (searchEngine) => {
      dispatch(addSearchEngine(searchEngine))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSlideBox);