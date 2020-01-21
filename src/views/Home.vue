<template>
    <div class="home">
        <div class="home-body">
            <h3 class="title">嗨，{{user.username}}！</h3>
            <p class="des">欢迎来到LPANGFEI的Vue.js+TypeScript后台管理系统Demo</p>
        </div>
    </div>
</template>

<script lang='ts'>
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
    components: {}
})
export default class Home extends Vue {
    // 获取vuex中保存的用户信息
    @Getter("user") user: any;
}
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpg) no-repeat;
    background-size: 100% 100%;
    .home-body {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        text-align: center;
        padding: 100px;
        box-sizing: border-box;
        .title {
            font-size: 32px;
            font-weight: bold;
            line-height: 60px;
        }
        .des {
            font-size: 24px;
            margin: 40px 0;
        }
    }
}
</style>
