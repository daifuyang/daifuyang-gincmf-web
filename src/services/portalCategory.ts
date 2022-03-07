import { request } from '@/utils/request';
export const getCategory = (id: Number) => {
  return request(`/api/v1/app/portal/list/${id}`, {
    method: 'GET',
  });
};

export const getBreadcrumbs = (id: Number) => {
  return request(`/api/v1/app/portal/breadcrumb/${id}`, {
    method: 'GET',
  });
};

export const getTreesById = (id: Number) => {
  return request(`/api/v1/app/portal/category/trees/${id}`, {
    method: 'GET',
  });
};

