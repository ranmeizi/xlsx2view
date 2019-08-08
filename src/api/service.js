import axios from './';


function uploadXLSX(params) {
  return uploadXLSX.post('/input/xlsx2db', params)
}