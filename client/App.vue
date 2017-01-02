<template>
  <div id="app">
    <div class="page page-current">
      <!-- <header class="bar bar-nav">
        <h1 class="title"><span class="icon icon-menu open-panel" data-panel='#panel-left'></span></h1>
      </header> -->
      <span class="icon icon-menu open-panel" data-panel='#panel-left'></span>
      <transition name="slide-fade">
        <router-view class="childPage" id="childPage"></router-view>
      </transition>
      <bar v-if="isIndex">
        <bar-item path="/home" label="首页" icon="home"></bar-item>
        <bar-item path="/chat" label="班级" icon="search"></bar-item>
        <bar-item path="/shopCart" label="发现" icon="app"></bar-item>
        <bar-item path="/me" label="我" icon="me"></bar-item>
      </bar>
    </div>
    <side-bar></side-bar>
    

  </div>
</template>

<script>
import Bar from './components/Bar'
import BarItem from './components/BarItem'
import SideBar from './components/SideBar'

export default {
  name: 'App',
  data () {
    return {
      isIndex: true/*,
      transitionName: 'slide-left'*/
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
    BarItem,
    SideBar
  }
}


</script>

<style scoped>
  .childPage{
    height: 100%;
    overflow-y: auto;
  }
  .childPage:after{
    content:'';
    height:2.5em;
    width:100%;
  }
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
