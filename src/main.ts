import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import components from '@/components';
import {i18n} from '@/libs/i18n'

const app = createApp(App)

app.use(store).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(components).mount('#app');

const req = require.context('./icons/svg', false, /\.svg$/)
const requireAll = (requireContext:any) => requireContext.keys().map(requireContext)
requireAll(req)