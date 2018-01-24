<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->

    <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>

<script>
import './assets/css/Product.less';
export default {
  name: 'app',
  created() {
    //获取设备信息
    // document.getElementById("saveTokenInfo").click();
  },
  mounted() {
    
  }
}
</script>

<style>

</style>
