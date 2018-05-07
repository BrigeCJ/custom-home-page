import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX,
  TOGGLE_SUGGESTIONS
} from '../actionTyps'

export default function reducer(state = {
  showMainSlideBox: false,
  showSearchSlideBox: false,
  showSuggestions: false,
}, action) {
  switch(action.type) {
    case TOGGLE_MAIN_SLIDE_BOX:
      return { ...state, showMainSlideBox: action.flag };
    case TOGGLE_SEARCH_SLIDE_BOX:
      return { ...state, showSearchSlideBox: action.flag};
    case TOGGLE_SUGGESTIONS:
      return { ...state, showSuggestions: action.flag };
    default:
      return state;
  }
}