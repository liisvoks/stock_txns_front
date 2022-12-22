import Vue from 'vue'
import VueRouter from 'vue-router'
import TransactionView from "@/views/TransactionView";
import LoginView from "@/views/LoginView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'transactionRoute',
    component: TransactionView
  },
  {
    path: '/login',
    name: 'loginRoute',
component: LoginView
    }
]

const router = new VueRouter({
  routes
})

export default router
