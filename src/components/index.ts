import { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue'
import wuTable from './wu_table/index.vue'
import MetaMask from './MetaMask/index.vue'

export default (app: App):void => {
  app.component('SvgIcon', SvgIcon);
  app.component('wuTable', wuTable);
  app.component('MetaMask', MetaMask);
};
