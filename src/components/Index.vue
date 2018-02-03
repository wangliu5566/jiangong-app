<template>
  <section class="container" id="indexContainer">
    <header>
       <section class="header">

           <figure slot="left" class="logo">
               <img src="../assets/images/index/个人中心@2x.png" @click="toNative(1)"/>
               <img src="../assets/images/index/扫码(1)@3x.png" @click="toNative(2)" style="opacity:0"/>
               <img src="../assets/images/index/购物车@3x.png" @click="toNative(3)"/>
               <img src="../assets/images/index/搜索@3x.png"/>
           </figure>

           <section class="input">
             <select :style="{background:'url('+ selectBgimg()+') no-repeat scroll right 0.2rem transparent',backgroundSize:'0.22rem 0.14rem'}">
               <option value="资源">资源</option>
               <option value="图书">标签</option>
             </select>
             <input type="text"  readonly="readonly" placeholder="请输入您要搜索的内容" @focus.prevent="toPath('/SearchJump')" @click.prevent="toPath('/SearchJump')">
           </section>

       </section>
       <mt-swipe :auto="3000">
         <mt-swipe-item><img src="../assets/images/index/banner@3x1.png" height="100%" width="100%" alt=""></mt-swipe-item>
         <mt-swipe-item><img src="../assets/images/index/banner2@3x.png" height="100%" width="100%" alt="" ></mt-swipe-item>
         <mt-swipe-item><img src="../assets/images/index/banner3@3x1.png" height="100%" width="100%" alt="" ></mt-swipe-item>
<!--          <mt-swipe-item><img src="../assets/images/index/banner@3x.png" height="100%" width="100%" alt="" ></mt-swipe-item> -->
       </mt-swipe>
    </header>
    <section class="index-nav">
      <ul>
         <li @click="toPath('/BooksList')">
          <img src="../assets/images/index/图书分类@2x.png">
          图书分类
        </li>

        <li @click="toNative(5,{},4)">
          <img src="../assets/images/index/考试课程@2x.png">
          考试课程
        </li>

         <li @click="toNative(5,{},5)">
          <img src="../assets/images/index/教育在线@2x.png">
          教育在线
        </li>

         <li @click="toPath('/ImgLib')">
          <img src="../assets/images/index/建筑图库@2x.png">
          建筑图库
        </li>

         <li style="width:1.8rem" @click="toPath('/ToolBook')">
          <img src="../assets/images/index/工具书手册@2x.png">
          工具书/手册
        </li>

         <li @click="toNative(5,{},6)">
          <img src="../assets/images/index/标准规范@2x.png">
          标准规范
        </li>
      </ul>
    </section>

    <section class="new-resource">
      <img src="../assets/images/index/最新资源后的背景圆点@2x.png">
      <p>最新资源</p>
      <section class="new-resource-content">
        <p>
          <span @click='toPath("/NewestResource")'>全部 </span>
          <img src="../assets/images/index/全部@2x.png"  @click='toPath("/NewestResource")'>
        </p>
        <div>
          <mt-swipe :show-indicators="false" :auto="0" @change="handleChange">
            <mt-swipe-item v-for="(item,index) in 4" :key="index">
               <ul>
                 <li 
                 class="list-item" 
                 v-if="newestList.length > index * 5 && newestList[index * 5 + cindex]" 
                 v-for="(citem,cindex) in 5" 
                 :key="cindex"  
                 @click="toNative(4,{id:newestList[index * 5 + cindex].Id,isExplicitWord:false})"
                 :style="{marginLeft:cindex % 5  == 0 ? '0' : '0.85rem'}"
                 >

                   <section class="figure-section">
                     <figure  :style="{background:'url('+bgImg(newestList[index * 5 + cindex])+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                       <img :src="getImgByType(newestList[index * 5 + cindex])" alt="">
                     </figure>
                   </section>

                   <p v-if="trim(newestList[index *5 + cindex].Title).length > 10" class="two-line" style="line-height: .4rem;marginTop:0.05rem">{{newestList[index *5 + cindex].Title}}</p>
                   <p v-else class="one-line" style="line-height: .8rem;marginTop:0.05rem">{{newestList[index *5 + cindex].Title}}</p>

                   <p><span>¥ {{newestList[index * 5 + cindex].CurrentPrice.toFixed(2)}}</span></p>
                 </li>

                  <!-- <li v-for="(citem,cindex) in 5">
                   <figure>
                     <img src="../assets/images/common/占位图@2x.png">
                   </figure>
                   <p>预拌混泥土企业检测试验人员实用读本</p>
                   <p><span>¥ 25.6</span></p>
                 </li> -->
              </ul>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 轮播小点 -->
        <div class="lunbo-india">
           <ul>
             <li v-for="(item,index) in 4" :key="index" :class="{avtive:index == newAidioIndex ? true:false}"></li>
           </ul>
        </div>
      </section>
    </section>

    <!-- 热门知识元 -->
    <section class="hot-relate">
      <section class="hot-relate-cont">
        <section class="section-title">
           <span></span>
           <strong>热门标签</strong>
           <span></span>
           <i @click="toPath('/searchresult')">全部</i>
           <img src="../assets/images/index/全部@2x.png" @click="toPath('/searchresult')"> 
        </section>

        <section class="hot-relate-exp">
           <ul v-if="relateExpList.length != 0">
             <li 
             @click="toNative(4,{id:item.Id,isExplicitWord:true,title:item.Title})"
             v-for="(item,index) in relateExpList"
             :style="{color:contentColors[contentRandom[index]],fontSize:contentRandom[index]/50 + 0.2 + 'rem',top: index % 2 == 0 ? '0.05rem':'-0.05rem',}"
             >
               {{item.Title}}
             </li>
          </ul>
        </section>
      </section>
    </section>

    <!-- 在线应用 -->
    <section class="hot-relate">
      <section class="hot-relate-cont">
        <section class="section-title">
           <span></span>
           <strong>产品应用</strong>
           <span></span>
           <i @click='toPath("/proRecommend")'>全部</i>
           <img src="../assets/images/index/全部@2x.png">
        </section>

        <section class="pro-apps">
          <ul class="item">
              <li @click="toNative(5,{},1)">
                <figure>
                  <img src="../assets/images/index/i施工图标@2x.png" style="width:2.24rem;">
                </figure>
                <p>
                  I施工
                </p>
              </li>
              <li @click="toNative(5,{},2)">
                <figure>
                  <img src="../assets/images/index/i土木@2x.png" style="width:1.8rem;">
                </figure>
                <p>
                  I土木
                </p>
              </li>
              <li @click="toNative(5,{},3)">
                <figure>
                  <img src="../assets/images/index/cbzxlogo@3x.png" style="width:4.67rem;">
                </figure>
                <p>
                  中国建筑工业出版社
                </p>
              </li>
            </ul>

        </section>
      </section>
    </section>


    <!-- 行业相关推荐 -->
    <section class="new-resource" style="margin-top: -0.6rem">
      <img src="../assets/images/index/相关行业推荐背景图@2x.png">
      <p>行业相关推荐</p>
      <section class="new-resource-content" style="height: 7.2rem">
        <p class="hangye-recom-title">
          <span @click='toPath("/RelatedTrades")'>全部 </span>
          <img src="../assets/images/index/全部@2x.png" @click='toPath("/RelatedTrades")'>
        </p>

        <h3>{{professerTitle}}</h3>

        <div>
          <mt-swipe :show-indicators="false" :auto="0" @change="handleChangeProfesserTitle"  >
            <mt-swipe-item v-for="(item,index) in recommendList" :key="index">
               <ul>
                 <li 
                 class="list-item" 
                 v-for="(citem,cindex) in item.ApiContentList" 
                 :key="cindex" 
                 @click="toNative(4,{id:citem.Id,isExplicitWord:false})"
                 :style="{marginLeft:cindex % 5  == 0 ? '0.2rem' : '0.85rem'}"
                 >

                   <section class="figure-section">
                     <figure :style="{background:'url('+bgImg(citem) +')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}">
                       <img :src="getImgByType(citem)" alt="">
                     </figure>
                   </section>

                   <p v-if="trim(citem.Title).length > 10" class="two-line" style="line-height: .4rem;marginTop:0.05rem">{{citem.Title}}</p>
                   <p v-else class="one-line" style="line-height: .8rem;marginTop:0.05rem">{{citem.Title}}</p>

                   <p><span>¥ {{citem.CurrentPrice.toFixed(2)}}</span></p>
                 </li>
              </ul>
            </mt-swipe-item>


          </mt-swipe>
        </div>

        <!-- 轮播小点 -->
        <div class="lunbo-india hangye-recom">
           <ul>
             <li v-for="(item,index) in recommendList.length" :class="{avtive:index == recommendIndex ? true:false}"></li>
           </ul>
        </div>
      </section>
    </section>


  </section>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      newAidioIndex:0,
      recommendIndex:0,
      keyword:'',
      
      //最新资源
      newestList:[],
      //热门知识元
      relateExpList:[],
      contentColors:['#ac74b5','#c7d868','#f05a66','#45b3a8','#14a6fb','#f29c51','#00aeed','#67c23a','#eb9e05','#fa5555'],
      randomWidth:'',
      contentRandom:[],   //每个知识元的随机参数，只能配置一次，不然每次update都会更新
      recommendList:[],

      professerTitle:'',  //行业推荐名
    }
  },
  methods:{
    handleChange(index) {
      this.newAidioIndex = index;
    },
    
    /**
     * [handleChangeProfesserTitle 手动切换行业名]
     * @Author   王柳
     * @DateTime 2017-12-25
     * @param    {[type]}   index [description]
     * @return   {[type]}         [description]
     */
    handleChangeProfesserTitle(index) {
      this.recommendIndex = index;
      this.professerTitle = this.recommendList[index].Title;
    },
    
    
    /**
     * [getRandomWidth 获得随机宽度]
     * @Author   xxx
     * @DateTime 2017-12-15T23:26:27+0800
     * @return   {[type]}                 [description]
     */
    getRandomWidth(){
      this.randomWidth = Math.floor(Math.random() * 50);
      // console.log(Math.random() * 20)
    },


    toPath(path,query) {
      this.$router.push(path);
    },

    
    /**
     * [getNewestList 获取最新资源]
     * @Author   王柳
     * @DateTime 2017-12-17
     * @return   {[type]}   [description]
     */
    getNewestList() {
      // newestList
      this.$http.post("/Content/Search", {
         query:JSON.stringify({
            SearchOrderBy:{
              ColumnName:'onShelfDate',
            },
            ObjectTypes:[104,108,109]
         }),

         ps:20
      })
      .then((res) => {
        if (res.data.Code == 200) {
          this.newestList = res.data.Data.ItemList;
        }else{
          // alert(res.data.Description);
        }
      })
      
    },

     /**
     * [getNewestList 获取最新资源]
     * @Author   王柳
     * @DateTime 2017-12-17
     * @return   {[type]}   [description]
     */
    getRecommendList() {
      // newestList
      this.$http.get("/Aqr/List", {
         params:{
          isGetContent:true
         }
      })
      .then((res) => {
        if (res.data.Code == 200) {
          this.recommendList = res.data.Data;
          this.professerTitle = this.recommendList[0].Title
        }else{
          // alert(res.data.Description);
        }
      })
    },


    //获取某个子分类数据
    getChildList(id){
      this.$http.get("/ExplicitWord/Search", {
         params:{
          categoryIds:id,
          ps:30
        }
      })
        .then((res) => {
          if (res.data.Code == 200) {
            this.relateExpList = res.data.Data.ItemList;
          }else{
            // alert(res.data.Description);
          }
        })
    },
    /**
     * [getList 获取列表的数据]
     * @Author   王柳
     * @DateTime 2017-11-21
     */
    getList() {
      this.$http.post("/ExplicitWord/Search", {
          query:JSON.stringify({
            SearchOrderBy:{
               ColumnName:'hot'
            },
          }),
          ps:30
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.Code == 200) {
            // this.getChildList(res.data.Data[0].Id);
            this.relateExpList = res.data.Data.ItemList;
          }else{
            // alert(res.data.Description);
          }
        })
    },
    
  },

  mounted() {
    //最新资源
    this.getNewestList();
    //行业相关推荐
    this.getRecommendList();
    
    //热门知识元
    this.getList();


    //关闭loading动画
    // document.getElementById("hideLoadingView").click();
    
    //相关推荐
    
    //得到随机宽度
    this.getRandomWidth();

    //每次加载生成知识元的随机数，只生成一次
    for(let i = 0 ; i < 50 ; i ++) {
      this.contentRandom.push(Math.ceil(Math.random() * 10));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
   // .logo img:nth-of-type(4) {
   //       position: absolute;
   //       z-index: 2;
   //       right: 7rem ;
   //       width: 0.4rem !important;
   //       height: 0.4rem !important;
   //     }
</style>
