<template>
    <el-container class="layout-content">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <slot name="left"></slot>
        </el-aside>
        <!-- 右侧页面 -->
        <el-main>
            <!-- 面包屑 -->
            <div class="top">
                <i class="el-icon-s-home"></i>
                <el-breadcrumb class="breadcrumb" separator="/">
                    <el-breadcrumb-item  v-for="(item,index) in breadCrumbItems" :key='index' :to="{path:item.path}">{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 页面内容 -->
            <div class="content">
                <slot name="content"></slot>
            </div>
        </el-main>
    </el-container>
</template>

<script lang='ts'>
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
    components: {}
})
export default class Content extends Vue {
    // 面包屑数组
    @Provide() breadCrumbItems:any;

    @Watch('$route') handleRouteChange(to:any):void{
        this.initBreadCrumbItems(to);
    }

    initBreadCrumbItems(router:any):void{
        // 跟路由title
        let breadCrumbItems:any[] = [{path:'/',title:'后台管理系统'}];

        // 遍历父级到当前路由的所有path和title，存储到数组里
        for(let item of router.matched){
            if(item.meta && item.meta.title){
                breadCrumbItems.push({
                    path:item.path ? item.path : '/',
                    title:item.meta.title,
                })
            }
        }
        this.breadCrumbItems = breadCrumbItems;
    }

    // 页面刷新保证面包屑依然存在
    created(){
        this.initBreadCrumbItems(this.$route)
    }
}
</script>

<style lang="scss" scoped>
.layout-content {
    width: 100%;
    height: 100%;
    .el-main {
        padding: 0;
        .top {
            background: #fff;
            height: 54px;
            border-right: none;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            align-items: center;
            i {
                font-size: 20px;
                cursor: pointer;
                padding-left: 16px;
            }
            .breadcrumb {
                padding-left: 16px;
            }
        }
        .content {
            padding: 10px;
            height: calc(100% - 55px);
            box-sizing: border-box;
        }
    }
}
</style>
