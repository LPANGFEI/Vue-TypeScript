import { ActionTree } from "vuex";
import jwtDecode from "jwt-decode";
import * as types from "./mutation-types";
import routes from "../router/routes";

const actions: ActionTree<any, any> = {
	async setUser({ commit }, user: any) {
		// 解析账户信息
		const decoded: any = jwtDecode(user);
		// 保存账户信息
		commit(types.SET_USER, decoded);
		// 获取账户权限
		const { key } = decoded;
		// 返回当前账户拥有权限的路由
		const accessedRouters = filterRoutes(routes, key);
		commit(types.SET_ROUTES, accessedRouters);
	}
};

/**
 *  递归过滤异步路由表，返回符合用户角色权限的路由表
 *  @param routes 所有路由表
 *  @param roles 当前角色
 */
const filterRoutes = (routes: Array<any>, roles: string): any => {
	const accessedRouters = routes.filter(route => {
		if (hasPermission(roles, routes)) {
			if (route.children && route.children.length) {
				route.children = filterRoutes(route.children, roles);
			}
			return true;
		}
		return false;
	});
	return accessedRouters;
};

/**
 *判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 **/
const hasPermission = (roles: string, route: any): Boolean => {
	// meta.roles是否包含角色的key值，如果包含那么就是有权限
	if (route.meta && route.meta.roles) {
		return route.meta.roles.some(
			(role: string) => role.indexOf(roles) >= 0
		);
	} else {
		// 默认不设置权限
		return true;
	}
};

export default actions;
