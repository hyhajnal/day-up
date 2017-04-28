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

    <div class="overlay" @click="closeSidebar" v-if="sidebar"></div>

    <div class="side-lay" :class="{'active': sidebar}">
      <img v-if="usr && usr.avator" :src="usr.avator" alt="" width="60" height="60" @click="changeAvator()">
      <img v-if="usr && !usr.avator" src="/images/404.png" alt="" width="60" height="60" @click="changeAvator()">
      <p v-if="usr">{{ usr.name }}</p>
      <div class="info">
        <div class="info_item">
          <span>当前积分</span>
          <div>346</div>
        </div>
        <div class="info_item">
          <span>计划匹配</span>
          <div>67%</div>
        </div>
      </div>
      <ul class="side-list">
        <li v-for="(item, index) in sideList"  @click="goRoute(index)" 
        :class="{'active':item.active}">
          <i :class="'iconfont '+ item.icon"></i>{{item.content}}
        </li>
      </ul>
      <p @click="logout">退出</p>
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
      ],
      avator:''
    }
  },
  computed: {
    bottom () {
      return this.$store.state.bottom
    },
    sidebar () {
      return this.$store.state.sidebar
    },
    usr(){
      return this.$store.state.usr
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
    changeAvator () {
      this.$store.commit('setSidebar', false)
      this.$router.replace({ path:'img'} )
    },
    closeSidebar() {
      this.$store.commit('setSidebar', false)
    },
    logout(){
      this.$store.commit('setSidebar', false)
      this.$store.commit('setUsr', null)
      window.sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>


<style lang="scss">
  
  $width:100vw;
  $height:100vh;
  $move: $width / 1.5;  //sidebar所占大小

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
  .page,.side-lay,.overlay{
    transition: all 1s ease;
  }
  .side-lay{
    position: absolute;
    top: 0;
    left: -$move;
    width:$move;
    height:$height;
    background:#2b2b2b;
    color:#fff;
    transform: translate3d(0, 0, 100px); 
    text-align:center;
      img{
        border-radius:100%;
        margin:40px 0 0;
      }

      .info{
        display: flex;
        justify-content:space-around;
        margin-bottom: 1.5rem;
        .info_item span{
          font-size: .8rem;
        }
      }
  }
  .side-lay.active{
    transform: translate3d($move, 0, 100px); //ios塌陷bug
  }

  .overlay{
      position: absolute;
      width: $width;
      height: $height;
      top: 0;
      left:0;
      background: rgba(0,0,0,0.6);
      transform: translate3d(0, 0, 99px); //ios塌陷bug
  }

  .page.active{
    overflow: hidden;
    transform: perspective(400px) rotateY(-16deg) translate3d($move, 0, 0) scale(0.8);
  }


  .side-list{
    li{
      padding:12px 20px;
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
