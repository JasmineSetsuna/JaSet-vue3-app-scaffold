<template>
  <!-- comments -->
  <div class="app-box"></div>
  <!-- <img src="@/assets/img/pic.jpeg" alt="">
  <img src="@img/test.png" alt=""> -->
  <router-view
    v-if="!$route.meta.keepAlive"
    v-slot="{ Component }"
    class="router"
  >
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <div class="five item">
    <div class="content-title">测试axios请求数据</div>
    <button type="success" class="home-btn" @click="testAxios">发送请求</button>
    <div class="content-request">{{ renderTest }}</div>
  </div>
</template>
<script setup>
import request from "./utils/http_sample";
import httpRequest from "./utils/http";
import { ref } from "vue";

const renderTest = ref("fjdlskfj");
function httpGet(data, url) {
  return httpRequest({
    url: url,
    method: "get",
    data,
  });
}
// function requestGet(data, url) {
//   return request({
//     url: url,
//     method: "get",
//     data,
//   });
// }
async function testAxios() {
  try {
    let params = {};
    const res = await httpGet(params, "/test");
    renderTest.value = res.data.content;
  } catch (error) {
    console.log(error);
  }

  // try {
  //   let params = {};
  //   const res = await requestGet(params, "/test");
  //   console.log(res);
  //   console.log(res.content);
  //   renderTest.value = res.content;
  // } catch (error) {}
}
</script>
<style>
.app-box {
  background-color: red;
  display: flex;
}
</style>
