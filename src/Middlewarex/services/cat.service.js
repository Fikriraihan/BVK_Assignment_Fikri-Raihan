import catAPI from "../cat";

export const FindAll = async (constant, param) => {
  try {
    let cat = new catAPI();
    let getcat = await cat.GetALL(constant, param);
    let catData = getcat;

    if (catData) {
      return catData;
    }

    return null;
  } catch (e) {
    return null;
  }
};
