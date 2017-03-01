<template>
  <div class="login_wrap">
    <div class="form_wrap"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      control: {
          header: true,
          bottom: false,
          title: '登陆',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      }
    }
  },
  mounted () {
    this.$store.commit('setNavbar', this.control)
  },
  components: {
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
.login_wrap{
  width:100%;
  height:100%;
  .form_wrap{
    width:80%;
    height:50%;
    background:#ccc;
    position:absolute;
    left:0;top:0;bottom:0;right:0;
    margin:auto;
  }
}
</style>