import { ssrRequest } from '@/utils/request';
export const getRoutes = () => {
  return ssrRequest(`/api/v1/app/route`, {
    method: 'GET',
  });
};
