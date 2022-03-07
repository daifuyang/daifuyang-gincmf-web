import { request } from '@/utils/request';
export const getRoutes = () => {
  return request(`/api/v1/app/route`, {
    method: 'GET',
  });
};
