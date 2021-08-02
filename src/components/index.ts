import { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue'
import wuTable from './wu_table/index.vue'
import CodeMirror from './CodeMirror/index.vue'

export default (app: App):void => {
  app.component('SvgIcon', SvgIcon);
  app.component('wuTable', wuTable);
  app.component('CodeMirror', CodeMirror);
};
