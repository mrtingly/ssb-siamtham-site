(function (global) {
  "use strict";

  const SBOS_API_ENDPOINT = "https://script.google.com/macros/s/AKfycby2PXVCuGbFDcWwbw4Nn1vaeZDoHi6YPlGCSpljzDW6FP8uBE-X6YUmOgWtGwhtuIdeZw/exec";

  function getSbosApiEndpoint() {
    return SBOS_API_ENDPOINT;
  }

  global.SBOS_API_ENDPOINT = SBOS_API_ENDPOINT;
  global.getSbosApiEndpoint = getSbosApiEndpoint;
})(window);
