import { authRequest } from '@/utils/request';

export const navItemOptions = (navId: number) => {
    return authRequest(`/api/v1/admin/portal/nav_item_options`, {
        method: 'GET',
        params: {
            'nav_id': navId
        }
    });
}

export const navItemUrls = () => {
    return authRequest(`/api/v1/admin/portal/nav_item_urls`, {
        method: 'GET',
    });
}

export const addNavItem = (data: any) => {
    return authRequest(`/api/v1/admin/portal/nav_item`, {
        method: 'POST',
        data
    });
}

export const editNavItem = (id: number, data: any) => {
    return authRequest(`/api/v1/admin/portal/nav_item/${id}`, {
        method: 'POST',
        data
    });
}

export const delNavItem = (id: number) => {
    return authRequest(`/api/v1/admin/portal/nav_item/${id}`, {
        method: 'DELETE',
    });
}