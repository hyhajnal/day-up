<template>
  <div id="app">
    <div class="page" :class="{'active': sidebar}">
      <mt-header :title="ctrl.title" fixed class="header" v-if="ctrl.header">
        <mt-button :icon="ctrl.content.icon1"  slot="left" v-if="ctrl.content.url"
         @click.native="showSideBar(ctrl.content.url)"></mt-button>
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
      <img src="images/1.jpg" alt="" width="60" height="60">
      <ul class="side-list">
        <li v-for="(item, index) in sideList"  @click="goRoute(index)" 
        :class="{'active':item.active}">
          <i :class="'iconfont '+ item.icon"></i>{{item.content}}
        </li>
      </ul>
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
      sidebar: false,
      sideList: [
        {icon:'icon-me',path:'/home',content: "首页", active: true},
        {icon:'icon-people',path:'/chat',content: "圈子", active: false},
        {icon:'icon-shouji',path:'/find',content: "发现", active: false},
        {icon:'icon-erweima',path:'/me',content: "更多", active: false}
      ]
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
  },
  methods:{
    goRoute (index) {
      this.sidebar = false
      this.sideList.forEach(function(i,v){
        i.active =false
      })
      this.sideList[index].active = true
      this.$router.replace({ path:this.sideList[index].path} )
    },
    showSideBar (url) {
      if(this.ctrl.bottom) {
        this.sidebar = !this.sidebar
      }else{
        this.$router.replace({ path:url} )
      }
    }
  }
}
</script>


<style lang="scss" >
  @import "../static/css/help/base.scss";
  $width:100vw;
  $height:100vh;
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
    left: -$width / 2;
    width:$width / 2;
    height:$height;
    /* background:linear-gradient(-45deg,orange,#2b2e48) 0 0 no-repeat; */
    background:#2b2b2b;
    /* background-size:cover; */
    z-index: 2000;
    color:#fff;
    text-align:center;
      img{
        border-radius:100%;
        margin:40px 0;
      }
  }
  .side-lay.active{
    transform: translateX($width / 2);
  }

  .page.active{
    transform: translateX($width / 2);
  }


  .side-list{
    li{
      padding:15px 20px;
      i{
        margin-right:10px;
      }
    }
    .active{
        border-left:4px solid #ED5565;
        background:#222;
      }
  }
</style>
