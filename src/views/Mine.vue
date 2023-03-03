//mine页面
<template>
  <div class="mine-box">
    <div class="mine-title">我的页面</div>
    <button class="mine-btn" @click="goToHome">前往首页</button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goToHome() {
  router.push("/home");
}
</script>
<style></style>
