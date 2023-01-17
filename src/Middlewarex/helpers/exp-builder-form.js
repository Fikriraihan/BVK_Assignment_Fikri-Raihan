import {
  URL_TARGET_EXP_BUILDER_FORM_CSS_DEV,
  URL_TARGET_EXP_BUILDER_FORM_JS_DEV,
  URL_TARGET_EXP_BUILDER_FORM_CSS_QA,
  URL_TARGET_EXP_BUILDER_FORM_JS_QA,
  URL_TARGET_EXP_BUILDER_FORM_CSS_LIVE,
  URL_TARGET_EXP_BUILDER_FORM_JS_LIVE,
} from "../constant";

export const getUrlAssetForm = (currentWindowLocation) => {
  if (currentWindowLocation != null) {
    currentWindowLocation = currentWindowLocation.toLowerCase();
    if (currentWindowLocation.includes("localhost") || currentWindowLocation.includes("netlify") || currentWindowLocation.includes("codepen")) {
      return {
        css: "builder-form.css",
        js: "http://localhost:9000/dev/src/builder-form/builder-form.js",
      };
    } else if (currentWindowLocation.includes("dev.")) {
      return {
        css: URL_TARGET_EXP_BUILDER_FORM_CSS_DEV,
        js: URL_TARGET_EXP_BUILDER_FORM_JS_DEV,
      };
    } else if (currentWindowLocation.includes("qa.")) {
      return {
        css: URL_TARGET_EXP_BUILDER_FORM_CSS_QA,
        js: URL_TARGET_EXP_BUILDER_FORM_JS_QA,
      };
    } else {
      return {
        css: URL_TARGET_EXP_BUILDER_FORM_CSS_LIVE,
        js: URL_TARGET_EXP_BUILDER_FORM_JS_LIVE,
      };
    }
  } else {
    return {
      css: null,
      js: null,
    };
  }
};
