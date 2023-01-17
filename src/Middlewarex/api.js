import axios from "axios";

// let cookieToken = require("./helpers/generateToken");
class Api {
  constructor() {
    this.header = "";
    this.auth = "";
  }
  setupHeader(AUTH_TOKEN = "") {
    // axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
    return this;
  }
  // }
  async getApi(url = "", data = {}) {
    //sample
    return await axios
      .get(url, {
        params: data,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async getAll(url = "") {
    //sample
    return await axios
      .get(
        url
        //     {
        //     headers: {
        //         // Overwrite Axios's automatically set Content-Type
        //         "Content-Type": "application/json",
        //         // 'Access-Control-Allow-Origin': '*'
        //     },
        // }
      )
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default Api;
