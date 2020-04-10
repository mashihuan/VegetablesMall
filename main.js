import Vue from 'vue'
import App from './App'
import './common/uni.css'
import store from './store'
import '@/common/iconfont/iconfont.css'
import { dealLogin } from './common/dealLogin'

Vue.prototype.$dealLogin = dealLogin
Vue.prototype.$store = store  
Vue.config.productionTip = false


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
