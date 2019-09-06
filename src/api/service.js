import axios from './';

function uploadXLSX(params) {
  return axios.post('/input/xlsx2db', params);
}

function getList({
  pageSize, //每页条数
  startTime, //开始时间
  endTime, //结束时间
  pageNum, //当前页
  batchs: batchs = [] //batchs
}) {
  let url = '/result/pagedata';
  let params = { pageSize, startTime, endTime, pageNum, batchs };
  return axios.post(url, params);
}
function getTestLineS() {
  let url = '/statistics/teststand';
  return axios.get(url);
}
function getAvailableBatchNum({
  batch: batch = null //批次号
}) {
  let url = '/input/repeatBatch';
  let params = { batch };
  return axios.get(url, { params });
}
function getRptList({
  current: current = 1 //当前页
}) {
  let url = '/statistics/pagedata';
  let params = { current };
  return axios.post(url, params);
}

export default {
  uploadXLSX, //上传excel
  getList, //翻页表格
  getTestLineS, //ceshi
  getAvailableBatchNum, //检查批次号是否重复
  getRptList //翻页卡片
};
