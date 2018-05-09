import {
  SET_CURRENT_SITES,
  ADD_SITE,
  DELETE_SITE
} from '../actionTyps'

import { CustomSetting } from "../../assets/utils/utils";

export default function reducer(state = [], action) {
  switch(action.type) {
    case SET_CURRENT_SITES:
      return action.sites;
    case ADD_SITE:
      CustomSetting.setSites([...state, action.site]);
      return [
        ...state,
        action.site
      ];
    case DELETE_SITE:
      let tempArr = state.filter((item) => {
        return item._id !== action.id;
      });
      CustomSetting.setSites(tempArr);
      return tempArr;
    default:
      return state;
  }
}