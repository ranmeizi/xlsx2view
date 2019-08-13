import axios from './';

function uploadXLSX(params) {
  return axios.post('/input/xlsx2db', params);
}

function getList({
  pageSize,
  startTime,
  endTime,
  pageNum,
  batchNum: batchNum=null
}) {
  let url = '/result/pagedata'
  let params = { pageSize, startTime, endTime, pageNum, batchNum }
  return axios.post(url,params)
}

export default {
  uploadXLSX,
  getList
};
