import { createI18n } from 'vue-i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enMsg from './en'
import zhMsg from './zh-cn'

export const i18n = createI18n({
  locale: 'zh-cn',
  fallbackLocale: 'en',
  messages:{...enMsg,...zhMsg}
})