import {
  URL_TARGET_WS_DEV,
  URL_TARGET_WS_QA,
  URL_TARGET_WS_LIVE,
} from "../constant";
import io from "socket.io-client";

function hasNumber(myString) {
  return /\d/.test(myString);
}

export function getUrlWs(currentWindowLocation) {
  //let currentWindowLocation = window.location.hostname
  let url = "";
  if (currentWindowLocation != null) {
    currentWindowLocation = currentWindowLocation.toLowerCase();
    let checkIPaddress = hasNumber(currentWindowLocation);
    // console.log("currentWindowLocation", window.location.hostname);
    // console.log("currentWindowLocation", currentWindowLocation);
    if (
      currentWindowLocation.includes("localhost") ||
      checkIPaddress === true ||
      currentWindowLocation.includes("netlify") ||
      currentWindowLocation.includes("codepen")
    ) {
      url = URL_TARGET_WS_DEV;
    } else if (currentWindowLocation.includes("dev.")) {
      url = URL_TARGET_WS_DEV;
    } else if (currentWindowLocation.includes("qa.")) {
      url = URL_TARGET_WS_QA;
    } else {
      url = URL_TARGET_WS_LIVE;
    }
  } else {
    url = URL_TARGET_WS_LIVE;
  }
  return url;
}

export const socket = io(getUrlWs(window.location.hostname), {
    transports: ["websocket"],
    upgrade: false,
});
