
import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { theme } from '@/services/install';
import { getThemeFiles, getThemeFile } from '@/services/themeFile';
import { getToken } from '@/services/login';
import { message } from 'antd';
import { isBrowser } from 'umi';

export interface GlobalModelState {
  httpStatus: {
    status: number,
    code: number,
    msg: string
  },
  visible: boolean,
  loginVisible: boolean,
  token: string;
  type: string;
  moreType: string; // 主题设置编辑列下
  name: string;
  activeFile: string;
  fileData: Object;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    installTheme: Effect,
    signIn: Effect,
    signOut: Effect
  };
  reducers: {
    toggleVisable: Reducer<GlobalModelState>;
    saveState: Reducer<GlobalModelState>;
    toggleLogin: Reducer<GlobalModelState>;
  },
  subscriptions: {

  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    httpStatus: {
      status: 0,
      code: 0,
      msg: '',
    },
    visible: false,
    loginVisible: false,
    token: '',
    type: '',
    moreType: '',
    name: '',
    activeFile: '',
    fileData: {},
  },
  effects: {
    *installTheme({ payload: { data } }, { call, put }) {
      const result = yield call(theme, data)

      if (result.status === 401) {
        yield put({
          type: "saveState",
          payload: {
            httpStatus: {
              status: 401,
              msg: '用户没有权限（令牌、用户名、密码错误）',
            }
          }
        })
      }

      if (result.code === 1) {
        yield put({
          type: "saveState",
          payload: {
            httpStatus: {
              status: 200,
              code: result.code,
              msg: result.msg,
            },
            data: result.data
          }
        })
      }
    },
    *signIn({ payload: { data } }, { call, put }) {
      const result = yield call(getToken, data)
      if (result.code === 0) {
        message.error(result.msg)
        return
      }

      message.success("登录成功！")
      const { data: tokenData } = result
      localStorage.setItem('token', JSON.stringify(result.data))
      yield put({
        type: "saveState",
        payload: {
          token: tokenData.token,
          loginVisible: false,
        }
      })

      yield put({
        type: "user/fetchUser"
      })

    },
    *signOut({ payload }, { call, put }) {
      if (isBrowser()) {
        localStorage.removeItem("token")
        yield put({
          type: "saveState",
          payload: {
            token: ''
          }
        })

        yield put({
          type: "user/saveState",
          payload: {
            data: {}
          }
        })
        message.success("退出登录")
      }
    }
  },
  reducers: {
    toggleVisable(state: any, {payload}): GlobalModelState {
      const visible: Boolean = state.visible ? false : true
      return {
        ...state,
        ...payload,
        visible
      }
    },
    saveState(state: any, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload
      }
    },
    toggleLogin(state: any): GlobalModelState {
      const loginVisible: Boolean = state.loginVisible ? false : true
      return {
        ...state,
        loginVisible,
      }
    },
  },
  subscriptions: {

  },
};

export default GlobalModel;