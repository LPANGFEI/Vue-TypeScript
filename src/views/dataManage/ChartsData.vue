<template>
	<div class="charts-data">
		<el-tabs type="border-card" v-model="tabPosition">
			<el-tab-pane label="折线图" name="line">
				<Charts :chartData="chartData" chartType="line"></Charts>
			</el-tab-pane>
			<el-tab-pane label="柱状图" name="bar">
				<Charts :chartData="chartData" chartType="bar"></Charts>
			</el-tab-pane>
			<el-tab-pane label="饼图" name="pie">
				<Charts :chartData="chartData" chartType="pie"></Charts>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide } from "vue-property-decorator";
import Charts from "../../components/dataManage/Charts.vue";
@Component({
	components: {
		Charts
	}
})
export default class ChartsData extends Vue {
	@Provide() tabPosition: String = "line";
	@Provide() chartData: {
		xAxisData: String[];
		yAxisData: Number[];
	} = {
		xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]
	};
}
</script>

<style lang="scss" scoped></style>
