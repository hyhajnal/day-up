<template>
<div class="child_wrap">
  <mt-header title="我的头像" fixed class="header">
    <mt-button icon="back"  slot="left" @click="goToHome"></mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <div class="content content_head">
  	<upload-img :oldImg="usr.avator" :options="options"></upload-img>
  </div>
</div>
</template>

<script>
import UploadImg from '../components/FileOption/UploadImg'
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
      selected: '1',
      popupVisible: false,
      task: null,
      options:{
        success: (data) => {
          data = JSON.parse(data)
          if(data.success){
            const user = {
                  _id: data.data._id,
                  name: data.data.name,
                  avator: data.data.avator
                }
                this.$store.commit('setUsr', user)
          }else{
            MessageBox.alert('上传失败!', '提示')
          }
        },
        err: () => {
          MessageBox.alert('网络连接错误!', '提示')
        }
      }
    }
  },
  methods:{
    goToHome(){
      this.$store.commit('setSidebar', true)
      this.$router.replace({ path:'/home'})
    }
  },
  components: {
    UploadImg,
    MessageBox
  }
}
</script>
<style>

</style>