import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import { createRouter } from './router';
import vuetify from './plugins/vuetify';
import { createStore } from '@web/store';
import { TSSRAppConf} from '@common/types/TSSR';
import plugins from '@web/plugins';

Vue.use(plugins);

export function createApp(conf?: TSSRAppConf, state?: any) {

  const router = createRouter();
  const store = createStore();


  if (state) {
    store.replaceState(state);
  }

  const app = new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App)
  });


  if (conf) {
    app.$addLocale(conf.i18n.currentLang, conf.i18n.locale);
    app.$currentLang = conf.i18n.currentLang;
  }

  return { app, router, store };
}
