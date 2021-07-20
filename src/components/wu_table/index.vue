<template>
  <div>
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :size="size"
      :highlight-current-row="highlight"
      :empty-text="emptyText"
      :span-method="spanMethod"
      @current-change="handleCurrentChange"
      @selection-change="selectChange"
    >
      <el-table-column
        v-for="(item) in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :type="item.type"
        :align="item.align||'center'"
        :width="item.width"
        :fixed="item.fixed"
        :min-width="item.minWidth"
        :sortable="item.sortable||false"
      >
        <template #default="scope">
          <!-- 序号 -->
          <div v-if="!item.slot&&item.type=='index'">{{ (scope.$index+1)+(searchForm.pageNo-1)*searchForm.pageSize }}</div>
          <!-- 普通 -->
          <div v-if="!item.slot&&item.type!='index'" @click="item.click?item.click(JSON.parse(JSON.stringify(scope.row)),scope.$index):'javascript'">
            {{ scope.row[item.prop] }}
          </div>
          <!-- 自定义 -->
          <slot v-else :name="item.slot" :row="scope.row" :index="scope.$index" />
        </template>

      </el-table-column>
      <el-table-column v-if="actions.length>0" label="操作" align="center" fixed="right" :width="actionWidth">
        <template #default="scope">
          <el-button
            v-for="(val,index) in actions"
            :key="index"
            size="mini"
            :type="val.type||'text'"
            @click="val.click?val.click(JSON.parse(JSON.stringify(scope.row)),scope.$index):'javascript'"
          >{{ val.title }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div :style="{'display':'flex','margin-top':'10px','justify-content': pageSetting.align}">
      <el-pagination
        :page-size="searchForm.pageSize"
        :current-page="searchForm.pageNo"
        :layout="pageSetting.layout"
        :total="pageSetting.total"
        :page-sizes="pageSetting.pageSizes"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from 'vue';
interface Column{
  prop:string;// 对应列内容的字段名
  label:string;// 标题
  type:string;// 类型 selection / index / expand
  align:string;// 对齐方式 left / center / right
  fixed:string | boolean;// 列是否固定 true / 'left' / 'right'
  width:string | number;// 对应列的宽度
  minWidth:string | number;// 对应列最小宽度
  sortable:string | boolean;// 对应列是否可以排序 true / false / 'custom'
}
const props = defineProps({
  // 数据
  data: {
    type: Array,
    required: true,
    default: []
  },
  // 列信息
  columns: {
    type: Array,
    required: true,
    default: []
  },
  // 列信息
  actions: {
    type: Array,
    default: []
  },
  actionWidth: {
    type: String,
    default: '200px'
  },
  // 是否斑马纹
  stripe: {
    type: Boolean,
    default: true
  },
  // 是否边框
  border: {
    type: Boolean,
    default: true
  },
  // 大小
  size: {
    type: String,
    default: 'small'
  },
  // 高亮
  highlight: {
    type: Boolean,
    default: true
  },

  // 空数据文本
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  // 分页
  pagination: {
    type: Object,
    default: {}
  }
});

const pageSetting = Object.assign({
  align: 'flex-end',
  background: false,
  total: 50,
  layout: 'sizes, prev, pager, next, ->, total',
  pageSizes: [10, 20, 30, 50]
}, props.pagination);
const searchForm = reactive({
  pageSize: 10,
  pageNo: 1
});
const emit = defineEmits(['handleCurrentChange', 'selectChange', 'sortChange', 'spanMethod', 'sizeChange', 'currentChange']);
const handleCurrentChange = (currentRow:any, oldCurrentRow:any) => {
  emit('handleCurrentChange', JSON.parse(JSON.stringify(currentRow)), JSON.parse(JSON.stringify(oldCurrentRow)));
};
const selectChange = (selection:any) => {
  emit('selectChange', JSON.parse(JSON.stringify(selection)));
};
const sortChange = (item:any) => {
  emit('sortChange', JSON.parse(JSON.stringify(item)));
};
const spanMethod = ({ row, column, rowIndex, columnIndex }:any) => {
  emit('spanMethod', row, column, rowIndex, columnIndex);
};
const sizeChange = (size:number) => {
  searchForm.pageSize = size;
  searchForm.pageNo = 1;
  emit('sizeChange', searchForm);
};
const currentChange = (page:number) => {
  searchForm.pageNo = page;
  emit('currentChange', searchForm);
};
</script>

<style lang="scss" scoped>

</style>
