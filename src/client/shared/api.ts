import axios from 'axios';
import Auth from '../auth';
import { constants } from '../constants';

const getToken = () => {
  const authInstance = new Auth(); // This must be avoided.
  const token = authInstance.isLoggedIn()
    ? authInstance.user().accessToken
    : '';
  return token ? `Bearer ${token}` : '';
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
  timeout: constants.API_TIMEOUT,
  headers: {
    'content-type': 'application/json',
    tenantId: 'jahoo',
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

  static Delete(url, body, headers = {}) {
    return api.delete(url, body, { headers });
  }

  static UploadFile(url, fileName, file, headers = {}) {
    const formData = new FormData();
    formData.append(fileName, file, file.name);
    return api.post(url, formData, { headers });
  }

  static DownloadImage(url, headers = {}) {
    const token = getToken();
    let formattedHeaders;
    if (url.toLowerCase().indexOf(constants.TENANT_ID.toLowerCase()) > -1) {
      formattedHeaders = {
        Authorization: token,
        tenantId: 'jahoo',
        ...headers,
      };
    }
    return axios({
      url: url,
      headers: { Authorization: token },
      responseType: 'blob',
    });
  }
}
