import React, {Component} from 'react'
import '../assets/styles/addSite.css'

import axios from 'axios'

class AddSite extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeIndex: 0,
      page: 1,
      size: 30,
      total: 0,
      dataList: [],
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
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange (event) {
    let val = event.target.value;
    let activeIndex = this.state.activeIndex;
    let tempIndex = -1;
    if (!val) { // 空关键字
      tempIndex = 0;
    }
    this.setState({
      activeIndex: tempIndex
    });
    this.initData({keyword: val})
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
    this.setState({
      page: 1
    });
    let page = this.state.page;
    let size = this.state.size;
    let url = `/api/sites/get?type=${type}&size=${size}&page=${page}&keyword=`;
    if(keyword) {
      url += keyword
    }
    axios.get(url).then((res) => {
      let data = res.data;
      let status = data.status;
      let message = data.message;
      if (status === 200 && message === 'ok') {
        this.setState({
          dataList: data.data.row,
          total: data.data.total
        })
      }
    }).catch((err) => {
      console.error(err);
    })
  }
  componentDidMount () {
    this.initData({})
  }
  render () {
    let classify = this.state.classify;
    let activeIndex = this.state.activeIndex;
    let dataList = this.state.dataList;

    return (
      <div className="add-all">
        <div className="add-all-search">
          <input className="slide-search add-search" type="search" placeholder="搜索网站" onChange={this.handleInputChange}/>
          <div className="add-custom-btn"/>
        </div>
        <div className="add-all-inner">
          <ul className="add-nav">
            <li className={activeIndex === -1 ? 'add-nav-list active' : 'add-nav-list'} style={{display: activeIndex === -1 ? 'block' : 'none'}}>搜索</li>
            {
              classify.map((item, index) => <li className={activeIndex === index ? 'add-nav-list active' : 'add-nav-list'} key={index} onClick={this.handleClassifyChange.bind(this, index, item.value)}>{item.title}</li>)
            }
          </ul>
          <ul className="add-content">
            {
              dataList.map((item, index) => (
                <li className="add-item" key={index}>
                  <div className="add-item-content">
                    <div className="add-icon">
                      <div className="add-icon-img" style={{backgroundImage: 'url('+item.src+')'}}/>
                    </div>
                    <div className="add-icon-info">
                      <div className="add-icon-name">{item.title}</div>
                      <div className="add-icon-desc">{item.description}</div>
                    </div>
                  </div>
                  <div className="add-item-buts">
                    <div className="add-btn-out">
                      <div className="add-item-addbu">
                        <span className="add-btn-added">已添加</span>
                        <span className="add-btn-text">添加</span>
                        <div className="infinity-loading add-text-loading"/>
                      </div>
                    </div>
                    <div className="add-btn-out">
                      <div className="add-item-addbu">
                        <span>打开</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default AddSite;