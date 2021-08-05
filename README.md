#
# vue3-ts-elementplus

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve | npm start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### description
权限菜单借鉴vue-element-admin
基于vue3+typescript+elementplus的中后台前端框架，使用script setup语法糖，更好的函数式编程，还在不断更新中。。。。。。

### vue-router Configuration
```js
hidden: true // (默认 false)
redirect: 'noRedirect'//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
alwaysShow: true//一直显示根路由
name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加，和router/index.js中filterAsyncRoutesByRoles对应
  auth: 'user:add'  // 设置改路由进入的权限，在所有路由中必须唯一，和router/index.js中filterAsyncRoutes对应
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-plus 的 icon
  breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
  activeMenu: '/article/list'// 当路由设置了该属性，则会高亮相对应的侧边栏。
}
```
### components

#### SvgIcon
demo.svg 文件放入src/icons/svg文件夹下

在组件里使用
```html
<svg-icon iconclass="demo" />
```
#### wuTable
```js
//表格数据
data:[]
//列信息
columns:{
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
  click?: () => void;//点击事件
}
//操作控件
actions:{
  type?:string; //样式类型
  title?:string; //按钮文字
  click?: () => void; //点击事件
}
actionWidth:'200px' //操作栏宽度
rowKey:'' //指定rowKey字段
selection:boolean  //是否展示多选框
stripe:boolean  //是否斑马纹
border:boolean  //是否边框
size:'small'  //表格大小，通element-plus的size
highlight:boolean  //是否高亮

```