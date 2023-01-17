import {
    EXP_BUILDER_CSS,
    EXP_BUILDER_JS,
    EXP_BUILDER_CSS_DEV,
    EXP_BUILDER_JS_DEV,
    EXP_BUILDER_CSS_QA,
    EXP_BUILDER_JS_QA,
    EXP_BUILDER_CSS_LIVE,
    EXP_BUILDER_JS_LIVE,
} from '../constant';

export const getUrlAsset = (currentWindowLocation) => {
    if (currentWindowLocation != null) {
      currentWindowLocation = currentWindowLocation.toLowerCase();
      if(currentWindowLocation.includes('localhost') || currentWindowLocation.includes('netlify') || currentWindowLocation.includes('codepen') ){
        return {
          "css": EXP_BUILDER_CSS,
          "js": EXP_BUILDER_JS
        }
      }else if(currentWindowLocation.includes('dev.')){

        return {
         "css": EXP_BUILDER_CSS_DEV,
          "js": EXP_BUILDER_JS_DEV
        }

      } else if(currentWindowLocation.includes('qa.')){
        return {
         "css": EXP_BUILDER_CSS_QA,
          "js": EXP_BUILDER_JS_QA
        }
      }else{
        return {
         "css": EXP_BUILDER_CSS_LIVE,
          "js": EXP_BUILDER_JS_LIVE
        }
      }
    }
}