import Vue from 'vue';
import axios from './http.js'

Vue.prototype.$http = axios;

export default {
  install(Vue, options) {
      Vue.prototype.defaultImg = './static/img/未排序@2x.png'
      Vue.prototype.upOrderImg = './static/img/高升序@2x.png'
      Vue.prototype.downOrderImg = './static/img/降序@2x.png'
      Vue.prototype.objectTypeImg = {
          book:'./static/img/列表上的角标图书@3x.png',
          video:'./static/img/列表上的角标视频@3x.png',
          course:'./static/img/列表上的角标课程@3x.png',
          tool:'./static/img/列表上的角标工具书手册@3x.png',
          img:'./static/img/列表上的角标图片@3x.png',
          standard:'./static/img/列表上的角标标准@3x.png',
      }
      /**
       * [renderActionType 渲染操作类型列]
       * @Author   罗文
       * @DateTime 2017-10-26
       * @return   {[type]}   [description]
       */
    Vue.prototype.toDetail = function(id) {
        this.$http.get("/Content/Search", {
          params:{
             ObjectId:id,
          }
        })
        .then((res) => {
          if (res.data.Code == 200) {
            
          }else{
            // alert(res.data.Description);
          }
        })
    }



    /**
     * [toNative 调用本地方法]
     * @Author   罗文
     * @DateTime 2017-12-19
     * @param    {[Number]}   type [操作类型 1 - 去个人中心  2 - 扫码  3 - 去购物车  4 - 去详情]
     * @param    {[Number]}   id [description]
     * @param    {[Object]}   options [其他配置参数,主要是用于详情相关]
     * @return   {[type]}        [description]
     */
    Vue.prototype.toNative = function(type,options,productId) {
      switch (type) {
        case 1:
          document.getElementById("toUserCenter").click();
          break;
        case 2:
          document.getElementById("torichScan").click();
          break;
        case 3:
          document.getElementById("toShoppingCar").click();
          break;
        case 4:
          //isExplicitWord - 是否查询的是知识元
          document.getElementById("toDetail").setAttribute('data-options', JSON.stringify(options));
          document.getElementById("toDetail").click();
          break;

        case 5: //打开子产品
          document.getElementById("openProduct").setAttribute('data-productId', productId);
          document.getElementById("openProduct").click();
          break;          
        default:
          // statements_def
          break;
      }
    }


    Vue.prototype.bgImg = function(item,isExp) {
      if(isExp) return item.CoverUrl ? item.CoverUrl : './static/img/知识元占位图@2x.png';
      return item.CoverUrl ? item.CoverUrl : './static/img/占位图@2x.png';
    }

    
    /**
     * [getImgByType 根据资源类型，返回资源对应的icon]
     * @Author   罗文
     * @DateTime 2018-01-09
     * @param    {[type]}   item [description]
     * @return   {[String]}        [资源对应的icon]
     */
    Vue.prototype.getImgByType = function(item) {
      switch(item.ObjectType) {
        case 102:  //章节
           return this.objectTypeImg.book;
        break;
        case 103:  //标准
           return this.objectTypeImg.standard;
        break;
        case 104:  //图书
           return this.objectTypeImg.book;
        break;
        case 107:  //课程
           return this.objectTypeImg.course;
        break;
        case 109:  //视频
           return this.objectTypeImg.video;
        break;
        case 108:  //图片
           return this.objectTypeImg.img;
        break;
        default:
           return this.objectTypeImg.book;
        break;
      }
    }



    Vue.prototype.selectBgimg = function () {
      return './static/img/小三角@2x.png';
    }



    //----------------------------------------------------------
    //     去掉字符串前后的空格
    //    返回值：
    //    去除空格后的字符串
    //----------------------------------------------------------
    Vue.prototype.trim = function (param) {
      let vRet = '';
      
      if ((vRet = param) == '') { return vRet; }
      while (true) {
          if (vRet.indexOf (' ') == 0) {
              vRet = vRet.substring(1, parseInt(vRet.length));
          } else if ((parseInt(vRet.length) != 0) && (vRet.lastIndexOf (' ') == parseInt(vRet.length) - 1)) {
              vRet = vRet.substring(0, parseInt(vRet.length) - 1);
          } else {
              return vRet;
          }
      }
    }

    
    /**
     * [dealLineNum 处理循环的行数]
     * @Author   罗文
     * @DateTime 2018-01-10
     * @param    {[Array]}   dataList [数据数组]
     * @param    {[Number]}   num      [每行多少条数据]
     * @return   {[type]}            [description]
     */
    Vue.prototype.dealLineNum = function (dataList,num) {
        //如果少于一行。就返回一行
        if(dataList.length - dataList.length % 4 == 0 ) return 1;
        
        return (dataList.length - dataList.length % 4)/4 ;
    }





  }
}
