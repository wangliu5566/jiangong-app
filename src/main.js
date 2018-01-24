// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// router.beforeEach((to, from, next) => {
//     if(to.fullPath !== '/index') document.getElementById("showHeaderBar").click();

//     next();
// })

// 引入mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(MintUI);

// 引入muse-ui
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
// Vue.use(MuseUI);

import './assets/css/muse-ui.css'

//引入axios
import axios from './http.js'
Vue.prototype.$http = axios;


//引入全局方法
import util from './util'
Vue.use(util);


//借用element-ui侧边栏   弹出对话框
import { Menu,Submenu,MenuItem,MenuItemGroup,Dialog,Dropdown,DropdownMenu,DropdownItem } from 'element-ui'

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
window.$vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
