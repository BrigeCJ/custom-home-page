import React, {Component} from 'react'
import '../assets/styles/addSite.css'

import axios from 'axios'
import { connect } from 'react-redux'
import { addSiteAsync } from "../store/actions";
import { throttle } from "../assets/utils/utils";

class AddSite extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0,
      page: 1,
      size: 30,
      total: 0,
      dataList: [],
      noMore: false,
      classify: [{
        title: '受欢迎的',
        value: 'popular'
      },{
        title: '游戏与娱乐',
        value: 'games'
      },{
        title: '应用',
        value: 'apps'
      },{
        title: '新闻',
        value: 'news'
      },{
        title: '音乐与视频',
        value: 'musics'
      },{
        title: '图片',
        value: 'photos'
      },{
        title: '购物与团购',
        value: 'shopping'
      },{
        title: '社交与博客',
        value: 'social'
      },{
        title: '体育与旅行',
        value: 'sports'
      },{
        title: '生活方式',
        value: 'life'
      },{
        title: '教育与招聘',
        value: 'education'
      },{
        title: '数码科技',
        value: 'tech'
      },{
        title: '金融',
        value: 'finance'
      },{
        title: '阅读',
        value: 'read'
      },{
        title: '其他',
        value: 'other'
      }]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleInputChange (event) {
    let val = event.target.value;
    let activeIndex = this.state.activeIndex;
    let tempIndex = -1;
    if (!val && activeIndex === -1) { // 空关键字
      tempIndex = 0;
    }
    if (activeIndex !== tempIndex) {
      this.setState({
        activeIndex: tempIndex
      });
    }
    this.initData({keyword: val})
  }
  handleKeyDown (event) {
    if (event.keyCode === 13) {
      this.handleInputChange(event)
    }
  }
  handleClassifyChange (index, value) {
    let activeIndex = this.state.activeIndex;
    if (activeIndex !== index) {
      this.setState({
        activeIndex: index
      });
    }
    this.initData({type: value});
  }
  initData ({type = 'popular', keyword}) {
    let size = this.state.size;
    let url = `/api/sites/get?type=${type}&size=${size}&page=1&keyword=`;
    if(keyword) {
      url += keyword
    }
    axios.get(url).then((res) => {
      let data = res.data;
      let status = data.status;
      let message = data.message;
      if (status === 200 && message === 'ok') {
        let row = data.data.row;
        let total = data.data.total;
        let obj = {
          dataList: row,
          total: total,
          page: 1,
          noMore: false
        };
        if (row.length === 0 || size >= total) {
          obj['noMore'] = true
        }
        this.setState(obj)
      }
    }).catch((err) => {
      this.setState({
        page: 1
      });
      console.error(err);
    })
  }
  handleScroll () {
    let oContent = this.refs.content;
    if( oContent.scrollTop + oContent.clientHeight > oContent.scrollHeight - 10) {
      let page = this.state.page;
      let size = this.state.size;
      let total = this.state.total;
      if (page * size < total) {
        this.getMoreData(page, size)
      } else {
        let noMore = this.state.noMore;
        if (!noMore) {
          this.setState({
            noMore: true
          })
        }
      }
    }
  }
  getMoreData (page, size) {
    let activeIndex = this.state.activeIndex;
    let type = this.state.classify[activeIndex === -1 ? 0 : activeIndex].value;
    let keyword = this.refs.input.value;
    let url = `/api/sites/get?type=${type}&size=${size}&page=${page+1}&keyword=`;
    if(keyword) {
      url += keyword
    }
    axios.get(url).then((res) => {
      let data = res.data;
      let status = data.status;
      let message = data.message;
      if (status === 200 && message === 'ok') {
        let tmpList = data.data.row;
        let dataList = this.state.dataList;
        dataList.push.apply(dataList, tmpList);
        this.setState({
          dataList: dataList,
          total: data.data.total,
          page: page+1
        })
      }
    }).catch((err) => {
      console.error(err);
    })
  }
  handleClick (site, event) {
    event.stopPropagation();
    this.props.addSite(site);
  }
  componentDidMount () {
    this.initData({});
  }
  render () {
    let classify = this.state.classify;
    let activeIndex = this.state.activeIndex;
    let dataList = this.state.dataList;
    let noMore = this.state.noMore;

    let {sites} = this.props;

    return (
      <div className="add-all">
        <div className="add-all-search">
          <input className="slide-search add-search" ref="input" type="search" placeholder="搜索网站" onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleInputChange}/>
          <div className="add-custom-btn"/>
        </div>
        <div className="add-all-inner">
          <ul className="add-nav">
            <li className={activeIndex === -1 ? 'add-nav-list active' : 'add-nav-list'} style={{display: activeIndex === -1 ? 'block' : 'none'}}>搜索</li>
            {
              classify.map((item, index) => <li className={activeIndex === index ? 'add-nav-list active' : 'add-nav-list'} key={index} onClick={this.handleClassifyChange.bind(this, index, item.value)}>{item.title}</li>)
            }
          </ul>
          <ul className="add-content" ref="content" onScrollCapture={throttle(this.handleScroll, 300)}>
            {
              dataList.map((item, index) => {
                let tempClass = 'add-item-addbu';
                for (let i = 0, len = sites.length; i < len; i++) {
                  if (sites[i]._id === item._id) {
                    tempClass += ' add-item-added';
                    break;
                  }
                }
                return (<li className="add-item" key={index}>
                  <div className="add-item-content">
                    <div className="add-icon">
                      <div className="add-icon-img" style={{backgroundImage: 'url(' + item.src + ')'}}/>
                    </div>
                    <div className="add-icon-info">
                      <div className="add-icon-name">{item.title}</div>
                      <div className="add-icon-desc">{item.description}</div>
                    </div>
                  </div>
                  <div className="add-item-buts">
                    <div className="add-btn-out">
                      <div className={tempClass}>
                        <span className="add-btn-added">已添加</span>
                        <span className="add-btn-text" onClick={this.handleClick.bind(this, item)}>添加</span>
                        <div className="checkson-loading add-text-loading"/>
                      </div>
                    </div>
                    <div className="add-btn-out">
                      <div className="add-item-addbu">
                        <a href={item.url} target="_blank">打开</a>
                      </div>
                    </div>
                  </div>
                </li>)
              })
            }
            <li className="add-no-more" style={{display: noMore ?  'block' : 'none'}}>没有更多了</li>
            <li className="add-loading-box" style={{display: noMore ? 'none' : 'flex'}}>
              <div className="add-loading">
                <div className="bound bound1"/>
                <div className="bound bound2"/>
                <div className="bound bound3"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    sites: state.sites
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSite: (site) => {
      dispatch(addSiteAsync(site))
    }
  }
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddSite);