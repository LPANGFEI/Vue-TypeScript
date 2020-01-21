<template>
    <div class="layout">
        <!-- 头部 -->
        <LayoutHeader />
        <!-- 内容 -->
        <Content>
            <Sidebar slot="left"></Sidebar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
</template>

<script lang='ts'>
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "../../components/layout/LayoutHeader.vue";
import Content from "../../components/layout/Content.vue";
import Sidebar from "../../components/layout/Sidebar.vue";

@Component({
    components: {
        LayoutHeader,
        Content,
        Sidebar
    }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #f5f7f9;
}
</style>
