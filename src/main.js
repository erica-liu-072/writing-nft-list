
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Bootstrap from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'
import { faBars, faSort } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add (faUserSecret,faAccessibleIcon,faBars,faSort)

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import router from "./router";
import store from "./store";
import App from "./App.vue";

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.component("v-select", vSelect);
app.use(require('vue3-jalali-moment'));
app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(Bootstrap);

app.mount("#app");
