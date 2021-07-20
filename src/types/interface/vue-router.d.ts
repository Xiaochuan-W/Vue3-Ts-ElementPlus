import { RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
  export interface NewRecordRaw {
    hidden?: boolean;
    alwaysShow?: boolean;
  }
}
