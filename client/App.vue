<template>
  <div id="app">
    <div class="page">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
      <bar v-if="isIndex">
        <bar-item path="/home" label="作业" icon="toucan"></bar-item>
        <bar-item path="/chat" label="班级" icon="monkey"></bar-item>
        <bar-item path="/find" label="发现" icon="crab"></bar-item>
        <bar-item path="/me" label="计划" icon="duck"></bar-item>
      </bar>
    </div>

    <div class="side-lay">
      侧边栏
    </div>
  </div>
</template>

<script>
import Bar from './components/Bar'
import BarItem from './components/BarItem'

export default {
  name: 'App',
  data () {
    return {
      /*
      transitionName: 'slide-left'*/
    }
  },
  computed: {
    isIndex () {
      return this.$store.state.navbar
    }
  },
  /*watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },*/
  components: {
    Bar,
    BarItem
  }
}


</script>


<style lang="scss" >
  @import "../static/css/help/base.scss";
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
  }
  .slide-fade-enter {
    transform: translateX(100px);
    opacity: 0;
  }

</style>
