import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './vuetify'
import i18n from './vuetify/i18n'
// import services from '@/services/service';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

let $global = app.config.globalProperties;
// $global.service = services;

//General Web Service url and warName 
$global.$ipAddress = "10.163.17.48:8081"
$global.$warName = "expresso_war";
export { $global }
let endPointObj = require("./services/commonEndpoint.json");
var protocol = "https:" == document.location.protocol ? "https://" : "http://";
$global.$urlLink = protocol + $global.$ipAddress + "/" + $global.$warName;

endPointObj.map((obj) => createUrl(obj));
function createUrl(obj) {
  let key = Object.keys(obj);
  $global["$" + key] =  $global.$urlLink + obj[key];
}
app.use(vuetify).use(i18n).use(router).use(createPinia().use(piniaPluginPersistedstate)).mount('#app')
