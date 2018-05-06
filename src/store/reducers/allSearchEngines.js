import {
  SET_ALL_SEARCH_ENGINES,
  ADD_SEARCH_ENGINE,
  DELETE_SEARCH_ENGINE,
} from '../actionTyps'

import { CustomSetting } from "../../assets/utils/utils";

export default function reducer(state = [], action) {
  switch(action.type) {
    case SET_ALL_SEARCH_ENGINES:
      return action.engines;
    case ADD_SEARCH_ENGINE:
      CustomSetting.setAllEngines([...state, action.engine]);
      return [
        ...state,
        action.engine
      ];
    case DELETE_SEARCH_ENGINE:
      let tempArr = state.filter((item) => {
        return item._id !== action.id;
      });
      CustomSetting.setAllEngines(tempArr);
      return tempArr;
    default:
      return state;
  }
}