import axios from './';

function uploadXLSX(params) {
  return axios.post('/input/xlsx2db', params);
}

function getList({
  pageSize,
  startTime,
  endTime,
  pageNum,
  batchs: batchs = []
}) {
  let url = '/result/pagedata';
  let params = { pageSize, startTime, endTime, pageNum, batchs };
  return axios.post(url, params);
}
function getTestLineS() {
  let url = '/statistics/teststand';
  return axios.get(url);
}

export default {
  uploadXLSX,
  getList,
  getTestLineS
};
