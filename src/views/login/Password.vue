<template>
    <div class="password">
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
                    <h3>找回密码</h3>
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
                <el-form-item prop="email">
                    <el-input
                        type="text"
                        v-model="ruleForm.email"
                        auto-complete="off"
                        placeholder="邮箱："
                    >
                        <i slot="prefix" class="el-icon-message"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        style="width:100%;"
                        :loading="isLoading"
                        @click.native.prevent="handleSubmit"
                    >确定</el-button>
                </el-form-item>
            </el-form>
        </LoginHeader>
    </div>
</template>

<script lang='ts'>
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide } from "vue-property-decorator";
import LoginHeader from "../../components/login/LoginHeader.vue";
@Component({
    components: {
        LoginHeader
    }
})
export default class Password extends Vue {
    // 是否发起网络请求
    @Provide() isLoading: Boolean = false;
    @Provide() ruleForm: {
        username: String;
        email: String;
    } = {
        username: "",
        email: ""
    };
    @Provide() rules: {
        username: Object;
        email: Object;
    } = {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        email: [
            {
                required: true,
                message: "请输入邮箱地址",
                trigger: "blur"
            },
            {
                type: "email",
                message: "邮箱格式错误",
                trigger: "blur,change"
            }
        ]
    };

    handleSubmit(): void {
        (this.$refs["ruleForm"] as any).validate((valid: Boolean) => {
            if (valid) {
                this.isLoading = true;
                (this as any).$http
                    .post("/api/users/findPwd", this.ruleForm)
                    .then((res: any) => {
                        this.isLoading = false;
                        (this as any).$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        this.$router.push("/login");
                    })
                    .catch(() => {
                        this.isLoading = false;
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
</style>
