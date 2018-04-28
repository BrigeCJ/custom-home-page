import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX
} from '../actionTyps'

export default function reducer(state = {
  showMainSlideBox: false,
  showSearchSlideBox: false,
}, action) {
  switch(action.type) {
    case TOGGLE_MAIN_SLIDE_BOX:
      return { ...state, showMainSlideBox: action.flag };
    case TOGGLE_SEARCH_SLIDE_BOX:
      return { ...state, showSearchSlideBox: action.flag};
    default:
      return state;
  }
}