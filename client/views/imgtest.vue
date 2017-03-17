<template>
<div class="child_wrap">
  <mt-header title="测试上传" fixed class="header">
    <mt-button icon="back"  slot="left"></mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <div class="content content_head">
  	<upload-img></upload-img>
  </div>
</div>
</template>

<script>
import UploadImg from '../components/FileOption/UploadImg'
export default {
  name: 'UploadTest',
  mounted() {
  	this.$store.commit('setBottom',false)
  },
  data() {
    return {
      selected: '1',
      popupVisible: false,
      task: null
    }
  },
  methods:{
  },
  components: {
    UploadImg
  }
}
</script>
<style>

</style>