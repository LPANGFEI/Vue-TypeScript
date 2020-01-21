<template>
	<div class="table-data">
		<div class="search-box">
			<el-input
				size="small"
				v-model="searchVal"
				placeholder="请输入课程名称检索"
			></el-input>
			<el-button
				size="small"
				type="primary"
				icon="el-icon-search"
				@click="handleSearch"
				>搜索</el-button
			>
		</div>
		<el-table
			:data="tableData"
			border
			fit
			stripe
			style="width:100%"
			:height="tHeight"
			class="table-box"
		>
			<el-table-column
				type="index"
				label="序号"
				align="center"
				width="50px"
			></el-table-column>
			<el-table-column
				label="课程名称"
				prop="title"
				align="center"
			></el-table-column>
			<el-table-column
				label="课程等级"
				prop="level"
				align="center"
			></el-table-column>
			<el-table-column
				label="技术栈"
				prop="type"
				align="center"
			></el-table-column>
			<el-table-column
				label="报名人数"
				prop="count"
				align="center"
			></el-table-column>
			<el-table-column
				label="上线日期"
				prop="date"
				align="center"
			></el-table-column>
			<el-table-column
				v-if="user.key != 'visitor'"
				label="操作"
				align="center"
			>
				<template slot-scope="scope">
					<el-button
						@click="handleEdit(scope.$index, scope.row)"
						size="mini"
						>编辑</el-button
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
		<div class="pages" ref="page-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[5, 10, 20]"
				:page-size="size"
				layout="total,sizes,prev,pager,next,jumper"
				:total="total"
			></el-pagination>
		</div>
		<EditDialog
			:dialogVisible="dialogVisible"
			:form="formData"
			@closeDialog="closeDialog"
		/>
	</div>
</template>

<script lang="ts">
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";
import EditDialog from "../../components/dataManage/EditDialog.vue";

@Component({
	components: {
		EditDialog
	}
})
export default class TableData extends Vue {
	// 用户信息
	@Getter("user") user: any;
	// 搜索框
	@Provide() searchVal: String = "";
	// 表格高度
	@Provide() tHeight: Number = document.body.offsetHeight - 270;
	// 表格数据
	@Provide() tableData: any[] = [];
	// 页数
	@Provide() page: Number = 1;
	// 条数
	@Provide() size: Number = 5;
	// 总数
	@Provide() total: Number = 0;
	// 弹出框
	@Provide() dialogVisible: Boolean = false;
	// 弹出框数据
	@Provide() formData: {
		title: String;
		type: String;
		level: String;
		count: String;
		date: String;
	} = {
		title: "",
		type: "",
		level: "",
		count: "",
		date: ""
	};

	// 请求接口数据
	loadData() {
		(this as any)
			.$http(`/api/profiles/loadMore/${this.page}/${this.size}`)
			.then((res: any) => {
				const { list, total } = res.data.data;
				this.tableData = list;
				this.total = total;
			});
	}

	// 获取搜索数据
	loadSearchData() {
		(this as any)
			.$http(
				`/api/profiles/search/${this.searchVal}/${this.page}/${this.size}`
			)
			.then((res: any) => {
				const { list, total } = res.data.datas;
				this.tableData = list;
				this.total = total;
			});
	}

	handleSearch(): void {
		this.page = 1;
		this.searchVal ? this.loadSearchData() : this.loadData();
	}

	// 条数
	handleSizeChange(val: Number): void {
		this.size = val;
		this.page = 1;
		this.searchVal ? this.loadSearchData() : this.loadData();
	}

	// 页数
	handleCurrentChange(val: Number): void {
		this.page = val;
		this.searchVal ? this.loadSearchData() : this.loadData();
	}

	// 编辑
	handleEdit(index: Number, row: any): void {
		this.formData = row;
		this.dialogVisible = true;
	}

	// 删除
	handleDelete(index: Number, row: any): void {
		(this as any).$http
			.delete(`/api/profiles/delete/${row._id}`)
			.then((res: any) => {
				this.$message({
					message: res.data.msg,
					type: "success"
				});
				(this as any).tableData.splice(index, 1);
			});
	}

	// 关闭弹框
	closeDialog() {
		this.dialogVisible = false;
	}

	created() {
		this.loadData();
	}
}
</script>

<style lang="scss" scoped>
.table-data {
	height: 100%;
	.table-box {
		font-size: 14px;
	}
	.pages {
		background: #fff;
		margin-top: 10px;
		padding: 10px 10px;
		text-align: right;
		height: 55px;
		box-sizing: border-box;
	}
	.search-box {
		background: #fff;
		margin-bottom: 10px;
		padding: 10px 10px;
		border-radius: 4px;
		height: 55px;
		box-sizing: border-box;
		.el-input {
			width: 200px;
			margin-right: 10px;
		}
	}
}
</style>
