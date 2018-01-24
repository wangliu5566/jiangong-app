<template>
  <section>
      <section class="side-bottom"></section>
      <section class="side-bar-container">
      <search-bar :type="2"></search-bar>
      
<!--       <section class="side-bar">
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
      </section> -->

      <section style="width:100%;height:100%">
        <div class="resule-con">
          <p class="sum-text" v-show="$route.query.keyword">为您找到“{{keyword}}”相关的<span class="sum-color">{{dataRecord}}</span>条结果</p>
          <p class="read"><span v-for="(item,index) in orderControl" @click="setOrder(item,index)">{{item.title}} <img :src="item.state == 0 ? defaultImg:(item.state == 1 ?upOrderImg:downOrderImg) " style="width:0.14rem;height:0.16rem"></span></p>

            



           <mt-loadmore 
              style="margin-top:0.5rem"
              :auto-fill="false" 
              :bottom-method="loadBottom" 
              :bottom-all-loaded="allLoaded"
              bottomPullText="加载更多资源..."
              bottomDropText="加载更多资源..."
              ref="loadmore">
                <div class="img-con space-between" v-for="(item,index) in dealLineNum(dataList,4)" v-if="dataList.length > 0">
                   <div 
                    v-for="(citem,cindex) in 4" 
                    @click="toNative(4,{id:dataList[index * 4 + cindex].Id,isExplicitWord:true,title:dataList[index * 4 + cindex].Title})"
                    v-if="dataList[index * 4 + cindex]"
                    >
                      <div class="img-one" :style="{background:'url('+bgImg(dataList[index * 4 + cindex],true) +')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',border:'0.01rem solid #ddd'}">
                        <!-- <img class="product-img" :src="dataList[index * 3 + cindex].CoverUrl ? dataList[index * 3 + cindex].CoverUrl : ImgOne"> -->
                      </div>
                      <!-- <p>{{dataList[index * 3 + cindex].Title}}</p> -->
                      <p v-if="dataList[index * 4 + cindex].Title.length > 10" class="two-line" style="width:4rem">{{dataList[index * 4 + cindex].Title }}</p>

                      <p v-else class="one-line" style="width:4rem">{{dataList[index * 4 + cindex].Title }}</p>

                    </div>

                   </div> 
              </mt-loadmore>
<!-- 
           <div class="no-data-text" v-else>
              <span>
                暂无数据
              </span>
            </div> -->

        </div>
        
      </section>
    </section>
  </section>
</template>

<script>
import searchBar from './common/searchBar.vue';
import { Indicator } from 'mint-ui';
export default {
  name: '',
  data () {
    return {
      sum:0,
      ImgOne:'./static/img/知识元占位图@2x.png',
      orderControl:[
      {
        title:'阅读量',
        state:0, //默认  1 - 升序  -1 - 降序
        order:'readCount'
      }],


      keyword:this.$route.query.keyword,
      order:'readCount',   //价格 currentPrice  上架时间  onShelfDate  出版时间publishDate 阅读量 readCount
      desc:true, //倒序排列
      objectType:'',

      dataList:[],
      dataRecord:0,
      cp:1,
      ps:8,

      allLoaded:false,
    }
  },
   components:{
    'search-bar':searchBar
  },
   methods:{
    loadBottom() {
      // 加载更多数据
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.cp ++;
      this.getDataByKeyword(this.cp,true);
    },
    /**
     * [setOrder 设置排序规则]
     * @Author   罗文
     * @DateTime 2017-12-21
     */
    setOrder(item,index) {
       let state = item.state;
       this.orderControl.forEach((citem,cindex)=>{
          citem.state = 0;
       })
       

       if(index == 0) {
          if(state == 0) {
              item.state = -1;
           }else {
              item.state = 0;
           }
       }else {
           if(state == 0) {
              item.state = -1;
           }else if(state == -1) {
              item.state = 1;
           }else if(state = 1) {
              item.state = 0;
           }
       }

      this.getDataByKeyword();
    },
    
    /**
     * [handleCommandCarrier 载体]
     * @Author   罗文
     * @DateTime 2017-12-21
     * @return   {[type]}   [description]
     */
    handleCommandCarrier() {
       
    },
    
    /**
     * [handleCommandType 类型]
     * @Author   罗文
     * @DateTime 2017-12-21
     * @return   {[type]}   [description]
     */
    handleCommandType(command) {
       this.objectType = command;
       this.getDataByKeyword();
    },

    getDataByKeyword(cp = 1,isLoadMore = false) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });


      // if(keyword) this.keyword = keyword;
      
      //处理排序规则
      this.order = 'hot';
      this.desc = true;
      this.orderControl.forEach((citem,cindex)=>{
          if(citem.state != 0) {
             this.order = citem.order;
             this.desc = citem.state == -1 ? true : false;
          }
       })

      //处理类型
      let typeArr = [];
      if(this.objectType !== '') typeArr = [this.objectType];

        this.$http.post("/ExplicitWord/Search", {
           query:JSON.stringify({
              SearchOrderBy:{
                ColumnName:this.order,
                Descending:this.desc
              },
              keyword:this.keyword,
              objectTypes:typeArr
           }),
           ps:this.ps,
           cp:cp,
        })
        .then((res) => {
          if (res.data.Code == 200) {
            if(isLoadMore) {
              this.dataList.push(...res.data.Data.ItemList);
              this.$refs.loadmore.onBottomLoaded();
            }else {
              this.dataList = [];
              this.cp = 1;
              this.$nextTick(()=>{
                this.dataList = res.data.Data.ItemList;
              })

              this.dataRecord = res.data.Data.RecordCount;
              if(res.data.Data.ItemList.length < this.ps) this.allLoaded = true;
              if(res.data.Data.ItemList.length == 0) this.isNoDataShow = true;
            }
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
  },

  watch:{
    '$route.query.keyword':function(nv) {
       this.keyword = nv;
       this.getDataByKeyword();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
