<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.app-main{
  height: calc(100vh - 50px);
}
</style>
