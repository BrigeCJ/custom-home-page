import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX,
  TOGGLE_SUGGESTIONS,
  TOGGLE_SETTING,
  CHANGE_CURRENT_PAGE,
  CHANGE_CURRENT_DISTANCE,
  SET_ALL_SEARCH_ENGINES,
  ADD_SEARCH_ENGINE,
  DELETE_SEARCH_ENGINE,
  SET_CURRENT_SEARCH_ENGINE,
  SET_CURRENT_BG,
  SET_CURRENT_SITES,
  ADD_SITE,
  DELETE_SITE,
  SET_CURRENT_SETTING,
  UPDATE_CURRENT_SETTING
} from './actionTyps'

// 视图层
export const toggleMainSlideBox = (flag) => ({
  type: TOGGLE_MAIN_SLIDE_BOX,
  flag: flag
});

export const toggleSearchSlideBox = (flag) => ({
  type: TOGGLE_SEARCH_SLIDE_BOX,
  flag: flag
});

export const toggleSuggestions = (flag) => ({
  type: TOGGLE_SUGGESTIONS,
  flag: flag
});

export const toggleSetting = (flag) => ({
  type: TOGGLE_SETTING,
  flag: flag
});

export const changeCurrentPage = (page) => ({
  type: CHANGE_CURRENT_PAGE,
  page: page
});

export const changeCurrentDistance = (distance) => ({
  type: CHANGE_CURRENT_DISTANCE,
  distance: distance
});

export const changeCuurentPageAsync = (index) => (dispatch, getState) => {
  let state = getState();
  let page = state.view.page;
  if (page !== index) {
    let distance = state.view.distance;
    let target = index * (-1300);
    let s = Math.abs(target - distance); // < 0 往右滑  --  > 0 往左滑
    let d = 25;
    let v = Math.floor(s / d);
    if (target < distance) {
      v = -v;
    }
    let timer = setInterval(() => {
      distance += v;
      dispatch(changeCurrentDistance(distance));
      if(target === distance) {
        clearInterval(timer);
        dispatch(changeCurrentPage(index));
      }
    }, 10)
  }
};

// 当前拥有的搜索引擎
export const setAllSearchEngines = (searchEngines) => ({
  type: SET_ALL_SEARCH_ENGINES,
  engines: searchEngines
});

export const addSearchEngine = (searchEngine) => ({
  type: ADD_SEARCH_ENGINE,
  engine: searchEngine
});

export const deleteSearchEngine = (searchEngineId) => ({
  type: DELETE_SEARCH_ENGINE,
  id: searchEngineId
});

// 当前选中的搜索引擎
export const setCurrentSearchEngine = (searchEngine) => ({
  type: SET_CURRENT_SEARCH_ENGINE,
  engine: searchEngine
});

// 当前壁纸信息
export const setCurrentBg = (bgInfo) => ({
  type: SET_CURRENT_BG,
  bgInfo: bgInfo
});

// 当前网站信息
export const setCurrentSites = (sites) => ({
  type: SET_CURRENT_SITES,
  sites: sites
});

export const addSite = (site) => ({
  type: ADD_SITE,
  site: site
});

export const addSiteAsync = (site) => (dispatch, getState) => {
  let state = getState();
  let { row, column } = state.setting;
  let total = state.sites.length;
  let { page, distance } = state.view;
  let pageSize = row * column;
  let count = Math.floor(total / pageSize);
  if (page !== count) {
    let target = count * (-1300);
    let s = Math.abs(target - distance); // < 0 往右滑  --  > 0 往左滑
    let d = 25;
    let v = Math.floor(s / d);
    if (target < distance) {
      v = -v;
    }
    let timer = setInterval(() => {
      distance += v;
      dispatch(changeCurrentDistance(distance));
      if(target === distance) {
        clearInterval(timer);
        dispatch(changeCurrentPage(count));
        dispatch(addSite(site))
      }
    }, 10)
  } else {
    dispatch(addSite(site))
  }
};

export const deleteSite = (siteId) => ({
  type: DELETE_SITE,
  id: siteId
});

export const deleteSiteAsync = (siteId) => (dispatch, getState) => {
  let state = getState();
  let { row, column } = state.setting;
  let total = state.sites.length;
  let { page, distance } = state.view;
  let pageSize = row * column;
  let count = Math.floor(total / pageSize);
  let r = total % pageSize;
  dispatch(deleteSite(siteId))
  if (r === 1 && page === count && count !== 0) {
    let target = (count - 1) * (-1300);
    let s = Math.abs(target - distance); // < 0 往右滑  --  > 0 往左滑
    let d = 25;
    let v = Math.floor(s / d);
    if (target < distance) {
      v = -v;
    }
    let timer = setInterval(() => {
      distance += v;
      dispatch(changeCurrentDistance(distance));
      if(target === distance) {
        clearInterval(timer);
        dispatch(changeCurrentPage(count - 1));
      }
    }, 10)
  }
};

// 当前网站的设置
export const setCurrentSetting = (setting) => ({
  type: SET_CURRENT_SETTING,
  setting: setting
});

export const updateCurrentSetting = (key, value) => ({
  type: UPDATE_CURRENT_SETTING,
  key: key,
  value: value
});