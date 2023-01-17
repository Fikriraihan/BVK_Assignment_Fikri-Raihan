import Api from "./api";


export default class Cat extends Api{
      getResult(){
        return this.result;
    }


    async GetALL(type,param){
      let postUrl = type;
      let result = await this.getApi(postUrl,param);
      this.result = result;
      return result;
    }

}
