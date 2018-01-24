<template>
  <!-- <section class="search-bar">
     
  </section> -->
  <section class="top-bar">
    <section class="header">
     <figure slot="left" class="logo">
         <img src="../../assets/images/index/返回@3x.png" @click="historyBack()"/>

         <img src="../../assets/images/index/扫码(1)@3x.png" @click="toNative(2)" style="opacity:0"/>
         <img src="../../assets/images/index/购物车@3x.png" @click="toNative(3)"/>
         <img src="../../assets/images/index/搜索@3x.png" @click="fullTextSearch"/>
         <img src="../../assets/images/index/清空@3x.png" v-show="keyword !== ''" @click=" keyword = ''"/>
     </figure>

     <section class="input">
       <select v-model="selected" :style="{background:'url('+ selectBgimg()+') no-repeat scroll right 0.2rem transparent',backgroundSize:'0.22rem 0.14rem',marginTop:'0.02rem'}">
         <option value="1">资源</option>
         <option value="2">标签</option>
       </select>
       <input type="text" placeholder="请输入您要搜索的内容" v-model="keyword">
     </section>

   </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      keyword:'',
      selected:'1',
      getSearchType:true,
    }
  },
  props:['type','execGetSearchType'],
  methods:{
    
    fullTextSearch() {
      let path = '/productsearch';
      if(this.selected == '2') {
         path = '/searchresult';
      }

      
      this.$router.push({
        path:path,
        query:{
          keyword:this.keyword
        }
      })

      // console.log(path)
      // console.log(this.keyword,this.selected);
    },
    historyBack() {
      history.go(-1);
    }
  },


  mounted() {
    // this.$emit('sayHello',true);
    this.selected = this.type || 1;
    // this.getSearchType = true;
  },

  watch:{
    'execGetSearchType':function(nv) {
       this.$emit('getSearchType',parseInt(this.selected))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
   .search-bar {

   }
   
   .pa(@left,@top) {
      position: absolute;
      left: @left;
      top: @top;
    }
    
    .pr() {
      position: relative;
      left: 0;
      top: 0;
    }

   .top-bar {
     position: fixed;
     left: 0;
     top: 0;
     z-index: 2;
     display: flex;
     justify-content: flex-start;
     align-items: center;
     width: 100%;
     height: 0.83rem;
     background: #2672c0;
     .header {
       top:0.12rem;
       .logo img:nth-of-type(2) {
         right: 6.64rem;
         z-index: 2;
       }

       .logo img:nth-of-type(4) {
         position: absolute;
         z-index: 2;
         right: 7.5rem;
         width: 0.4rem;
         height: 0.4rem;
       }

       input {

       }
     }
   }


   .header {
     .pa(0,0.67rem);
     display: flex;
     justify-content: flex-start;
     align-items: center;
     z-index: 999;
     width: 100%;
     height: 0.6rem;
     .logo {
       display: flex;
       justify-content: center;
       align-items: center;
       color:white;
       /*position: relative;*/
       img {
        width:.5rem;
        height: .5rem;
       }
       img:nth-of-type(1) {
        margin-left: .5rem;
        height: .32rem;
        width:.2rem;
       }
       img:nth-of-type(2) {
        position: absolute;
        right: 5.64rem;
       }
       img:nth-of-type(3) {
        position: absolute;
        right: .32rem;
       }

       img:nth-of-type(4) {
         position: absolute;
         right: 7rem !important;
       }

       img:nth-of-type(5) {
         position: absolute;
         z-index: 9;
         width:.3rem;
         height: .3rem;
         right: 7.6rem !important;
       }
     }

    .input {
      .pa(50%,0);
      margin-left: -3.5rem ;
      width: 7rem;
      height: 100%;
        select {
            float: left;
            .pr();
            z-index: 999;
            width: 1rem;
            height: 100%;
            background: transparent;
            border: none;
            color:white;
            margin-right: -1.5rem;
            margin-left: 0.3rem;
            margin-top: 0.05rem;
            outline: none;
            border: none;
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;
            // background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right 0.2rem transparent;
            // padding-right: 0.1rem;


      option {
        padding: 0;
          margin:0;
          float:left;
          height: 26px;
          padding: 10px 0;/*当时解决输入框光标顶满input框的问题是这么解决的 如果设置了行高就会顶满没有行高的话光标高度=文字的font-size */
          border: none;
          outline: none;
          padding-left: 20px;
          color:#6d6d6d;
          -webkit-appearance:none; /*去除系统默认的样式*/
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);   /* 点击去除高亮的颜色*/
          background-color: #fff;/*当input框禁止输入的时候会有一个灰色的底色 */
      }
      }

      input {
        float: left; 
        width: 100%;
        height: 100%;
        background: #ddd;
        opacity: 0.5;
        border-radius: 0.3rem;
        outline: none;
        // color:#fff;
        padding-left: 1.4rem;
        padding-top: 0.05rem;
        padding-right: 1.35rem;
        border: none
            // color:white;
      }

       ::-webkit-input-placeholder { /* WebKit browsers */ color:#000; } 
       

    }  
   }
</style>
