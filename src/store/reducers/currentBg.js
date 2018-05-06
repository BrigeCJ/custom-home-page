import {
  SET_CURRENT_BG
} from '../actionTyps'

import { CustomSetting } from "../../assets/utils/utils";

export default function reducer(state = {}, action) {
  switch(action.type) {
    case SET_CURRENT_BG:
      CustomSetting.setBg(action.bgInfo);
      return action.bgInfo;
    default:
      return state;
  }
}