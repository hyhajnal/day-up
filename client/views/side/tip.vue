<template>
<div class="child_wrap">
	<div class="content content_head content_bottom">

	</div>
</div>
</template>

<script>
export default {
  name: 'page-navbar',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
  	//this.begin = false
  },
  data() {
    return {
      control: {
          header: true,
          bottom: true,
          title: '提示音选择',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      }
    }
  },
  methods:{

  },
  components: {
  
  }
}
</script>
<style lang="scss" scoped>



</style>