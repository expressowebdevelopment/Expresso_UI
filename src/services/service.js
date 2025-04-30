import axios from "axios";
import { $global } from "@/main";
const sha512 = require("js-sha512");
import router from "@/router";

class CommonService {

  constructor() {
    // Call the intercept method to set up interceptors
    this.intercept();
  }

  async get(url, params = '', optData = "") {
    let tokendata;
    if (optData == 'blob') {
      tokendata = 'arraybuffer'
      var hash = sha512(params.downloadId + '|' + params.docCode + '|' + params.fileName + '|' + params.packetType + '|' + 'SecretKeyForOthers');
      var authorization = hash + '#301';
    }
    try {
      return axios.get(url, {
        params,
        responseType: tokendata,
        headers: {
          'Authorization': authorization,
          // 'api_key': $global.$api_key,
          // 'auth_token':$global.$commonstore.loginAuthtoken         
        }
      }).catch((e) => {
        this.forCatch(e);
        return [];
      });
    } catch (error) {
      console.log(error);
    }
  }

  async post(url, data = "", optData = "") {
    // console.log($global.$commonstore.multistatePortal);    
    let tokendata;
    if (optData == "Content-Type") {
      tokendata = {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          // 'api_key': $global.$api_key
        }
      };
    }
    else if (optData == 'AuthToken') {
      tokendata = {
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
          // 'api_key': $global.$api_key,
          // 'auth_token':$global.$commonstore.loginAuthtoken
        }
      };
    }
    else if (optData == 'FileType') {
      tokendata = {
        headers: {
          "Content-Type": `multipart/form-data`,
          // 'api_key': $global.$api_key,
          // 'auth_token':$global.$commonstore.loginAuthtoken
        }
      };
    }
    else if (optData == 'blob') {
      let hash = sha512(data.downloadId + '|' + data.docCode + '|' + data.fileName + '|' + data.packetType + '|' + 'SecretKeyForOthers');
      let authorization = hash + '#301';
      tokendata = {
        'responseType': 'blob',
        headers: {
          'Authorization': authorization,
          // 'api_key': $global.$api_key,
          // 'auth_token':$global.$commonstore.loginAuthtoken         
        }
      };
    }
    else {
      tokendata = {
        headers:
        {
          "multistateCode": null,
          // 'api_key': $global.$api_key 
        }
      };

    }

    return axios.post(`${url}`, data, tokendata)
      .catch((e) => {
        this.forCatch(e);
        return [];
      });
  }



  forCatch(e) {
    if (e.response) {
      if (window.dialogFunc) {
        let url = e.response.config.url;
        let serviceName = url.substring(url.lastIndexOf('/') + 1, url.length);
        window.dialogFunc('Failure', { title: e.response.data, subtext: 'HTTP code : ' + e.status + ', Service Name : ' + serviceName + ', Something went wrong.' });
        return false;
      }
    } else if (e.request) {
      if (window.dialogFunc) {
        window.dialogFunc('Failure', { title: e.message, subtext: 'Error Occured' });
      }
    } else {
      if (window.dialogFunc) {
        window.dialogFunc('Failure', { title: 'Error Occured', subtext: 'Error Occured' });
      }
    }
  }

  intercept() {
    axios.interceptors.request.use(
      function (config) {
        // $global.$commonstore.pageloading = true;
        return config;
      },
      function (error) {
        return Promise.reject(error)
      }
    );
    axios.interceptors.response.use(
      function (response) {
        // $global.$commonstore.pageloading = false;
        return response;
      },
      function (error) {
        console.log('error', error);
        
        // $global.$commonstore.pageloading = false;
        return Promise.reject(error);
      }
    );
  }

  async checkserver() {
    try {
      const response = await axios.get($global.$getToken);
      const serverStat = response.data;

      if (serverStat !== "Server is up") {
        router.push('/ServerDown');
        return false;
      }
      return true;
    } catch (error) {
      router.push('/ServerDown');
      return false;
    }
  }
}

export default new CommonService();
