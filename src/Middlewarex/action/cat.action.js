import { FindAll } from "../services/cat.service";
import * as type from "../type";
import * as constant from "../constant";

export function GetCat(param) {
  return (dispatch) => {
    FindAll(constant.GETCATAPI, param).then((data) => {
      dispatch({
        type: type.GET_CAT,
        data: data,
      });
    });
  };
}
