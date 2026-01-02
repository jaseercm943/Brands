// src/services/Commonapi.js
import api from "./api";

export const commonapi = (method, url, body) => {
  return api({
    method,
    url,
    data: body,
  });
};
