<template>
  <div id="app">
    <div class="page" :class="{'active': sidebar}">
      <mt-header :title="ctrl.title" fixed class="header" v-if="ctrl.header">
        <router-link :to="ctrl.content.url" slot="left" v-if="ctrl.content.url">
          <mt-button :icon="ctrl.content.icon1" @click.native.prevent="sidebar = !sidebar"></mt-button>
        </router-link>
        <mt-button :icon="ctrl.content.icon2" slot="right" v-if="ctrl.content.icon2"></mt-button>
      </mt-header>
      <!-- <mt-search
        v-model="value"
        cancel-text="取消"
        placeholder="搜索">
      </mt-search> -->
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
      <bar v-if="ctrl.bottom">
        <bar-item path="/home" label="作业" icon="toucan"></bar-item>
        <bar-item path="/chat" label="班级" icon="monkey"></bar-item>
        <bar-item path="/find" label="发现" icon="crab"></bar-item>
        <bar-item path="/me" label="计划" icon="duck"></bar-item>
      </bar>
    </div>

    <div class="side-lay" :class="{'active': sidebar}">
      侧边栏
    </div>
  </div>
</template>

<script>
import Bar from './components/Bar'
import BarItem from './components/BarItem'

export default {
  name: 'App',
  mounted() {
    this.$store.commit('setNavbar', this.control)
  },
  data () {
    return {
      control: {
        header: true,
        bottom: true,
        title: '首页',
        content: {
          icon1: 'back',
          icon2: 'more',
          url: '/'
        }
      },
      sidebar: false
    }
  },
  computed: {
    ctrl () {
      return this.$store.state.ctrl
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
  .header{
    background-color: #2b2e48 !important;
  }
  .page,.side-lay{
    transition: all .8s ease;
  }
  .side-lay{
    position: absolute;
    top: 0;
    left: -50%;
    width:50%;
    height:100%;
    background: #000;
    z-index: 2000;
    color:#fff;
  }
  .side-lay.active{
    transform: translateX(10rem);
  }

  .page.active{
    transform: translateX(10rem);
  }
</style>
