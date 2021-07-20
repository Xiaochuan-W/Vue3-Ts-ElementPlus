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
  roles: ['admin', 'user'] // 设置该路由进入的权限，支持多个权限叠加
  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
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
暂时请看组件里面props属性