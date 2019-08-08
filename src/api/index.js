import axios from 'axios';
import { CONFIG } from '../config';
const BASE_URL = CONFIG.SERVER_BASE_URL;

// 默认请求路径
axios.defaults.baseURL = BASE_URL;
// 配置拦截器

export default axios;
