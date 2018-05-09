import { combineReducers } from 'redux'
import view from './view'
import allSearchEngines from './allSearchEngines'
import currentSearchEngine from './currentSearchEngine'
import currentBg from './currentBg'
import sites from './sites'
import setting from './setting'

export default combineReducers({
  view: view,
  allSearchEngines: allSearchEngines,
  currentSearchEngine: currentSearchEngine,
  currentBg: currentBg,
  sites: sites,
  setting: setting
});
