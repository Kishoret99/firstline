import axios from 'axios';

const getToken = () => {
  // const token = cookies;
  // return token ? `Bearer ${token}` : '';
  return '';
};

const requestInterceptor = (request) => {
  const token = getToken();
  if (token) {
    request.headers.Authorization = token;
  }
  return request;
};

const api = axios.create({
  baseURL: '', // TODO: configure API base path here
  headers: {
    'content-type': 'application/json',
  },
});

api.interceptors.request.use(requestInterceptor);

export default class API {
  static Get(url, headers = {}, cache = false) {
    return api.get(url, { headers }); // TODO support cache
  }

  static Post(url, body, headers = {}) {
    return api.post(url, body, { headers });
  }

  static Put(url, body, headers = {}) {
    return api.put(url, body, { headers });
  }

  static Delete(url, headers = {}) {
    return api.delete(url, { headers });
  }

  static UploadFile(url, fileName, file, headers = {}) {
    const formData = new FormData();
    formData.append(fileName, file, file.name);
    return api.post(url, formData, { headers });
  }

  static DownloadImage(url, headers = {}) {
    const token = getToken();
    let formattedHeaders;
    // if (url.toLowerCase().indexOf(constants.TENANT_ID.toLowerCase()) > -1) {
    //   formattedHeaders = {
    //     Authorization: token,
    //     tenantId: 'jahoo',
    //     ...headers,
    //   };
    // }
    return axios({
      url: url,
      headers: { Authorization: token },
      responseType: 'blob',
    });
  }
}
