import { combineReducers } from 'redux'
import slidebox from './slidebox'
import allSearchEngines from './allSearchEngines'
import currentSearchEngine from './currentSearchEngine'
import currentBg from './currentBg'

export default combineReducers({
  sidebox: slidebox,
  allSearchEngines: allSearchEngines,
  currentSearchEngine: currentSearchEngine,
  currentBg: currentBg
})