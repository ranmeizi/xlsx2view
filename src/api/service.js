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
function searchDetail({ batch: batch = null }) {
  let url = '/statistics/searchDetail';
  let params = { batch };
  return axios.post(url, params);
}
function getAllOfBatchs() {
  let url = '/result/batchSelect';
  let params = {};
  return axios.get(url, { params });
}
// 获取图表数据
function getChartData({ batchs: batchs = [] }) {
  let url = '/statistics/getChartData';
  let params = { batchs };
  return axios.post(url, params);
}
// 获取单场分析数据
function getSingleField({
  statTable: statTable = '', // 种类
  batch: batch = '' // 批次号
}) {
  let url = '/statistics/getSingleField';
  let params = { statTable, batch };
  return axios.post(url, params);
}
// 删除batch
function deleteBatch({ batchs: batchs = [] }) {
  let url = '/result/deleteBatch';
  let params = { batchs };
  return axios.post(url, params);
}

export default {
  uploadXLSX, //上传excel
  getList, //翻页表格
  getAllOfBatchs, //获取batch下拉列表值
  getTestLineS, //ceshi
  getAvailableBatchNum, //检查批次号是否重复
  getRptList, //翻页卡片
  searchDetail, //查询统计详情
  getChartData, //获取图表数据
  getSingleField, //获取单场分析数据
  deleteBatch //删除数据
};
