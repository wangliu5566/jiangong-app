<template>
  <section class="side-bar-container" >
    资源id为：{{resourceId}}
  </section>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      resourceId:this.$route.query.id
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
