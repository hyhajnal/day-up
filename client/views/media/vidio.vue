<template>
<div class="child_wrap">
  <mt-header title="视频播放器" fixed class="header">
    <mt-button icon="back"  slot="left" @click="goToHome"></mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <div class="content content_head">
  	
  </div>
</div>
</template>

<script>

import { MessageBox } from 'mint-ui'
export default {
  name: 'UploadTest',
  mounted() {
  	this.$store.commit('setBottom',false)
  },
  computed: {
    usr(){
      return this.$store.state.usr
    }
  },
  data() {
    return {

    }
  },
  methods:{
    goToHome(){
      this.$store.commit('setSidebar', true)
      this.$router.replace({ path:'/home'})
    }
  },
  components: {

    MessageBox
  }
}
</script>
<style>

</style>