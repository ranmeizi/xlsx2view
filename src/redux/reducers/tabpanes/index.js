import * as ActionTypes from '../../constants/tabpanes';
import { dropByCacheKey, getCachingKeys } from 'react-router-cache-route';

// Tab签的默认值
const initialPanes = [
  {
    title: 'homepage',
    key: '/homepage',
    closable: false
  }
];

const initialState = {
  //tab 数组
  panes: initialPanes,
  // 记录各种操作前的panes
  lastPanes: [],
  //tab 活动页key
  activeKey: initialPanes[0].key
};
console.log('初始化');
console.log(initialState);
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // 增加一个Tab页
    case ActionTypes.PUSH_TAB_LIST:
      //检查是否有这个key
      if (state.panes.some(item => item.key === action.tabItem.key)) {
        //有
        push(action.tabItem.key);
        return { ...state, activeKey: action.tabItem.key };
      } else {
        //没有
        //推一个tab
        let arr = [...state.panes];
        arr.push(action.tabItem);
        push(action.tabItem.key);
        return { ...state, panes: arr, activeKey: action.tabItem.key };
      }
    // 删除一个Tab页
    case ActionTypes.REMOVE_TAB_LIST:
      let nextPanes = state.panes.filter(item => item.key !== action.key);
      let activeKey = nextPanes[nextPanes.length - 1].key;
      push(activeKey);
      dropByCacheKey(action.key);
      return { ...state, panes: nextPanes, activeKey };
    // 清空Tab页
    case ActionTypes.CLEAR_TAB_LIST:
      //清空,只保留closable false的页签
      return {
        ...state,
        panes: state.panes.filter(item => item.closable === false)
      };
    // 设置active签
    case ActionTypes.SET_ACTIVE:
      push(action.key);
      return { ...state, activeKey: action.key };
    // 监听哈希值
    case ActionTypes.LISTEN_HASH:
      if (state.panes.some(item => item.key === action.hash)) {
        return { ...state, activeKey: action.hash };
      }
      return { ...state };
    case ActionTypes.HEADER_MENU:
      return { ...state, menuData: action.data };
    // 缓存上一次操作的panes状态
    case ActionTypes.CACHE_PANES:
      return { ...state, lastPanes: [...state.panes] };
    default:
      return state;
  }
}
function push(url) {
  window.location.href =
    window.location.origin + window.location.pathname + '#' + url;
}
