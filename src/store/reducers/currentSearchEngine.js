import {
  SET_CURRENT_SEARCH_ENGINE
} from '../actionTyps'

import { CustomSetting } from "../../assets/utils/utils";

export default function reducer(state = {
  types: []
}, action) {
  switch(action.type) {
    case SET_CURRENT_SEARCH_ENGINE:
      CustomSetting.setCurrentEngine(action.engine);
      return action.engine;
    default:
      return state;
  }
}