import axios from './';

function uploadXLSX(params) {
  return axios.post('/input/xlsx2db', params);
}

export default {
  uploadXLSX
};
