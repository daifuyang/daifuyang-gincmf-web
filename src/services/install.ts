import { ssrRequest } from '@/utils/request';
/*
 *@Author: frank
 *@Date: 2022-01-15 09:03:24
 *@Description: 安装主题
*/
export const theme = (data: any) => {
    return ssrRequest(`/api/v1/admin/portal/theme`, {
        method: 'post',
        data,
    });
};
