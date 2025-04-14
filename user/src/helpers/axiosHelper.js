import axios from "axios";
import got from "got";

const axiosCommon = (requestPayload) => {
  return new Promise((resolve, reject) => {
    axios(requestPayload)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const axiosGetCommon = (url, headers) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(url, headers)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error);
      });
  });
};

const gotCommon = (requestPayload) => {
  return new Promise(async (resolve, reject) => {
    await got(requestPayload)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error);
      });
  });
};

export { axiosCommon, axiosGetCommon, gotCommon };
