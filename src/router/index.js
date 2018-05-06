import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Index from 'components/index/index'
import Profile from 'components/profile/profile'
import Apply from 'components/apply/apply'
import Upload from 'components/upload/upload'
import Pay from 'components/pay/pay'
import Error from 'components/error/error'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'Login'
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path: '/error',
      name: 'error',
      component: Error
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: '/apply',
          name: 'apply',
          component: Apply
        },
        {
          path: '/upload',
          name: 'upload',
          component: Upload
        },
        {
          path: '/pay',
          name: 'pay',
          component: Pay
        }
      ]
    }
  ]
})
