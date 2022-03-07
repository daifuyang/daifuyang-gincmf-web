import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';

import { comment } from '@/services/portalPost';
import { message } from 'antd';

import { addComment, addReply, like, replyLike } from '@/services/comment';

export interface CommentModelState {
    postId: string,
    current: number,
    page_size: number,
    total: number,
    data: [],
    replyActive: string,
    replyContent: string,
}

export interface CommentModelType {
    namespace: 'comment';
    state: CommentModelState;
    effects: {
        fetchData: Effect,
        toggleLike: Effect,
        toggleReplyLike: Effect,
        addComment: Effect,
        addReply: Effect,
    },
    reducers: {
        saveState: Reducer<CommentModelState>;
        updateCommentItem: Reducer<CommentModelState>;
        updateReplyItem: Reducer<CommentModelState>;
    },
}

const PostModel: CommentModelType = {
    namespace: 'comment',
    state: {
        postId: "",
        current: 1,
        page_size: 10,
        total: 0,
        data: [],
        replyActive: '',
        replyContent: '',
    },
    effects: {
        *fetchData({ payload: { id, type = 0 } }, { call, put }) {
            const result = yield call(comment, id, type)
            if (result.code === 1) {
                yield put({
                    type: 'saveState',
                    payload: {
                        postId: id,
                        ...result.data
                    }
                })
            }
        },
        *toggleLike({ payload: { id, index } }, { call, put }) {
            const result = yield call(like, id)
            if (result.code === 1) {
                message.success(result.msg)
                const { data = {} } = result
                yield put({
                    type: "updateCommentItem",
                    payload: {
                        index,
                        data
                    }
                })
                return
            }
            message.error(result.msg)
        },
        *addComment({ state, payload: { top_id, content, topic_type = 0 } }, { call, put, select }) {

            const result = yield call(addComment, top_id, {
                content,
                topic_type
            })

            if (result.code === 0) {
                message.error(result.error)
                return
            }

            const postId = yield select((state: any) => state.comment.postId)
            yield put({
                type: "fetchData",
                payload: {
                    id: postId
                }
            })
            
        },

        *addReply({ state, payload: { id, content, current = "", reply_type = 0, to_user_id = "" } }, { call, put, select }) {
            const result = yield call(addReply, id, {
                content,
                reply_type,
                to_user_id
            })
            if (result.code === 0) {
                message.error(result.error)
                return
            }

            message.success(result.msg)

            yield put({
                type: "saveState",
                payload: {
                    replyActive: '',
                    replyContent: '',
                }
            })

            // const postId = yield select((state: any) => state.comment.postId)
            // yield put({
            //     type: "fetchData",
            //     payload: {
            //         id: postId
            //     }
            // })

        },

        *toggleReplyLike({ payload: { id, index, replyIndex } }, { call, put }) {
            const result = yield call(replyLike, id)
            if (result.code === 1) {
                message.success(result.msg)
                const { data = {} } = result
                yield put({
                    type: "updateReplyItem",
                    payload: {
                        index,
                        replyIndex,
                        data
                    }
                })
                return
            }
            message.error(result.msg)
        }
    },
    reducers: {
        saveState(state: any, { payload }): CommentModelState {
            return {
                ...state,
                ...payload
            }
        },
        updateCommentItem(state: any, { payload: { index, data } }): CommentModelState {
            const commentData: any = JSON.parse(JSON.stringify(state.data))
            const { is_like = 0, post_like = 0 } = data
            console.log("data", data)
            commentData[index].is_like = is_like
            commentData[index].post_like = post_like
            console.log("commentData", commentData)
            return {
                ...state,
                data: commentData
            }
        },
        updateReplyItem(state: any, { payload: { index, replyIndex, data } }): CommentModelState {
            const commentData: any = JSON.parse(JSON.stringify(state.data))
            const { comment_reply = [] } = commentData[index]
            const { is_like = 0, post_like = 0 } = data
            comment_reply[replyIndex].is_like = is_like
            comment_reply[replyIndex].post_like = post_like
            return {
                ...state,
                data: commentData
            }
        }
    }
}

export default PostModel;