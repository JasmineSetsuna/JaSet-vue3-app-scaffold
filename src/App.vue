<template>
  <!-- comments -->
  <div class="app-bo"></div>
  <!-- <img src="@/assets/img/pic.jpeg" alt="">
  <img src="@img/test.png" alt=""> -->
  <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
  <router-view
    v-if="$route.meta.keepAlive"
    v-slot="{ Component }"
    class="router"
  >
    <keep-alive>
    <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>
<script setup>
</script>
<style>
.app-box {
  background-color: red;
  display: flex;
}
</style>
