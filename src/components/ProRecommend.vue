<template>
  <section class="container" >
    
    <div class="proRecommend">
      <ul>
        <!-- toNative(5,{},1) -->
        <li @click="productIndex = index" v-for="(item,index) in productContent">
          <div>
            <img :src="item.logo" alt="i施工图标" :style="{width: index == 2 ? '2.4rem':''}">
          </div>
          <p>{{item.title}}</p>
        </li>
<!--         <li @click="toNative(5,{},2)">
          <div>
            <img src="../assets/images/index/i土木@2x.png" alt="i施工图标">
          </div>
          <p>I土木</p>
        </li>
        <li @click="toNative(5,{},3)">
          <div>
            <img src="../assets/images/index/建筑工业出版社图标.png" alt="建筑工业出版社图标" style="width: 2.4rem">
          </div>
          <p>中国建筑出版s官网</p>
        </li> -->
      </ul>
      <div>
        <div class="right-top">
          <div>
            <img :src="productContent[productIndex].logo" alt="" :style="{width: productIndex == 2 ? '4.5rem':''}">
          </div>
          <div>
            <p>{{productContent[productIndex].title}}</p>
            <p>中国建筑出版社出品</p>
          </div>
          <button @click="centerDialogVisible = productIndex !== 2 ? true:false">{{productIndex == 2 ? '打开在线官网':'打开应用'}}</button>
        </div>
        <div class="pro-abs-cont " style="margin-top: 0.6rem">
          <div style="width: 1rem">简介：</div>
          <div class="pro-abstracts" style="font-size:0.3rem">
             <p>
               {{productContent[productIndex].abs[0]}}
             </p>
             <p>
               {{productContent[productIndex].abs[1]}}
             </p>
          </div>
        </div>
      </div>
    </div>


    <el-dialog
      custom-class="pop-up-box"
      title=""
      :visible.sync="centerDialogVisible"
      width="40%"
      :show-close="false"
      center>
      <div class="dia-body">
        <img src="../assets/images/list/提示icon@2x.png" >
        <img :src="productContent[productIndex].erweima" style="width:2rem;height: 2rem;">
        <span slot="footer" class="dialog-footer">
          <button @click="centerDialogVisible = false">扫码直接下载{{productContent[productIndex].title}}</button>
        </span>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      centerDialogVisible: false,
      productIndex:0,
      productContent:[
        {
          title:'I施工',  //标题
          logo:'./static/img/i施工图标@2x.png',
          erweima:'./static/img/i施工Android-v1.1.27d-20171219.png',  //二维码
          abs:[
          '中国建筑工业出版社的“i施工”产品是从建筑施工领域从业人员的实际需要出发，以《建筑施工手册（第五版）》内容为基本架构，针对建筑施工专业特点而开发的建筑施工专业知识资源库与信息服务平台。',
          '内容：划分为建筑施工工艺工法资源库、建筑施工管理与技术文件资源库、建筑材料与施工机具设备产品选型库、建筑施工全过程可视化资源库和建筑施工专业人员的在线学习互动平台，为建筑施工从业人员和学习研究人员提供高品质的专业知识服务，即四库一平台。'
          ],  //简介
        },
         {
          title:'I土木',  //标题
          logo:'./static/img/i土木@2x.png',
          erweima:'./static/img/I土木.png',  //二维码
          abs:[
            '建筑结构与岩土工程专业知识资源库是中国建筑工业出版社从建筑结构与岩土工程专业领域从业人员的实际需求出发，搭建的面向建筑结构和岩土工程领域全体从业人员的知识服务平台。',
            '内容：划分为建筑结构及岩土工程两个子库，覆盖标准规范，设计资料，设计软件，工程案例以及在线学习互动平台（包括注册考试培训、专家微课、会议报告、访谈视频、专家答疑）等方面。'
          ],  //简介
        },
         {
          title:'中国建筑工业出版社',  //标题
          logo:'./static/img/cbzxlogo@3x.png',
          erweima:'./static/img/I土木.png',  //二维码
          abs:[
          '中国建筑工业出版社的“i施工”产品是从建筑施工领域从业人员的实际需要出发，以《建筑施工手册（第五版）》内容为基本架构，针对建筑施工专业特点而开发的建筑施工专业知识资源库与信息服务平台。',
          '内容：划分为建筑施工工艺工法资源库、建筑施工管理与技术文件资源库、建筑材料与施工机具设备产品选型库、建筑施工全过程可视化资源库和建筑施工专业人员的在线学习互动平台，为建筑施工从业人员和学习研究人员提供高品质的专业知识服务，即四库一平台。'
          ],
        },
      ]
    }
  },
  methods:{
    
  },

  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>
