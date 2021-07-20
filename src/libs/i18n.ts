import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const messages:any = {
  [enLocale.name]: {
    el: enLocale.el,
    message: {
      hello: 'hello world',
      title:'home'
    },
  },
  [zhLocale.name]: {
    el: zhLocale.el,
    message: {
      hello: '你好，世界',
      title:'首页'
    },
  },
  testLocale: {
    el: {},
  }
}

export const i18n = createI18n({
  locale: zhLocale.name,
  fallbackLocale: enLocale.name,
  messages,
})