import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.scss'
import * as icons from '@element-plus/icons-vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

VMdPreview.use(vuepressTheme, {
  Prism
})

const app = createApp(App)
app.use(store).use(router).use(ElementPlus).use(VueMarkdownEditor).use(VMdPreview)

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})

app.mount('#app')
console.log('我已經加載過了app')
