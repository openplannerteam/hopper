import axios from 'axios';

const post = (url = '', data = '', config = {}) => axios.post(url, data, config);

const get = (url, params = {}) => axios.get(url, { params });

const put = (url = '', data = '', config = {}) => axios.put(url, data, config);

const del = (url = '', config = {}) => axios.delete(url, config);

const HttpClient = {
  post,
  get,
  put,
  delete: del,
};

export default HttpClient;
