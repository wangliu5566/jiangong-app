import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 静态页面下的调用形式，如首页
// 静态资源存放路径 + /index.html#/index

// 搜索结果页
// 静态资源存放路径 + /index.html#/SearchJump

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/index',
      name: '首页',
      component: resolve => require(['@/components/Index'], resolve),
      meta: {
         keepAlive: true, //此组件需要被缓存
      }
    },{
      path: '/proRecommend',
      name: '产品推荐',
      component: resolve => require(['@/components/proRecommend'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },


    {
      path: '/labelSearch',
      name: '标签搜索结果',
      component: resolve => require(['@/components/labelSearch'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/SearchJump',
      name: '搜索页',
      component: resolve => require(['@/components/SearchJump'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      },
      beforeEnter: (to, from, next) => {
         document.getElementById("saveTokenInfo").click();
         next();
      }
    },{
      path: '/searchresult',
      name: '搜索结果页',
      component: resolve => require(['@/components/searchresult'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },{
      path: '/productsearch',
      name: '资源搜索结果页',
      component: resolve => require(['@/components/productsearch'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },


    
    {
      path: '/ToolBook',
      name: '工具书-手册列表',
      component: resolve => require(['@/components/ToolBook'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/BuildStandard',
      name: '建筑规范',
      component: resolve => require(['@/components/BuildStandard'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/RelatedTrades',
      name: '相关行业推荐',
      component: resolve => require(['@/components/RelatedTrades'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/EduOnline',
      name: '教育在线',
      component: resolve => require(['@/components/EduOnline'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/CourseList',
      name: '课程列表',
      component: resolve => require(['@/components/CourseList'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/ImgLib',
      name: '图库列表',
      component: resolve => require(['@/components/ImgLib'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/BooksList',
      name: '图书列表',
      component: resolve => require(['@/components/BooksList'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/NewestResource',
      name: '最新资源',
      component: resolve => require(['@/components/NewestResource'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '/Detail',
      name: '详情页面',
      component: resolve => require(['@/components/Detail'], resolve),
      meta: {
         keepAlive: false, //此组件需要被缓存
      }
    },
    {
      path: '*',redirect: '/index'
    },
  ],


  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
