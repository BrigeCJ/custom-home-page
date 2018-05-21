import {
  IS_FIRST_VISITED_SEARCH_SLIDE_BOX
} from '../actionTyps'

export default function reducer(state = true, action) {
  switch(action.type) {
    case IS_FIRST_VISITED_SEARCH_SLIDE_BOX:
      return action.flag;
    default:
      return state;
  }
}