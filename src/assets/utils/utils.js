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
