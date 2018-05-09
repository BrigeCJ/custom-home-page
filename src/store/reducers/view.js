import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX,
  TOGGLE_SUGGESTIONS,
  TOGGLE_SETTING
} from '../actionTyps'

export default function reducer(state = {
  showMainSlideBox: false,
  showSearchSlideBox: false,
  showSuggestions: false,
  showSitesSetting: false
}, action) {
  switch(action.type) {
    case TOGGLE_MAIN_SLIDE_BOX:
      return { ...state, showMainSlideBox: action.flag };
    case TOGGLE_SEARCH_SLIDE_BOX:
      return { ...state, showSearchSlideBox: action.flag};
    case TOGGLE_SUGGESTIONS:
      return { ...state, showSuggestions: action.flag };
    case TOGGLE_SETTING:
      return { ...state, showSitesSetting: action.flag};
    default:
      return state;
  }
}