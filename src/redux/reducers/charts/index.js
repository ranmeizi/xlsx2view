import * as ActionTypes from '../../constants/charts';

const initialState = {
  // ↓用于存放batch号的，给页面传参用
  Dash_Financials: [],
  Dash_Attendance: [],
  Dash_TicketTypes: [],
  Dash_PricingTiers: [],
  Sell_ticket: [],
  Income_ticket: [],
  Income_ticket_dataset: [],
  Income_Cartesian: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // 存放对应图表batch数据
    case ActionTypes.SAVE_BATCHS:
      return { ...state, [action.set_name]: action.batchs };
    default:
      return state;
  }
}
