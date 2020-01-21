<template>
	<div class="login">
		<LoginHeader>
			<el-form
				:rules="rules"
				:model="ruleForm"
				ref="ruleForm"
				label-position="left"
				label-width="0px"
				slot="container"
			>
				<div class="title">
					<h3>账号密码登陆</h3>
				</div>
				<el-form-item prop="username">
					<el-input
						type="text"
						v-model="ruleForm.username"
						auto-complete="off"
						placeholder="账号："
					>
						<i slot="prefix" class="el-icon-user"></i>
					</el-input>
				</el-form-item>
				<el-form-item prop="pwd">
					<el-input
						type="password"
						v-model="ruleForm.pwd"
						auto-complete="off"
						placeholder="密码："
					>
						<i slot="prefix" class="el-icon-lock"></i>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						style="width:100%;"
						:loading="isLogin"
						@click.native.prevent="handleSubmit"
						>登陆</el-button
					>
				</el-form-item>
				<el-form-item>
					<el-checkbox
						v-model="ruleForm.autoLogin"
						:checked="ruleForm.autoLogin"
						>7天内自动登陆</el-checkbox
					>
					<el-button
						type="text"
						class="forget"
						@click="$router.push('/password')"
						>忘记密码?</el-button
					>
				</el-form-item>
			</el-form>
		</LoginHeader>
	</div>
</template>

<script lang="ts">
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import LoginHeader from "../../components/login/LoginHeader.vue";

// 组件
@Component({
	components: {
		LoginHeader
	}
})
export default class Login extends Vue {
	// 存储用户信息
	@Action("setUser") setUser: any;

	// 属性
	@Provide() isLogin: Boolean = false;
	@Provide() ruleForm: {
		username: String;
		pwd: String;
		autoLogin: Boolean;
	} = {
		username: "",
		pwd: "",
		autoLogin: true
	};
	@Provide() rules: {
		username: Object;
		pwd: Object;
	} = {
		username: [{ required: true, message: "请输入账号", trigger: "blur" }],
		pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
	};

	handleSubmit(): void {
		(this.$refs["ruleForm"] as any).validate((valid: Boolean) => {
			if (valid) {
				this.isLogin = true;
				(this as any).$http
					.post("/api/users/login", this.ruleForm)
					.then((res: any) => {
						this.isLogin = false;
						this.$message({
							message: res.data.msg,
							type: "success"
						});
						// 存储token
						localStorage.setItem("tsToken", res.data.token);
						// 存储到Vuex中
						this.setUser(res.data.token);
						// 路由跳转
						if (this.$route.query.redirect) {
							// 重定向
							this.$router.push(
								(this as any).$route.query.redirect
							);
						} else {
							this.$router.push("/");
						}
					})
					.catch(() => {
						this.isLogin = false;
					});
			}
		});
	}
}
</script>

<style lang="scss" scoped>
.title {
	margin: 0px auto 40px auto;
	text-align: center;
	color: #505458;
}

i {
	font-size: 14px;
	margin-left: 8px;
}

.forget {
	float: right;
}
</style>
