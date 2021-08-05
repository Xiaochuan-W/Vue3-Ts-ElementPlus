<template>
  <div :class="{'has-logo':showLogo}">
    <Logo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useStore, mapState } from 'vuex';
import {Logo,SidebarItem} from './component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const sidebar = computed(()=>store.state.app.sidebar);
const showLogo = computed(()=>store.state.settings.sidebarLogo);
const routes = computed(()=>store.state.user.routes);
const activeMenu = computed(()=>{
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const isCollapse = computed(()=>!sidebar.value.opened);

</script>
