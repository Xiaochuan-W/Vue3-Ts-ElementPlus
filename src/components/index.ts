import { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue'
import WuTable from './WuTable/index.vue'
import AceEditor from './AceEditor/index.vue'

export default (app: App):void => {
  app.component('SvgIcon', SvgIcon);
  app.component('WuTable', WuTable);
  app.component('AceEditor', AceEditor);
};
