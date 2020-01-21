<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script lang="ts">
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
	components: {}
})
export default class App extends Vue {
	// 存储用户信息
	@Action("setUser") setUser: any;
	// 防止刷新丢失用户信息
	created() {
		this.setUser(localStorage.tsToken);
	}
}
</script>

<style lang="scss">
#app {
	width: 100%;
	height: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

.el-popup-parent--hidden {
	padding-right: 0px !important;
}
</style>
