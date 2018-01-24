<template>
  <section class="side-bar-container" >
    <section class="side-bar">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        >
        <el-submenu :index="index+''" v-for="(item,index) in 10" :key="index">
          <template slot="title">
            <span>城市规划设计</span>
          </template>
          <el-submenu index="1-1">
            <template slot="title">地基与基础</template>
            <el-menu-item index="1-1-1">混泥土工程</el-menu-item>
            <el-menu-item index="1-1-2">模板工程</el-menu-item>
            <el-menu-item index="1-1-3">钢筋工程</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">主体结构工程</template>
            <el-menu-item index="1-2-1">混泥土工程</el-menu-item>
            <el-menu-item index="1-2-2">模板工程</el-menu-item>
            <el-menu-item index="1-2-3">钢筋工程</el-menu-item>
          </el-submenu>
        </el-submenu>

      </el-menu>
    </section>

    <section class="content">
      
    </section>
  </section>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
  name: '',
  data () {
    return {
       keyword:this.$route.query.keyword,
       dataList:[],
       dataRecord:0.
    }
  },
  methods:{
     getDataByKeyword(keyword,type) {
      if(keyword) this.keyword = keyword;

       this.$http.get("/ExplicitWord/Search", {
         params:{
          keyword:this.keyword,
         }
       })
        .then((res) => {
          if (res.data.Code == 200) {
            console.log(res.data.Data.ItemList)
            this.dataList = res.data.Data.ItemList;
            this.dataRecord = res.data.Data.RecordCount;
          }else{
            // alert(res.data.Description);
          }

          Indicator.close();
        })
    }
  },

  created() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
  },

  mounted() {
    this.getDataByKeyword();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
