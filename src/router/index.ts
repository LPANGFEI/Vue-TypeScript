import Vue from "vue";
import VueRouter from "vue-router";
import jwtDecode from "jwt-decode";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to: any, form: any, next: any) => {
	const isLogin = localStorage.tsToken ? true : false;
	// meta标识的路由需要登陆token
	if (to.meta.requireAuth) {
		// 是否登陆有token
		if (isLogin) {
			const decoded: any = jwtDecode(localStorage.tsToken);
			const { key } = decoded;
			// 权限判断
			if (hasPermission(key, to)) {
				next();
			} else {
				// 没有权限
				next("/404");
			}
		} else {
			// 返回登陆
			next({
				path: "/login",
				// 将跳转的路由path作为参数，登录成功后跳转重定向到该路由
				query: {
					redirect: to.fullPath
				}
			});
		}
		// 其他可登录
	} else {
		next();
	}
});

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

export default router;
