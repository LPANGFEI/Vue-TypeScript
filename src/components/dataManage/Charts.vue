<template>
	<div
		ref="mychart"
		class="chart"
		:style="{ width: chartWidth, height: chartHeight }"
	></div>
</template>

<script lang="ts">
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
import echarts from "echarts";
@Component({
	components: {}
})
export default class Charts extends Vue {
	// 图表类型 line/bar/pie
	@Prop({ type: String, default: "line" }) readonly chartType!: String;
	@Prop(Object) chartData!: String | null;

	@Provide() chartWidth: String = "";
	@Provide() chartHeight: String = "";

	// 图表宽度和高度
	generatorWidthAndHeight() {
		this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
		this.chartHeight = `${document.body.offsetHeight * 0.7}px`;
	}

	// 判断类型
	drawChart() {
		// 实例echarts对象
		let chart = echarts.init(
			(this as any).$refs.mychart as HTMLCanvasElement
		);
		if (chart === undefined) {
			console.log(`echarts init dom is failed`);
			return;
		}
		switch (this.chartType) {
			case "line":
				chart.setOption((this as any).generatorLineOption());
				break;
			case "bar":
				chart.setOption((this as any).generatorBarOption());
				break;
			case "pie":
				chart.setOption((this as any).generatorPieOption());
				break;
		}
	}

	// 折线图
	generatorLineOption() {
		return {
			title: {
				text: "近一周学习量",
				subtext: "折线图",
				x: "center"
			},
			xAxis: {
				type: "category",
				data: (this as any).chartData.xAxisData
			},
			yAxis: {
				type: "value"
			},
			series: [
				{
					data: (this as any).chartData.yAxisData,
					type: "line",
					smooth: true
				}
			],
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "cross",
					label: {
						backgroundColor: "#6a7985"
					}
				}
			}
		};
	}

	// 柱状图
	generatorBarOption() {
		return {
			title: {
				text: "近一周学习量",
				subtext: "柱状图",
				x: "center"
			},
			xAxis: {
				type: "category",
				data: (this as any).chartData.xAxisData
			},
			yAxis: {
				type: "value"
			},
			series: [
				{
					data: (this as any).chartData.yAxisData,
					type: "bar",
					barWidth: "40%"
				}
			],
			color: ["#3398DB"],
			tooltip: {
				trigger: "axis",
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "5%"
			}
		};
	}

	// 饼图
	generatorPieOption() {
		let pieData = [];
		for (const index in (this as any).chartData.xAxisData) {
			pieData.push({
				value: (this as any).chartData.yAxisData[index],
				name: (this as any).chartData.xAxisData[index]
			});
		}
		return {
			title: {
				text: "近一周学习量",
				subtext: "饼图",
				x: "center"
			},
			tooltip: {
				trigger: "item",
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: "vertical",
				left: "left",
				data: (this as any).chartData.xAxisData
			},
			series: [
				{
					name: "访问来源",
					type: "pie",
					radius: "55%",
					// center: ["50%", "50%"],
					data: pieData,
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)"
						}
					}
				}
			]
		};
	}

	mounted() {
		this.drawChart();
	}

	created() {
		this.generatorWidthAndHeight();
	}
}
</script>

<style lang="scss" scoped></style>
