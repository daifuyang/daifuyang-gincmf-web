import { ssrRequest } from '@/utils/request';
export const getThemeFiles = (params = {}) => {
  return ssrRequest(`/api/v1/app/portal/theme_files`, {
    method: 'GET',
    params
  });
};
