<template>

  <section>
    <section class="side-bottom"></section>
    <section class="container">
      <search-bar :execGetSearchType="execGetSearchType" v-on:getSearchType="getSearchType"></search-bar>
      <section class="Con">
        <div class="ConLeft">
          <div class="LeftText">
            <span >历史搜索</span>
            <img src="../assets/images/index/垃圾桶.png">
          </div>
          <div class="place-hold"></div>

          <div class="LeftTextcon" v-for="(item,index) in 3">
            <span v-if="historyExpList[2 * index]" class="concrete"  @click="search(historyExpList[2 * index].Title)">{{historyExpList[2 * index].Title}}</span>

            <span v-if="historyExpList[2 * index + 1]" class="concrete" @click="search(historyExpList[2 * index + 1].Title)">{{historyExpList[2 * index + 1].Title}}</span>
          </div>


        </div>
        <div class="Content"></div>
        <!-- 右边部分 -->
        <div class="ConRight">
          <div class="LeftText">
            <span>热门搜索</span>
          </div>
          <div class="place-hold"></div>

  
          <div class="LeftTextcon" v-for="(item,index) in (relateExpList.length - relateExpList.length % 2)/2 + 1">
            <span v-if="relateExpList[2 * index]" class="concrete" @click="search(relateExpList[2 * index].Title)">{{relateExpList[2 * index].Title}}</span>
            <span v-if="relateExpList[2 * index + 1]" class="concrete" @click="search(relateExpList[2 * index + 1].Title)">{{relateExpList[2 * index + 1].Title}}</span>
          </div>

        </div>
      </section>
    </section>
  </section>
</template>

<script>
import searchBar from './common/searchBar.vue';
import { Indicator } from 'mint-ui';
export default {
  name: 'index',
  data () {
    return {
      myurl:'../../static/img/垃圾桶.png',

      historyExpList:[
        {
           Title:'框架结构'
        },{
           Title:'地基'
        },{
           Title:'埋深'
        },{
           Title:'钢筋混凝土'
        },{
           Title:'计量检验'
        },{
           Title:'构造柱'
        },
      ],

      relateExpList:[
      // {
      //    Title:'非承重墙'
      // },{
      //    Title:'钢筋混凝土'
      // },{
      //    Title:'标准层'
      // },{
      //    Title:'散水'
      // },{
      //    Title:'刚性基础'
      // },{
      //    Title:'日照间距'
      // },{
      //    Title:'注浆地基'
      // },{
      //    Title:'静压桩'
      // },{
      //    Title:'防潮层'
      // },{
      //    Title:'标高'
      // },{
      //    Title:'进深'
      // },{
      //    Title:'配筋砌体'
      // },{
      //    Title:'通缝'
      // },{
      //    Title:'砖木结构'
      // },{
      //    Title:'沉降'
      // },{
      //    Title:'计量检验'
      // }
      ],
      searchType:1,
      execGetSearchType:true,
    }
  },
  components:{
    'search-bar':searchBar
  },
  methods:{
    search(title) {
      this.execGetSearchType = !this.execGetSearchType;
      this.$nextTick(()=>{
        let path = '/productsearch';
        if(this.searchType == 2) {
           path = '/searchresult';
        }

        this.$router.push({
          path:path,
          query:{
            keyword:title
          }
        })
      })
    },
    
    /**
     * [getSearchType 获取搜索类型]
     * @Author   罗文
     * @DateTime 2017-12-24
     * @param    {[Number]}   res [1 - 资源 2 - 知识元]
     * @return   {[type]}       [description]
     */
    getSearchType(res) {
      this.searchType = res;
    },
    
    /**
     * [getHistorySearchList 获取历史搜索记录]
     * @Author   罗文
     * @DateTime 2018-01-11
     * @return   {[type]}   [description]
     */
    getHistorySearchList() {
      console.log(document.getElementById("saveTokenInfo").getAttribute('data-devicetoken'))
      console.log(document.getElementById("saveTokenInfo").getAttribute('data-accesstoken'))
      console.log(document.getElementById("saveTokenInfo").getAttribute('data-appversion'))

       this.$http.get("/History/SearchList", {
          params: {
            ps:20,
            cp:1,
            ActionType:2,
            deviceToken:document.getElementById("saveTokenInfo").getAttribute('data-devicetoken'),
            accessToken:document.getElementById("saveTokenInfo").getAttribute('data-accesstoken'),
            appVersion:document.getElementById("saveTokenInfo").getAttribute('data-appversion')
          }
        })
        .then((res) => {
          if (res.data.Code == 200) {
            console.log('用户历史');
            console.log(res.data)
            this.historyExpList = res.data.Data.ItemList
          }else{
            // alert(res.data.Description);
          }
        })
    },

    //获取热门搜索
    getList() {
      this.$http.get("/Report/SearchWordList", {
          params: {
            ps:20,
            cp:1,
            startTime:new Date() - 3600 * 24 * 30, 
            endTime:new Date()
          }
        })
        .then((res) => {
          if (res.data.Code == 200) {
            this.relateExpList = res.data.Data.ItemList
          }else{
            // alert(res.data.Description);
          }
          Indicator.close();
        })
    },
    // /Report/SearchWordList
  },

  

  created() {
     // Indicator.open({
     //    text: '加载中...',
     //    spinnerType: 'fading-circle'
     //  });
  },

  mounted() {
    this.getList();

    //获取设备信息
    
    if(document.getElementById("saveTokenInfo").getAttribute('data-devicetoken') !== '') {
        this.getHistorySearchList();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>