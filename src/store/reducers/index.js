import { combineReducers } from 'redux'
import view from './view'
import allSearchEngines from './allSearchEngines'
import currentSearchEngine from './currentSearchEngine'
import currentBg from './currentBg'

export default combineReducers({
  view: view,
  allSearchEngines: allSearchEngines,
  currentSearchEngine: currentSearchEngine,
  currentBg: currentBg
})