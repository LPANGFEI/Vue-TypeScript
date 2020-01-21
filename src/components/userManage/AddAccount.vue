<template>
	<el-dialog
		title="新增账户"
		:visible.sync="dialogVisible"
		:close-on-click-modal="false"
		:show-close="false"
		width="30%"
	>
		<el-form
			:rules="rules"
			ref="ruleForm"
			:model="account"
			class="form-box"
			label-width="100px"
		>
			<el-form-item label="请选择角色" prop="role">
				<el-select
					@change="selectChange"
					v-model="account.role"
					placeholder="请选择角色"
				>
					<el-option
						v-for="option in options"
						:label="option.role"
						:value="option.role"
						:key="option.key"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="请输入账号" prop="username">
				<el-input
					v-model="account.username"
					placeholder="请输入账号"
				></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('closeDialog')">取消</el-button>
			<el-button @click="handleAdd" type="primary">确定</el-button>
		</span>
	</el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Emit } from "vue-property-decorator";

@Component({
	components: {}
})
export default class AddAccount extends Vue {
	// @Emit("closeDialog")

	// prop
	@Prop(Boolean) dialogVisible!: boolean;
	@Prop(Array) options!: any;

	@Provide() account: {
		key: String;
		role: String;
		username: String;
		des: String;
	} = {
		key: "",
		role: "",
		username: "",
		des: ""
	};

	@Provide() rules: {
		username: any[];
		role: any[];
	} = {
		username: [{ required: true, message: "请输入账号", trigger: "blur" }],
		role: [{ required: true, message: "请选择角色", trigger: "change" }]
	};

	// 获取数据
	selectChange(select: String) {
		this.options.map((option: any) => {
			if (option.role === select) {
				(this as any).account.key = option.key;
				(this as any).account.des = option.des;
			}
		});
	}

	// 添加
	handleAdd() {
		// console.log(this.account);
		(this as any).$refs["ruleForm"].validate((valid: Boolean) => {
			if (valid) {
				(this as any).$http
					.post("/api/users/addUser", this.account)
					.then((res: any) => {
						this.$message({
							message: res.data.msg,
							type: "success"
						});
						this.$emit("closeDialog");
						this.$emit("getData");
					})
					.catch((err: any) => {
						console.log(err);
						this.$message({
							message: err,
							type: "error"
						});
						this.$emit("closeDialog");
						this.$emit("getData");
					});
			}
		});
	}
}
</script>

<style lang="scss" scoped>
.form-box {
	.el-input,
	.el-select {
		width: 200px !important;
	}
}
</style>
