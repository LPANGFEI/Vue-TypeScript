<template>
	<div class="account-data">
		<div class="add-box">
			<el-button @click="addAccount" type="primary">新增账户</el-button>
		</div>
		<el-table :data="tableData" border style="width:100%">
			<el-table-column label="角色" width="180" align="center">
				<template slot-scope="scope">
					<el-select
						v-if="scope.row.edit"
						v-model="scope.row.role"
						@change="selectChange(scope.row)"
					>
						<el-option
							v-for="option in options"
							:label="option.role"
							:value="option.role"
							:key="option.key"
						></el-option>
					</el-select>
					<span v-else>{{ scope.row.role }}</span>
				</template>
			</el-table-column>
			<el-table-column label="账号" width="180" align="center">
				<template slot-scope="scope">
					<el-input
						v-if="scope.row.edit"
						v-model="scope.row.username"
					></el-input>
					<span v-else>{{ scope.row.username }}</span>
				</template>
			</el-table-column>
			<el-table-column
				prop="des"
				label="描述"
				align="center"
			></el-table-column>
			<el-table-column label="操作" width="180" align="center">
				<template
					slot-scope="scope"
					v-if="scope.row.username != 'admin'"
				>
					<el-button
						v-if="!scope.row.edit"
						size="mini"
						@click="handleEdit(scope.$index, scope.row)"
						>编辑</el-button
					>
					<el-button
						v-else
						type="success"
						size="mini"
						@click="handleSave(scope.$index, scope.row)"
						>完成</el-button
					>

					<el-button
						@click="handleDelete(scope.$index, scope.row)"
						size="mini"
						type="danger"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<AddAccount
			:options="options"
			:dialogVisible="dialogVisible"
			@getData="getData"
			@closeDialog="closeDialog"
		></AddAccount>
	</div>
</template>

<script lang="ts">
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide } from "vue-property-decorator";
import AddAccount from "../../components/userManage/AddAccount.vue";
@Component({
	components: {
		AddAccount
	}
})
export default class AccountData extends Vue {
	@Provide() tableData: any[] = [];
	@Provide() dialogVisible: Boolean = false;
	@Provide() options: any[] = [
		{
			key: "admin",
			role: "管理员",
			des: "Super Administrator. Have access to view all pages."
		},
		{
			key: "editor",
			role: "客服",
			des: "Normal Editor. Can see all pages except permission page"
		},
		{
			key: "visitor",
			role: "游客",
			des:
				"Just a visitor. Can only see the home page and the document page"
		}
	];

	// 用户数据
	getData() {
		(this as any).$http("/api/users/allUsers").then((res: any) => {
			const { datas } = res.data;
			for (let item of datas) {
				item.edit = false;
			}
			this.tableData = datas;
		});
	}

	// 打开弹框
	addAccount() {
		this.dialogVisible = true;
	}

	// 关闭弹框
	closeDialog() {
		this.dialogVisible = false;
	}

	// 选择角色
	selectChange(select: String) {
		this.options.map((option: any) => {
			if (option.role === select) {
				(this as any).account.key = option.key;
				(this as any).account.des = option.des;
			}
		});
	}

	// 编辑
	handleEdit(index: Number, row: any): void {
		row.edit = true;
	}

	// 保存
	handleSave(index: Number, row: any): void {
		(this as any).$http
			.post(`/api/users/editUser/${row._id}`, row)
			.then((res: any) => {
				this.$message({
					message: res.data.msg,
					type: "success"
				});
				row.edit = false;
			});
	}

	// 删除
	handleDelete(index: Number, row: any): void {
		(this as any).$http
			.delete(`/api/users/deleteUser/${row._id}`)
			.then((res: any) => {
				this.$message({
					message: res.data.msg,
					type: "success"
				});
				(this as any).tableData.splice(index, 1);
			})
			.catch((err: any) => {
				this.$message({
					message: err,
					type: "error"
				});
			});
	}

	created() {
		this.getData();
	}
}
</script>

<style lang="scss" scoped>
.account-data {
	height: 100%;
	overflow: auto;
	.add-box {
		margin-bottom: 10px;
	}
}
</style>
