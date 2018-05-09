export const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result;

  let later = function() {

    let last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    let callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};

export const throttle = (func, wait, options) => {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  let later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

export const showMessage = (message, duration) => {
  let oMessageBox = document.getElementById('checkson-message');
  if (oMessageBox) {
    try {
      document.body.removeChild(oMessageBox)
    } catch (e) {
      // pass
    }
  }
  let MessageBox = document.createElement('div')
  MessageBox.className = 'app-info-box';
  MessageBox.id = 'checkson-message';
  let MessageText = document.createElement('div');
  MessageText.className = 'info-text';
  MessageText.innerText = message;
  MessageBox.appendChild(MessageText);
  document.body.appendChild(MessageBox);
  let timer = setTimeout(() => {
    if (MessageBox) {
      try {
        document.body.removeChild(MessageBox);
      } catch (err) {
        // pass
      }
    }
    clearTimeout(timer);
  }, duration)
};

export const CustomSetting = {
  get (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  setStatus (flag) {
    this.set('checkson-status', {
      isFirstLogin: flag
    })
  },
  getStatus () {
    return this.get('checkson-status')
  },
  setDefaultSearchEngine () {
    this.set('checkson-default-search-engine', {
        "_id":"-1",
        "title":"百度",
        "description":"中国人用的最多的搜索引擎",
        "logo":"/uploads/searchEngines/36b70b8aed54484d43894582f7353e1a.png",
        "types":[
          {"name":"网页","url":"https://www.baidu.com/baidu?ie=utf-8&wd="},
          {"name":"图片","url":"https://image.baidu.com/search/index?tn=baiduimage&word="},
          {"name":"新闻","url":"https://news.baidu.com/ns?tn=news&ie=utf-8&word="},
          {"name":"视频","url":"https://video.baidu.com/v?ie=utf-8&word="},
          {"name":"地图","url":"http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D"}
        ],
        "deleted":false,
        "create_time":1525313094443,
        "update_time":1525414769984
      });
  },
  getDefaultSearchEngine () {
    return this.get('checkson-default-search-engine')
  },
  setAllEngines (searchEngines) {
    this.set('checkson-all-engines', searchEngines);
  },
  getAllEngines () {
    return this.get('checkson-all-engines')
  },
  setCurrentEngine (searchEngine) {
    this.set('checkson-current-engines', searchEngine);
  },
  getCurrentEngine () {
    return this.get('checkson-current-engines')
  },
  setCustomEngines (searchEngines) {
    this.set('checkson-custom-engines', searchEngines)
  },
  getCustomEngines () {
    return this.get('checkson-custom-engines')
  },
  setDefaultSites () {
    this.set('checkson-sites', [{
      "_id": "5aebda2ed4266b25e0be283f",
      "title": "京东商城",
      "url": "https://jd.com/",
      "type": ["shopping"],
      "keyword": "京东商城,JingDongShangCheng,http://,http://,http://,http://jd.com",
      "description": "专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上商城购物体验! ",
      "source": "checkson",
      "update_time": 1525667006857,
      "imagename": "jingdong.png",
      "src": "/uploads/sites/0ce4055f9e3e6ad35f651ad2815009d1.png",
      "create_time": 1525406254843,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5aebdc0bd4266b25e0be2840",
      "title": "携程网",
      "url": "http://www.ctrip.com/",
      "type": ["sports"],
      "keyword": "携程旅行网官网:酒店预订,机票预订查询,旅游度假,商旅管理XieChengWanghttp://www.ctrip.com/",
      "description": "携程旅行网是中国领先的在线旅行服务公司，向超过9000万会员提供酒店预订、酒店点评及特价酒店查询、机票预订、飞机票查询、时刻表、票价查询、航班查询、度假 ...",
      "source": "checkson",
      "update_time": 1525666992270,
      "imagename": "xiecheng.png",
      "src": "/uploads/sites/80f2fb4a01a89c139d3c71ec8c38c5be.png",
      "create_time": 1525406731314,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5aebdd32d4266b25e0be2841",
      "title": "亚马逊",
      "url": "https://www.amazon.cn/",
      "type": ["shopping"],
      "keyword": "Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs &amp; moreAmazon,http://www.amazon.com/,yamaxunzhongguo",
      "description": "亚马逊中国（z.cn）坚持“以客户为中心”的理念，秉承“天天低价，正品行货”信念，销售图书、电脑、数码家电、母婴百货、服饰箱包等上千万种产品。亚马逊中国提供专业服务：正品行货天天低价，机打发票全国联保。货到付款，30天内可退换货。亚马逊为中国消费者提供便利、快捷的网购体验。",
      "source": "checkson",
      "update_time": 1525666973675,
      "imagename": "amazon.png",
      "src": "/uploads/sites/96dfd681c57fe1b950636c8fcf53b010.png",
      "create_time": 1525407026910,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af0454f7667d83c0c783453",
      "title": "爱淘宝",
      "url": "https://ai.taobao.com/",
      "type": ["shopping"],
      "keyword": "爱淘宝-淘宝网购物分享平台AiTaoBaohttp://ai.taobao.com/",
      "description": "爱淘宝是淘宝旗下购物分享综合型网站，致力于为消费者用互联网技术快速发现高性价比优质潮品、特惠活动，更有资深黄钻买手、时尚达人、红人模特分享购物体验、穿搭技巧",
      "source": "checkson",
      "update_time": 1525695823724,
      "imagename": "ai-taobao.png",
      "src": "/uploads/sites/e83fba54bf7f227f03efe7b90a7db016.png",
      "create_time": 1525695823724,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af0466a7667d83c0c783454",
      "title": "网易严选",
      "url": "http://you.163.com/",
      "type": ["shopping"],
      "keyword": "wangyiyanxuan,网易严选,http://you.163.com/",
      "description": "商品严格选自一线品牌制造商，由网易公司负责采购、品控、物流、销售、售后，提供30天无忧退货服务。以“好的生活，没那么贵”为品牌理念，通过严格把控商品生产环节、直连消费者和工厂、去除品牌溢价，为用户提供好商品.好价格.好服务，和你一起为美好生活努力。",
      "source": "checkson",
      "update_time": 1525696106885,
      "imagename": "yanxuan.png",
      "src": "/uploads/sites/f724aa9683d9a2549edfa061b5b94e97.png",
      "create_time": 1525696106885,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af047277667d83c0c783455",
      "title": "哔哩哔哩弹幕视频网",
      "url": "http://www.bilibili.com/",
      "type": ["games", "musics"],
      "keyword": "哔哩哔哩弹幕视频网,BiLiBiLiDanMuShiPinWang,,http://www.bilibili.com/,弹幕网站,B站",
      "description": "bilibili是国内知名的视频弹幕网站，这里有最及时的动漫新番，最棒的ACG氛围，最有创意的Up主。大家可以在这里找到许多欢乐。",
      "source": "checkson",
      "update_time": 1525696295925,
      "imagename": "bilibili.png",
      "src": "/uploads/sites/c2c43dbe1595fc221cd1fd8960ff84e7.png",
      "create_time": 1525696295925,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af047a57667d83c0c783456",
      "title": "知乎",
      "url": "https://www.zhihu.com/",
      "type": ["social", "education"],
      "keyword": ",知乎,ZhiHu,https://www.zhihu.com/,",
      "description": "一个真实的网络问答社区，帮助你寻找答案，分享知识。",
      "source": "checkson",
      "update_time": 1525696421522,
      "imagename": "zhihu.png",
      "src": "/uploads/sites/617fecac807c6a6e8d4fdedc313fa184.png",
      "create_time": 1525696421522,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af048557667d83c0c783457",
      "title": "淘宝网",
      "url": "http://www.taobao.com",
      "type": ["shopping"],
      "keyword": "淘宝网 - 淘！我喜欢,taobaowang gouwu",
      "description": "淘宝网 - 亚洲较大的网上交易平台，提供各类服饰、美容、家居、数码、话费/点卡充值… 数亿优质商品，同时提供担保交易(先收货后付款)等安全交易保障服务，并由商家提供退货承诺、破损补寄等消费者保障服务，让你安心享受网上购物乐趣！",
      "source": "checkson",
      "update_time": 1525696597129,
      "imagename": "taobao.png",
      "src": "/uploads/sites/c0a35d96331391ba4bbc55c2c7cc3942.png",
      "create_time": 1525696597129,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af0490b7667d83c0c783458",
      "title": "新浪微博",
      "url": "http://weibo.com/",
      "type": ["social"],
      "keyword": "zhalangweibo渣浪微博XinLangWeiBohttp://weibo.com/",
      "description": "国内排名最高、影响力最大的言论平台和生活空间，并创造了新的媒体革命。",
      "source": "checkson",
      "update_time": 1525696779087,
      "imagename": "weibo.png",
      "src": "/uploads/sites/90fc9fd753abd3e1de61620b334fb236.png",
      "create_time": 1525696779087,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af049c37667d83c0c783459",
      "title": "百度云",
      "url": "http://pan.baidu.com/",
      "type": ["apps"],
      "keyword": "百度云,BaiDuYun,http://pan.baidu.com/disk/home#from=share_pan_logo",
      "description": "百度网盘为您提供文件的网络备份、同步和分享服务。空间大、速度快、安全稳固，支持教育网加速，支持手机端。现在注册即有机会享受15G的免费存储空间",
      "source": "checkson",
      "update_time": 1525696963918,
      "imagename": "baiduyun.png",
      "src": "/uploads/sites/c761666c248ffc1bd1138af5f94a6d3a.png",
      "create_time": 1525696963918,
      "deleted": false,
      "rate": 0
    }, {
      "_id": "5af04a6d7667d83c0c78345a",
      "title": "优酷",
      "url": "http://www.youku.com",
      "type": ["musics"],
      "keyword": "优酷-中国领先视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频YouKuhttp://www.youku.com",
      "description": "视频服务平台,提供视频播放,视频发布,视频搜索,视频分享",
      "source": "checkson",
      "update_time": 1525697133910,
      "imagename": "youku.png",
      "src": "/uploads/sites/9209ca24aef699891af00ea95dfbe5d2.png",
      "create_time": 1525697133910,
      "deleted": false,
      "rate": 0
    }])
  },
  setSites (sites) {
    this.set('checkson-sites', sites)
  },
  getSites () {
    return this.get('checkson-sites')
  },
  setDefaultBg () {
    this.set('checkson-bg', {
      type: 'image',
      color: 'transparent',
      src: '/uploads/wallpapers/26334fbe9c1039ebc483d43adb5443b9.jpg'
    })
  },
  setBg (bgInfo) {
    this.set('checkson-bg', bgInfo)
  },
  getBg () {
    return this.get('checkson-bg')
  },
  setDefaultSetting () {
    this.set('checkson-setting', {
      searchBoxSize: 100,
      bgOpacity: 40,
      row: 2,
      column: 5,
      fontColor: 'rgb(221, 221, 221)',
      fontSize: 15,
      iconBorderRadius: 50,
      iconOpacity: 100,
      isSimpleModel: false,
      isOpenFontShadow: false,
      isOpenLinkNewTab: true,
      isSearchInNewTab: true,
      isShowIconShadow: true,
      isShowRandomWallpaperBtn: true,
      isShowSearchBox: true,
      isShowSearchBtn: true,
      isShowSearchType: true,
      searchBoxOpacity: 100,
      searchBoxRadius: 4,
      searchBoxShadow: true,
      rightSlideZoom: 100,
      mainZoom: 100
    });
  },
  setSetting(setting) {
    this.set('checkson-setting', setting);
  },
  getSetting() {
    return this.get('checkson-setting');
  }
};
