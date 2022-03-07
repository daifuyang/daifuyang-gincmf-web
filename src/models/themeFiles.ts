import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { getThemeFiles, getThemeFile } from '@/services/themeFile';

export interface ThemeFilesModelState {
    headerData: object;
    footerData: Object;
}

export interface ThemeFilesModelType {
    namespace: 'themeFiles';
    state: ThemeFilesModelState;
    effects: {
        fetchPublic: Effect,
    },
    reducers: {
        saveState: Reducer<ThemeFilesModelState>;
    },
}

const ThemeFilesModel: ThemeFilesModelType = {
    namespace: 'themeFiles',
    state: {
        headerData: {},
        footerData: {}
    },
    effects: {
        *fetchPublic({ payload }, { call, put }) {
            let headerData = {}, footerData = {}
            const result = yield call(getThemeFiles, payload)
            if (result.code === 1) {
                result?.data?.forEach((item: any) => {
                    if (item.more_json?.file === 'public/header') {
                        headerData = { ...item.more_json, id: item.id };
                    } else if (item.more_json?.file === 'public/footer') {
                        footerData = { ...item.more_json, id: item.id };
                    }
                });
            }

            yield put({
                type: "saveState",
                payload: {
                    headerData,
                    footerData
                }
            })
        }
    },
    reducers: {
        saveState(state: any, { payload }): ThemeFilesModelState {
            return {
                ...state,
                ...payload
            }
        },
    }
}

export default ThemeFilesModel;