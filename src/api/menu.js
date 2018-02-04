import {zkAxios} from '../commons/axios';

/**
 * 获取菜单数据
 * @param userId
 * @param options
 * @returns {Promise}
 */
export const getMenus = ({userId}, options) => zkAxios.get('/mock/system/menus', {userId}, options);
