export interface Search{
  pageSize:number;
  pageNo:number;
}
export interface Page{
  startPos:number;
  num: number;
}

export interface Column{
  label?: string;// 标题
  prop?:string;// 对应列内容的字段名
  type?: string;// 类型 selection / index / expand
  slot?: string;//插槽
  align?:string;// 对齐方式 left / center / right
  fixed?:string | boolean;// 列是否固定 true / 'left' / 'right'
  width?:string | number;// 对应列的宽度
  minWidth?:string | number;// 对应列最小宽度
  sortable?: string | boolean;// 对应列是否可以排序 true / false / 'custom'
  tooltip?: boolean;//是否显示
  click?: () => void;
}
