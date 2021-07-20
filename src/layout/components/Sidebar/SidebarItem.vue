<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <MenuItem :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <MenuItem v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, reactive,ref } from 'vue';
import path from 'path';
import { isExternal } from '@/utils/validate';
import {MenuItem,AppLink} from './component';
import FixiOSBug from './FixiOSBug';

const props = defineProps({
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  });

  let onlyOneChild = ref(null);

  const hasOneShowingChild = (children:Array<any> = [], parent:any)=>{
    const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          onlyOneChild.value = item;
          return true;
        }
      });

      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        onlyOneChild.value = { ... parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
  };
  const resolvePath=(routePath:string)=>{
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(props.basePath)) {
      return props.basePath;
    }
    return path.resolve(props.basePath, routePath);
  };

</script>
<style lang="scss" scoped>

</style>
