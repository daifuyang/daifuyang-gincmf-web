/*
 *@Author: frank
 *@Date: 2022-02-13 08:58:30
 *@Description: 文章详情模型
*/
import { Reducer } from 'redux';
import { Effect } from 'dva';

export interface ArticleModelState {
    data: any;
}

export interface ArticleModelType {
    namespace: 'article';
    state: ArticleModelState;
    effects: {
        togglelike: Effect
    };
    reducers: {
        saveState: Reducer<ArticleModelState>;
    }
}

const GlobalModel: ArticleModelType = {
    namespace: 'article',
    state: {
        data: []
    },
    effects: {
        *togglelike() {

        }
    },
    reducers: {
        saveState(state, { payload }): ArticleModelState {
            return {
                ...state,
                ...payload
            }
        }
    }
}