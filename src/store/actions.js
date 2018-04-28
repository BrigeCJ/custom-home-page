import {
  TOGGLE_MAIN_SLIDE_BOX,
  TOGGLE_SEARCH_SLIDE_BOX
} from './actionTyps'

export const toggleMainSlideBox = (flag) => ({
  type: TOGGLE_MAIN_SLIDE_BOX,
  flag: flag
});

export const toggleSearchSlideBox = (flag) => ({
  type: TOGGLE_SEARCH_SLIDE_BOX,
  flag: flag
});