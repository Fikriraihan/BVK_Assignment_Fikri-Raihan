import { type } from "@testing-library/user-event/dist/type";
import * as types from '../type';

const initialState = {
  data: [],
  stripe: "",
  loading: true
};

const catReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CAT:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    default:
      return state;
  }
}

export default catReducers;
