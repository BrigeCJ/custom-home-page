import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX,
  TOGGLE_SUGGESTIONS,
  TOGGLE_SETTING,
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

export const deleteSite = (siteId) => ({
  type: DELETE_SITE,
  id: siteId
});

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