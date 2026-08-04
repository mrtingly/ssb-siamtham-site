(function (global) {
  "use strict";

  const SBOS_API_ENDPOINT = "https://script.google.com/macros/s/AKfycbwmr9UW4iYjqVc573iLXA9Q7DxCB9AKlav8Y1ZKktwR5mOQq9NkTAYbd8Xawacki6Fxdw/exec";

  function getSbosApiEndpoint() {
    return SBOS_API_ENDPOINT;
  }

  global.SBOS_API_ENDPOINT = SBOS_API_ENDPOINT;
  global.getSbosApiEndpoint = getSbosApiEndpoint;
})(window);
