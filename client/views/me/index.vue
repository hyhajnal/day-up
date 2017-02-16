<template>
  <div class="content content_head content_bottom">
    <p v-for="item in list" v-text="item"></p>
    <infinite :doNext="getData" :distance="distance" 
    ref="infiniteLoading"></infinite>
  </div>
</template>

<script>
import Infinite from '../../components/InfiniteLoading'
export default {
  name: 'InfiniteLoading',
  data() {
    return {
      distance: 100,
      list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      control: {
          header: true,
          bottom: true,
          title: '无限滚动',
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
    Infinite
  },
  methods: {
    getData () {
      setTimeout(function(){
        const count = this.list.length
        for (let i = count + 1; i < count + 10; i++ ){
          this.list.push(i)
        }
        const rsCount = Math.random() > .9 ? 0 : this.list.length

        this.$refs.infiniteLoading.$emit('InfiniteLoaded',rsCount)

      }.bind(this), 1000)
    }
    
  }
}
</script>

<style lang="css">
p{
  text-align: center;
}
</style>