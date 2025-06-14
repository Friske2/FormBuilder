import { createApp } from 'vue'
import App from './App.vue'
import './assets/daisy.css'
import './assets/app.css'
import 'element-plus/dist/index.css'
import './assets/custom.css'
import cleaveRegister from './directives/cleave'
// import ElementPlus from 'element-plus'

const app = createApp(App)

app.directive('cleave', cleaveRegister)
// app.use(ElementPlus)
app.mount('#app')
