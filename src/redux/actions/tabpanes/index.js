import * as actionType from '../../constants/tabpanes'

export const addTabList = (tabItem) => ({
    type: actionType.PUSH_TAB_LIST,
    tabItem
})
export const removeTabList = (key) => ({
    type: actionType.REMOVE_TAB_LIST,
    key
})
export const clearTabList = () => ({
    type: actionType.CLEAR_TAB_LIST
})
export const setActiveKey = (key) => ({
    type: actionType.SET_ACTIVE,
    key
})