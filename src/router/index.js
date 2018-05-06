import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login'
import Index from 'components/index/index'
import Profile from 'components/profile/profile'
import Apply from 'components/apply/apply'
import Upload from 'components/upload/upload'
import Pay from 'components/pay/pay'
import Task from 'components/task/task'
import Finished from 'components/finished/finished'
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
          path: '/task',
          name: 'Task',
          component: Task

        },
        {
          path: '/finished',
          name: 'Finished',
          component: Finished

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
