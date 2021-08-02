<template>
  <wu-table :pagination="pagination" :columns="columns" :data="data" selection>
    <template #sex="{row}">
      <el-tag :type="row.sex=='0'?'success':'danger'">{{ row.sex=='0'?'女':'男' }}</el-tag>
    </template>
  </wu-table>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const columns = [
  {
    label: '排序',
    type: 'index'
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'sex',
    label: '性别',
    slot: 'sex'
  },
  {
    prop: 'age',
    label: '年龄',
    sortable: 'custom'
  }
];
const data = [
  { name: 'zhangsanddddddddddddddddddddddddddddddddsssssssssssssssssssssssssssssssssssssssssssss', sex: '1', age: '24' },
  { name: 'lisi', sex: '0', age: '25' },
  { name: 'wangwu', sex: '1', age: '26' }
];
const pagination = {
  total: 100
};
</script>

<style scoped>

</style>
