<template>
  <div class="home-box">
    <div class="home-title">首页页面</div>
    <button class="home-btn" @click="goToMine">前往我的页面</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function goToMine() {
  router.push("/mine");
}
</script>

<style></style>