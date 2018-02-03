<template>
   <section class="over-flow">
       <section class="side-bottom"></section>
         <section class="side-bar-container" >
          <search-bar :type="1"></search-bar>
          <section class="side-bar">
            
            <el-menu
              class="el-menu-vertical-demo"
              @open="getChildList"
              @close="getChildList"
              >
              <el-submenu :index="item.Id+'-'+index" v-for="(item,index) in cateGoryList" :key="item.Id" >
                <template slot="title">
                  <span>{{item.Title}}</span>
                </template>
                <el-submenu :index="citem.Id+'-'+cindex" :key="citem.Id+'-'+cindex" v-for="(citem,cindex) in item.Children">
                  <template slot="title">{{citem.Title}}</template>
                  <el-menu-item v-for="(nitem,nindex) in citem.Children" :index="nitem.Id + '-' + nindex" :key="nitem.Id + '-' + nindex">{{nitem.Title}}</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>

          </section>
          <section class="content">
            <section class="build-standard">
              <ul class="space-between">
                <li v-for="(item,index) in orderControl" @click="setOrder(item,index)">{{item.title}}
                    <span><img :src="item.state == 0 ? defaultImg:(item.state == 1 ?upOrderImg:downOrderImg)" style="width:0.14rem;height:0.16rem"></span>
                  </li>
              </ul>


              <mt-loadmore 
              style="margin-top:0.5rem"
              :auto-fill="false" 
              :bottom-method="loadBottom" 
              :bottom-all-loaded="allLoaded"
              bottomPullText="加载更多资源..."
              bottomDropText="加载更多资源..."
              ref="loadmore">
                   <ul class="space-left" v-for="(item,index) in (dataList.length - dataList.length % 4) / 4" v-if="dataList.length > 0">

                    <li v-for="(citem,cindex) in 4"
                    class="list-item" 
                    @click="toNative(4,{id:dataList[index * 4 + cindex].Id,isExplicitWord:false})"
                    :style="{marginLeft:cindex % 4 == 0 ? '0':'0.6rem'}"
                    >
                        
                        <section class="figure-section">
                           <figure :style="{background:'url('+bgImg(dataList[index * 4 + cindex])+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                             <img :src="getImgByType(dataList[index * 4 + cindex])" alt="">
                           </figure>
                         </section>

                         <p v-if="trim(dataList[index * 4 + cindex].Title).length > 10" class="two-line" style="line-height: .4rem;marginTop:0.05rem">{{dataList[index * 4 + cindex].Title}}</p>
                         <p v-else class="one-line" style="line-height: .8rem;marginTop:0.05rem">{{dataList[index * 4 + cindex].Title}}</p>

                         <p><span>¥ {{dataList[index * 4 + cindex].CurrentPrice}}</span></p>
                    </li>

                  </ul>
              </mt-loadmore>

              <div class="no-data-text" v-show="isNoDataShow">
                <img src="../assets/images/common/kc_ic_no_data.png" alt="">
                <span>
                  暂无相关数据
                </span>
              </div>
            </section>
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
        orderControl:[
        {
          title:'销量',
          state:0, //默认  1 - 升序  -1 - 降序
          order:''
        },
        {
          title:'价格',
          state:0, //默认  1 - 升序  -1 - 降序
          order:'currentPrice'
        },
        {
          title:'上架时间',
          state:0, //默认  1 - 升序  -1 - 降序
          order:'onShelfDate'
        },
        {
          title:'出版时间',
          state:0, //默认  1 - 升序  -1 - 降序
          order:'出版时间publishDate'
        },
        {
          title:'阅读量',
          state:0, //默认  1 - 升序  -1 - 降序
          order:'readCount'
        }],

        keyword:this.$route.query.keyword,
        order:'',   //价格 currentPrice  上架时间  onShelfDate  出版时间publishDate 阅读量 readCount
        desc:true, //倒序排列
        objectType:'',
        cateGoryList:[],

        dataList:[],
        dataRecord:0,
        isNoDataShow:false,

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
     * @Author   王柳
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
     * @Author   王柳
     * @DateTime 2017-12-21
     * @return   {[type]}   [description]
     */
    handleCommandCarrier() {
       
    },
    
    /**
     * [handleCommandType 类型]
     * @Author   王柳
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
      this.order = '';
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
        this.$http.post("/Content/Search", {
           query:JSON.stringify({
              SearchOrderBy:{
                ColumnName:this.order,
                Descending:this.desc
              },
              keyword:this.keyword,
              objectTypes:[109],
              CategoryIds:this.categoryIds,
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
              if(res.data.Data.ItemList.length == 0) this.isNoDataShow = true;
            }

            console.log(res.data.Data.ItemList.length)

            if(res.data.Data.ItemList.length < this.ps) this.allLoaded = true;
          }else{
            // alert(res.data.Description);
          }

          Indicator.close();
        })
    },


    /**
     * [getCategoryByGroupName 获取分类下数据]
     * @Author   王柳
     * @DateTime 2017-12-24
     * @return   {[type]}   [description]
     */
    getCategoryByGroupName() {
       this.$http.get("/Category/ListByGroupName", {
           params:{
            groupName:'TopBook'
           }
        })
        .then((res) => {
          if (res.data.Code == 200) {
            this.cateGoryList = res.data.Data;
          }else{
            // alert(res.data.Description);
          }

          Indicator.close();
        })
    },


    /**
     * [getChildList 获取侧边栏的子级菜单]
     * @Author   王柳
     * @DateTime 2017-12-24
     * @param    {[type]}   index [description]
     * @return   {[type]}         [description]
     */
    getChildList(id) {
      let cateId = id.split('-')[0];
      let index = id.split('-')[1];
      // this.$set(this.cateGoryList[index],'Children',[{Title:'测试分类1-1',Id:'1-1',Children:[]}])
      this.$http.get("/Category/ChildList", {
           params:{
            parentId:cateId,
            isRecursive:true
           }
        })
        .then((res) => {
          if (res.data.Code == 200) {
            // this.cateGoryList = res.data.Data;
            //如果是只有一级分类
            if(res.data.Data.ItemList.length == 0) {
               this.categoryIds = [cateId];
               this.getDataByKeyword();
            }
          }else{
            //这个时候依然是分类，还有下一层数据
               this.$set(this.cateGoryList[index],'Children',res.data.Data.ItemList)
          }

          Indicator.close();
        })
    },
  },

   created() {
     Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
   },

  mounted() {
    this.getDataByKeyword();

    this.getCategoryByGroupName();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
