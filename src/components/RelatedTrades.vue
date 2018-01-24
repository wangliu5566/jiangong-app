<template>
  <section class="container" >
    <div class="course-con" v-for="(item,index) in recommendList">
      <div class="recommend">
        <img src="../assets/images/list/行业推荐.png">
      </div>
      <div>
        <div>
          <img src="../assets/images/common/商家logo.png"> <span>{{item.Title}}</span>
        </div>
        <p>
         <span>简介：</span><span>{{item.Description}}</span>
        </p>
      </div>
      <section class="new-resource related-lunbo" style="width:18.4rem;overflow:visible">
        <section class="new-resource-content" style="height:6rem">
          <div >
            <ul style="width:18.4rem;margin:0 auto">
               <li 
               class="list-item" 
               v-for="(citem,cindex) in item.ApiContentList" 
               :key="cindex" 
               @click="toNative(4,{id:citem.Id,isExplicitWord:false})"
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
          </div>
         </section>
       </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      newAidioIndex:0,
      relateExpList:[],
      contentColors:['#ac74b5','#c7d868','#f05a66','#45b3a8','#14a6fb','#f29c51','#00aeed','#67c23a','#eb9e05','#fa5555'],
      recommendList:[],
    }
  },
  methods:{
     handleChange(index) {
      this.newAidioIndex = index;
    },

    /**
     * [getNewestList 获取行业推荐资源]
     * @Author   罗文
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
        }else{
          // alert(res.data.Description);
        }
      })
    },
  },

  mounted() {
    //行业相关推荐
    this.getRecommendList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>