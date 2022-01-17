import { ssrRequest } from '@/utils/request';
export const getPost = (id: Number, type: Number) => {
  return ssrRequest(`/api/v1/app/portal/post/${id}`, {
    method: 'GET',
    params: { type },
  });
};
