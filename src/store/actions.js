import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX,
  SET_ALL_SEARCH_ENGINES,
  ADD_SEARCH_ENGINE,
  DELETE_SEARCH_ENGINE,
  SET_CURRENT_SEARCH_ENGINE,
  SET_CURRENT_BG
} from './actionTyps'

// 侧边栏
export const toggleMainSlideBox = (flag) => ({
  type: TOGGLE_MAIN_SLIDE_BOX,
  flag: flag
});

export const toggleSearchSlideBox = (flag) => ({
  type: TOGGLE_SEARCH_SLIDE_BOX,
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