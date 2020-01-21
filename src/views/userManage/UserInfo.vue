<template>
  <div class="user-info">
    <div class="img-box">
      <h2 class="title">About me</h2>
      <img :src="require('@/assets/'+user.key+'.jpg')" alt />
      <h4>{{user.username}}</h4>
    </div>
    <div class="info-box">
      <h2 class="title">Account</h2>
      <!-- form -->
      <el-form :model="userData" class="form-box">
        <el-form-item label="用户名">
          <el-input v-model="user.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userData.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="handleSubmit"
            :disabled="!userData.pwd"
            type="primary"
            :loading="isLoad"
          >修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
// 装饰器：对现有的函数或类进行拓展补充
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class UserInfo extends Vue {
  // 获取用户信息
  @Getter("user") user: any;

  // 用户名+密码
  @Provide() userData: {
    username: String;
    pwd: String;
  } = {
    username: "",
    pwd: ""
  };
  // 是都发起网络请求
  @Provide() isLoad: Boolean = false;

  handleSubmit() {
    this.userData.username = this.user.username;
    this.isLoad = true;
    // 发起请求
    (this as any).$http
      .post("/api/users/changePwd", this.userData)
      .then((res: any) => {
        this.isLoad = false;
        (this as any).$message({
          message: res.data.msg,
          type: "success"
        });
      })
      .catch(() => {
        this.isLoad = false;
      });
  }

  created() {
    console.log(this.user);
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  height: calc(100% - 70px);
  display: flex;
  overflow: auto;
  color: #606266;
  .img-box,
  .info-box {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    background: #fff;
    .title {
      border-bottom: 1px solid #dcdfe6;
      padding: 10px;
      text-align: left;
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .img-box {
    text-align: center;
    width: 30%;
    margin-right: 10px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    h4 {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .info-box {
    flex: 1;
    .form-box {
      padding: 10px;
    }
  }
}
</style>
