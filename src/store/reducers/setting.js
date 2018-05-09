import {
  SET_CURRENT_SETTING,
  UPDATE_CURRENT_SETTING,
} from '../actionTyps'

import { CustomSetting } from "../../assets/utils/utils";

export default function reducer(state = {}, action) {
  switch(action.type) {
    case SET_CURRENT_SETTING:
      return action.setting;
    case UPDATE_CURRENT_SETTING:
      let newState = Object.assign({}, state, {[action.key]: action.value});
      CustomSetting.setSetting(newState);
      return newState;
    default:
      return state;
  }
}