<template>

  <el-tree
    ref="menuTree"
    :data="menuData"
    check-strictly
    element-loading-text="拼命加载中"
    node-key="id"
    render-after-expand
    show-checkbox
    size="mini"
    style="width: 100%;pading-top:20px;"
    v-loading="menuLoading"
    @check-change="handleMenuCheckChange"
    @check="handleMenuChange"
  />

</template>

<script lang="ts" setup>
import { ref, Ref } from '@vue/reactivity';

const menuTree:Ref<any> = ref(null);

// 树节点选择监听
const handleMenuCheckChange = (data:any, check:boolean, subCheck:boolean) => {
  if (check) {
    // 节点选中时同步选中父节点
    const parentId = data.parentId;
    menuTree.value.setChecked(parentId, true, false);
  } else {
    // 节点取消选中时同步取消选中子节点
    if (data.children != null) {
      data.children.forEach((element:any) => {
        menuTree.value.setChecked(element.id, false, false);
      });
    }
  }
};
const handleMenuChange = (data:any, check:any) => {
  if (data.children?.length && check.checkedKeys.includes(data.id)) {
    setCheckedOfDeep(data, 'id', true);
  }
};
// 递归选中子节点
const setCheckedOfDeep = (data:any, nodeKey = 'id', val = true) => {
  menuTree.value.setChecked(data[nodeKey], val, true);
  return (
        data.children?.length &&
        data.children.map((item:any) =>
          setCheckedOfDeep(item, nodeKey, val)
        )
  );
};

</script>
<style scoped>
.menu-container {
  margin-top: 10px;
}
.menu-header {
  padding-left: 8px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 16px;
  color: rgb(20, 89, 121);
}
.tips {
  color: #e6a23c;
  margin: 10px 0;
}
</style>
