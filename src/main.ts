import '@/styles/global.less';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PiniaPersist from 'pinia-plugin-persist';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

import App from '@/App.vue';
import router from '@/router';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
  size: 'default'
});

const pinia = createPinia();
pinia.use(PiniaPersist);
app.use(pinia);

app.use(router);

app.mount('#app');
