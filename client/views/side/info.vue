<template>
<div class="child_wrap">
  <mt-header title="我的信息" fixed class="header">
      <i class="iconfont icon-side" slot="left" @click="openSidebar"></i>
      <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
	<div class="content content_head content_bottom">

	</div>
</div>
</template>

<script>
export default {
  name: 'page-navbar',
  mounted() {
  	this.$store.commit('setBottom',false)
  	//this.begin = false
  },
  data() {
    return {
    }
  },
  methods:{
    openSidebar() {
      this.$store.commit('setSidebar', true)
    }

  },
  components: {
  
  }
}
</script>
<style lang="scss" scoped>



</style>