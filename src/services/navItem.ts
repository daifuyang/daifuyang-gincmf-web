import { authRequest, request } from '@/utils/request';

export const navAdminItems = (data: any) => {
    return authRequest(`/api/v1/admin/portal/nav_items`, {
        method: 'POST',
        data,
    });
};

export const navItems = (id: number) => {
    return request(`/api/v1/app/portal/nav_items/${id}`, {
        method: 'GET'
    });
};
