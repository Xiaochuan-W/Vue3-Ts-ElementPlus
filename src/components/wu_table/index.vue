<template>
  <div>
    <el-table
      :data="data"
      :stripe="stripe"
      :border="border"
      :size="size"
      :row-key="rowKey"
      :highlight-current-row="highlight"
      :header-cell-style="{background:'#eef1f6'}"
      :empty-text="emptyText"
      :span-method="spanMethod"
      @current-change="handleCurrentChange"
      @selection-change="selectChange"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        :reserve-selection="true"
        align="center"
        width="55">
      </el-table-column>
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
        <template v-if="!item.slot" #default="scope">
          <!-- 序号 -->
          <div v-if="item.type=='index'">{{ (scope.$index+1)+(searchForm.pageNo-1)*searchForm.pageSize }}</div>
          <!-- 普通 -->
          <div v-if="item.type!='index'" @click="item.click?item.click(JSON.parse(JSON.stringify(scope.row)),scope.$index):'javascript'">
            <el-tooltip v-if="item.tooltip" :content="scope.row[item.prop]" placement="top">
              <div class="tooltip">
                 <a style="color:#409EFF" v-if="item.click">{{scope.row[item.prop]}}</a>
                 <span v-else>{{scope.row[item.prop]}}</span>
              </div>
            </el-tooltip>
            <div v-else>
              <a style="color:#409EFF" v-if="item.click">{{scope.row[item.prop]}}</a>
              <span v-else>{{scope.row[item.prop]}}</span>
            </div>
          </div>
          <!-- 自定义 -->
        </template>
        <template v-else #default="scope">
          <slot :name="item.slot" :row="scope.row" :index="scope.$index" />
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
        :total="total"
        :page-sizes="pageSetting.pageSizes"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
    <section v-show="loading" class="loadBox">
      <img src="@/assets/images/Loading.png" alt="">
      <div>正在努力加载中。。。</div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits } from 'vue';

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
  rowKey: {
    type: String,
    default: ''
  },
  // 是否多选
  selection: {
    type: Boolean,
    default: true
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
  // 总计
  total: {
    type: Number,
    default: 0
  },
  loading:{
    type:Boolean,
    default:false
  }
});

const pageSetting = {
  align: 'flex-end',
  background: false,
  layout: 'sizes, prev, pager, next, ->, total',
  pageSizes: [10, 20, 30, 50]
};
const searchForm = reactive({
  pageSize: 10,
  pageNo: 1
});
const emit = defineEmits(['handleCurrentChange', 'selectChange', 'sortChange', 'spanMethod', 'sizeChange', 'currentChange']);
const handleCurrentChange = (currentRow:any, oldCurrentRow:any) => {
  emit('handleCurrentChange', JSON.parse(JSON.stringify(currentRow)), JSON.parse(JSON.stringify(oldCurrentRow)));
};
const selectChange = (selection:any) => {
  console.log('-----------hahaha',selection);
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
::v-deep .el-table__header{
  background: #f60!important;
}
.tooltip{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.loadBox{
  width: 100vw;
  height: 100vh;
  background: rgb(165, 164, 164,.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
    color: #fff;
  img{
    width: 128px;
    height: 128px;
    margin-bottom: 40px;
    animation: imgAnima 1s infinite;
  }
}
@keyframes imgAnima {
  0%{
    transform: rotate(0deg);
  }
  12%{
    transform: rotate(45deg);
  }
  25%{
    transform: rotate(90deg);
  }
  37%{
    transform: rotate(135deg);
  }
  50%{
    transform: rotate(180deg);
  }
  62%{
    transform: rotate(225deg);
  }
  75%{
    transform: rotate(270deg);
  }
  87%{
    transform: rotate(315deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
