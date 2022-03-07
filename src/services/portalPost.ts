import { authRequest, request } from '@/utils/request';

export const getPosts = (current = 1, pageSize = 10, data: any) => {
  return request(`/api/v1/app/portal/list/cid/?current=${current}&pageSize=${pageSize}`, {
    method: 'POST',
    data
  });
};

export const getPost = (id: Number, type: Number) => {
  return request(`/api/v1/app/portal/post/${id}`, {
    method: 'GET',
    params: { type },
  });
};

/*
 *@Author: frank
 *@Date: 2022-02-13 09:17:47
 *@Description: 点赞文章
*/
export const like = (id: Number) => {
  return authRequest(`/api/v1/app/portal/post/like/${id}`, {
    method: 'GET',
  });
};

/*
 *@Author: frank
 *@Date: 2022-02-23 12:24:33
 *@Description: 判断当前用户是否已经点赞
*/

export const isLike = (id: Number) => {
  return authRequest(`/api/v1/app/portal/post/is_like/${id}`, {
    method: 'GET',
  });
};

/*
 *@Author: frank
 *@Date: 2022-02-13 09:17:47
 *@Description: 收藏文章
*/
export const favorite = (id: Number) => {
  return authRequest(`/api/v1/app/portal/post/favorite/${id}`, {
    method: 'GET',
  });
};

/*
 *@Author: frank
 *@Date: 2022-02-23 12:24:33
 *@Description: 判断当前用户是否已经点赞
*/

export const isFavorite = (id: Number) => {
  return authRequest(`/api/v1/app/portal/post/is_favorite/${id}`, {
    method: 'GET',
  });
};

/*
 *@Author: frank
 *@Date: 2022-02-26 21:22:13
 *@Description: 获取评论列表
*/
export const comment = (id: Number,type:Number = 0) => {
  return authRequest(`/api/v1/app/comment/${id}`, {
    method: 'GET',
  });
}