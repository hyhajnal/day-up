<template>
  <div id="app">
    <div class="page" :class="{'active': sidebar}">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>

      <bar v-if="bottom">
        <bar-item path="/home" label="作业" icon="toucan"></bar-item>
        <bar-item path="/chat" label="班级" icon="monkey"></bar-item>
        <bar-item path="/find" label="发现" icon="crab"></bar-item>
        <bar-item path="/me" label="小黑屋" icon="duck"></bar-item>
      </bar>
    </div>

    <div class="side-lay" :class="{'active': sidebar}">
      <div class="overlay" @click="closeSidebar"></div>
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
import Bar from 'components/Bar/Bar'
import BarItem from 'components/Bar/BarItem'

export default {
  name: 'App',
  data () {
    return {
      sideList: [
        {icon:'icon-toucan',path:'/',content: "首页", active: true},
        {icon:'icon-me',path:'/info',content: "我", active: false},
        {icon:'icon-people',path:'/time',content: "习惯", active: false},
        {icon:'icon-shouji',path:'/tip',content: "提示音", active: false}
      ]
    }
  },
  computed: {
    bottom () {
      return this.$store.state.bottom
    },
    sidebar () {
      return this.$store.state.sidebar
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
      this.$store.commit('setSidebar', false)
      this.sideList.forEach(function(i,v){
        i.active =false
      })
      this.sideList[index].active = true
      this.$router.replace({ path:this.sideList[index].path} )
    },
    closeSidebar() {
      this.$store.commit('setSidebar', false)
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
    .overlay{
      position: absolute;
      width: $width;
      height: $height;
      top: 0;
      left: $width / 2;
      background: rgba(0,0,0,0.6);
    }
  }

  .page.active{
    transform: translateX($width / 2);
  }


  .side-list{
    li{
      padding:15px 20px;
      text-align:left;
      i{
        margin-right:10px; margin-left:20px;
      }
    }
    .active{
        border-left:4px solid #ED5565;
        background:#222;
      }
  }
</style>
