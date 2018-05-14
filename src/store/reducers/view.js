import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX,
  TOGGLE_SUGGESTIONS,
  TOGGLE_SETTING,
  CHANGE_CURRENT_PAGE,
  CHANGE_CURRENT_DISTANCE
} from '../actionTyps'

export default function reducer(state = {
  showMainSlideBox: false,
  showSearchSlideBox: false,
  showSuggestions: false,
  showSitesSetting: false,
  page: 0,
  distance: 0
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
    case CHANGE_CURRENT_PAGE:
      return { ...state, page: action.page};
    case CHANGE_CURRENT_DISTANCE:
      return { ...state, distance: action.distance};
    default:
      return state;
  }
}