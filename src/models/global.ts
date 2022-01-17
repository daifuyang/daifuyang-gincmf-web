
import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';

export interface GlobalModelState {
  visible: Boolean,
  token: string;
  type: string;
  name: string;
  data: any;
  headerData: object;
  footerData: Object;
  routes: [];
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {

  };
  reducers: {
    toggerVisable: Reducer<GlobalModelState>;
    saveState: Reducer<GlobalModelState>;
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    visible: false,
    token: '',
    type: '',
    name: '',
    routes: [],
    headerData: {},
    footerData: {},
    data: null,
  },
  effects: {

  },
  reducers: {
    toggerVisable(state: any): GlobalModelState {
      const visible: Boolean = state.visible ? false : true
      return {
        ...state,
        visible
      }
    },
    saveState(state: any, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload
      }
    },
  }
};

export default GlobalModel;