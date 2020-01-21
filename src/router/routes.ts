/**
* hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
* name:'router-name'             路由名称，必须填写
* meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式
    requireAuth: true            对应路由的路由守卫
  }
**/
const routes = [
	{
		path: "/",
		name: "dashboard",
		component: () => import("@/views/layout/Layout.vue"),
		hidden: true,
		redirect: "/home",
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/Home.vue"),
				meta: {
					title: "首页",
					icon: "el-icon-s-home",
					requireAuth: true
				}
			}
		]
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/Login.vue"),
		hidden: false,
		meta: {
			title: "系统登陆",
			requireAuth: false
		}
	},
	{
		path: "/password",
		name: "password",
		component: () => import("@/views/login/Password.vue"),
		hidden: false,
		meta: {
			title: "找回密码",
			requireAuth: false
		}
	},
	{
		path: "/dataManage",
		name: "dataManage",
		component: () => import("@/views/layout/Layout.vue"),
		hidden: true,
		meta: {
			title: "数据管理",
			icon: "el-icon-s-operation",
			requireAuth: true
		},
		redirect: "/tableData",
		children: [
			{
				path: "/tableData",
				name: "tableData",
				component: () => import("@/views/dataManage/TableData.vue"),
				meta: {
					title: "表格管理",
					icon: "el-icon-s-unfold",
					requireAuth: true
				}
			},
			{
				path: "/chartsData",
				name: "chartsData",
				component: () => import("@/views/dataManage/ChartsData.vue"),
				meta: {
					title: "图表管理",
					icon: "el-icon-s-data",
					requireAuth: true
				}
			},
			{
				path: "/formData",
				name: "formData",
				component: () => import("@/views/dataManage/FormData.vue"),
				meta: {
					title: "表单管理",
					icon: "el-icon-s-order",
					roles: ["admin", "editor"],
					requireAuth: true
				}
			}
		]
	},
	{
		path: "/userManage",
		name: "userManage",
		component: () => import("@/views/layout/Layout.vue"),
		hidden: true,
		redirect: "/accountData",
		children: [
			{
				path: "/accountData",
				name: "accountData",
				component: () => import("@/views/userManage/AccountData.vue"),
				meta: {
					title: "账户管理",
					icon: "el-icon-s-custom",
					roles: ["admin"],
					requireAuth: true
				}
			}
		]
	},
	{
		path: "/user",
		name: "user",
		component: () => import("@/views/layout/Layout.vue"),
		hidden: false,
		redirect: "/userInfo",
		children: [
			{
				path: "/userInfo",
				name: "userInfo",
				component: () => import("@/views/userManage/UserInfo.vue"),
				meta: {
					title: "个人中心",
					requireAuth: true
				}
			}
		]
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/404.vue"),
		hidden: false,
		meta: {
			title: "404",
			requireAuth: true
		}
	},
	{
		path: "*",
		redirect: "/404",
		meta: {
			requireAuth: false
		}
	}
];

export default routes;
