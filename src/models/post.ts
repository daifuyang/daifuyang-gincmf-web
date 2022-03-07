import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';

import { getPost, like, isLike, isFavorite, favorite } from '@/services/portalPost';
import { message } from 'antd';
import { isBrowser } from 'umi';

export interface PostModelState {
    data: {},
    isLike: Boolean,
    isFavorite: Boolean
}

export interface PostModelType {
    namespace: 'post';
    state: PostModelState;
    effects: {
        fetchData: Effect,
        fetchIsLike: Effect,
        toggleLike: Effect,
        toggleFavorite: Effect
    },
    reducers: {
        saveState: Reducer<PostModelState>;
    },
}

const PostModel: PostModelType = {
    namespace: 'post',
    state: {
        data: {},
        isLike: false,
        isFavorite: false,
    },
    effects: {
        *fetchData({ payload: { id } }, { call, put }) {
            const result = yield call(getPost, id, 1)
            if (result.code === 1) {
                // 查询当前用户是否点赞
                yield put({
                    type: 'fetchIsLike',
                    payload: {
                        id
                    }
                })

                yield put({
                    type: 'saveState',
                    payload: {
                        data: result.data
                    }
                })
            }
        },
        *toggleLike({ payload: { id } }, { call, put }) {
            const result = yield call(like, id)
            if (result.code === 1) {
                message.success(result.msg)
                yield put({
                    type: 'fetchData',
                    payload: {
                        id
                    }
                })
                return
            }
            message.error(result.msg)
        },
        *toggleFavorite({ payload: { id } }, { call, put }) {
            const result = yield call(favorite, id)
            if (result.code === 1) {
                message.success(result.msg)
                yield put({
                    type: 'fetchData',
                    payload: {
                        id
                    }
                })
                return
            }
            message.error(result.msg)
        },
        *fetchIsLike({ payload: { id } }, { call, put }) {
            if (isBrowser()) {
                const tokenStr = localStorage?.getItem('token')
                if (tokenStr) {
                    const result = yield call(isLike, id)
                    if (result.code === 1) {
                        yield put({
                            type: 'saveState',
                            payload: {
                                isLike: result.data ? true : false
                            }
                        })
                    }

                    const fResult = yield call(isFavorite, id)
                    if (fResult.code === 1) {
                        yield put({
                            type: 'saveState',
                            payload: {
                                isFavorite: fResult.data ? true : false
                            }
                        })
                    }
                }
            }

        }
    },
    reducers: {
        saveState(state: any, { payload }): PostModelState {
            return {
                ...state,
                ...payload
            }
        },
    }
}

export default PostModel;