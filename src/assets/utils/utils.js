export const throttle = (callback, ms) => {
  let args, _this;

  return function () {
    if (args === void 0) {
      args = arguments;
      _this = this;

      setTimeout(function () {
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }

        args = void 0;
      }, ms);
    }
  }
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
        "_id":"5aea6e4631a37439bc2c0484",
        "title":"百度",
        "description":"中国人用的最多的搜索引擎",
        "logo":"/uploads/searchEngines/3072ac74e067af00fd499d9920dcd421.png",
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
  setDefaultBg () {
    this.set('checkson-bg', {
      type: 'image',
      color: 'transparent',
      src: '/uploads/wallpapers/6147df9f841d0800cbc7717f42226b2f.jpg'
    })
  },
  setBg (bgInfo) {
    this.set('checkson-bg', bgInfo)
  },
  getBg () {
    return this.get('checkson-bg')
  }
};
