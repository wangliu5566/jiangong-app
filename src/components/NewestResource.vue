<template>
  <section>
    <section class="side-bottom"></section>
    <section class="container" >
      <search-bar :type="1"></search-bar>
      <section class="newest-resource">
        <div class="space-center">
          <ul class="space-between space-title-index">
            <li @click="newIndex = index" 
            v-for="(item,index) in itemList" 
            :class="{active: newIndex == index ? true : false}"
            >{{item.title}}
              <span v-show="newIndex == index" class="newest-active-placeholder"></span>
              <span v-show="index !== 3" class="newest-active-placeholder-right"></span>
            </li>
          </ul>
        </div>
        



        <mt-loadmore 
          :auto-fill="false" 
          :bottom-method="loadBottom" 
          :bottom-all-loaded="allLoaded"
          bottomPullText="加载更多资源..."
          bottomDropText="加载更多资源..."
          ref="loadmore">
              <!-- <ul class="space-between" v-for="(item,index) in dealLineNum(dataList,5)" v-if="dataList.length > 0">
                <li 
                class="list-item" 
                v-for="(citem,cindex) in 5" 
                v-if="dataList[index * 5 + cindex]"   
                @click="toNative(4,{id:dataList[index * 5 + cindex].Id,isExplicitWord:false})"
                >

                  <section class="figure-section">
                     <figure :style="{background:'url('+bgImg(dataList[index * 5 + cindex])+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                       <img :src="getImgByType(dataList[index * 5 + cindex])" alt="">
                     </figure>
                   </section>

                   <p v-if="trim(dataList[index * 5 + cindex].Title).length > 10" class="two-line" style="line-height: .4rem;marginTop:0.05rem">{{dataList[index * 5 + cindex].Title}}</p>
                   <p v-else class="one-line" style="line-height: .8rem;marginTop:0.05rem">{{dataList[index * 5 + cindex].Title}}</p>

                   <p><span>¥ {{dataList[index * 5 + cindex].CurrentPrice.toFixed(2)}}</span></p>
                </li>
              </ul> -->


              <ul class="space-left" style="margin-top:0.6rem" v-for="(item,index) in dealLineNum(dataList,5)" v-if="dataList.length > 0">

                    <li 
                    v-for="(citem,cindex) in 5" 
                    class="list-item" 
                    v-if="dataList[index * 5 + cindex]" 
                    @click="toNative(4,{id:dataList[index * 5 + cindex].Id,isExplicitWord:false})"
                    :style="{marginLeft:cindex % 5 == 0 ? '0':'0.6rem'}"
                    >
                      <section class="figure-section">
                         <figure :style="{background:'url('+bgImg(dataList[index * 5 + cindex])+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                           <img :src="getImgByType(dataList[index * 5 + cindex])" alt="">
                         </figure>
                       </section>

                       <p v-if="trim(dataList[index * 5 + cindex].Title).length > 10" class="two-line" style="line-height: .4rem;marginTop:0.05rem">{{dataList[index * 5 + cindex].Title}}</p>
                       <p v-else class="one-line" style="line-height: .8rem;marginTop:0.05rem">{{dataList[index * 5 + cindex].Title}}</p>

                       <p><span>¥ {{dataList[index * 5 + cindex].CurrentPrice.toFixed(2)}}</span></p>
                    </li>
                  </ul>
          </mt-loadmore>

        <!-- <div v-if="dataList.length == 0" class="node-data">
           <span style="padding:0.05rem 0.2rem;border:0.02rem solid #aaa">暂无数据</span>
        </div> -->
        <div class="no-data-text" v-show="isNoDataShow">
            <img src="../assets/images/common/kc_ic_no_data.png" alt="">
            <span>
              暂无相关数据
            </span>
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
      dataList:[],
      newIndex:0,
      objectTypes:[],
      itemList:[
        {
          title:'最新资源',
          objectType:[104,108,109],
        },
        {
          title:'新书速递',
          objectType:[102,104],
        },
        {
          title:'视频课程',
          objectType:[109],
        },
        {
          title:'最新图片',
          objectType:[108],
        },
      ],
      isNoDataShow:false,
      cp:1,
      ps:10,

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
      this.getListByNewIndex(this.cp,true);
    },
    /**
     * [getListByNewIndex 根据最新的索引获取数据]
     * @Author   王柳
     * @DateTime 2017-12-21
     * @return   {[type]}   [description]
     */
    getListByNewIndex(cp = 1,isLoadMore = false) {
      this.isNoDataShow = false;
       Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });

       this.$http.post("/Content/Search", {
           query:JSON.stringify({
              ObjectTypes:this.itemList[this.newIndex].objectType,
              SearchOrderBy:{
                ColumnName:'onShelfDate',
              }
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
    },


  },

  created() {
     // Indicator.open({
     //    text: '加载中...',
     //    spinnerType: 'fading-circle'
     // });

  },

  mounted() {
    this.getListByNewIndex();
  },

  watch:{
    'newIndex':function(nv) {
       // this.objectTypes = this.itemList[nv].objectType;

       this.getListByNewIndex();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .node-data {
     display: flex;
     justify-content: center;
     align-items: center;
     width: 100%;
     height: 10rem;

  }


  .newest-active-placeholder {
    position: absolute;
    left: 50%;
    bottom: -0.05rem;
    margin-left: -0.21rem;
    width: 0.42rem;
    height: 0.04rem;
    background: #e71515;
  }


  .newest-active-placeholder-right {
    position: absolute;
    right: 0%;
    top: 50%;
    margin-top: -0.1rem;
    width: 0.02rem;
    height: 0.2rem;
    background: #ddd;
  }
</style>
