<template>
<div class="child_wrap">
  <mt-header title="小黑屋" fixed class="header">
    <i class="iconfont icon-mima" slot="right" @click="goRoute()"></i>
  </mt-header>
	<div class="blurEffect" :style="{backgroundImage: 'url(' + img + ')'}">
	</div>

	<div class="card_block content_head">
    <card-black v-if="!currentPCB.special"
    :title="currentPCB.contentId.tag" 
    :subtitle="currentPCB.contentId.content" 
    :num="currentPCB.contentId.num"
    :stime="currentPCB.s_time" 
    :etime="currentPCB.e_time"
    :done="currentPCB.done"
    :img="img"
    @timeout="nextCard">
    </card-black>
    <!-- 特殊任务 -->
    <card-black v-if="currentPCB.special"
    :title="currentPCB.content" 
    :stime="currentPCB.s_time" 
    :etime="currentPCB.e_time" 
    :img="img"
    :done="currentPCB.done"
    @timeout="nextCard">
    </card-black>
	</div>

  <mt-popup v-model="popup" position="bottom" class="popup">
    <p class="align-c">按你的直觉给作业排个序吧！</p>
    <to-drag class="drag_wrap" 
      :items="items" :gutter="8" :i="i">
        <transition-group name="dragfade" tag="ul">
            <li v-for="(item,index) in items" :key="item">
              <span @click="i = index" class="title">{{item.content}}</span>
              <span class="time">
                <input type="text" value="" placeholder="预计" size="6">
                <em>min</em>
              </span>
            </li>
        </transition-group>
      </to-drag>
      <div class="ok_btn" @click="closePlan">
        ok?
      </div>
  </mt-popup>
</div>
</template>

<script>
import Fix from '../../components/Fix'
import ToDrag from '../../components/ToDrag'
import CardBlack from '../../components/BlackRoom/CardBlack'
import { mapGetters } from 'vuex'
import PlanManage from '../../components/BlackRoom/planManger'
import { MessageBox } from 'mint-ui'
export default {
  name: 'TaskList',
  mounted() {
    this.$store.commit('setBottom',false)
    //如果没有设置空闲时间，则跳转到设置页面
    /*if(!this.$store.state.task.items){
      this.$router.replace({ path:'/time'} )
    }*/
    this.items = this.$store.state.task.items
  	setTimeout(()=> {
      this.popup = true
    }, 500)
  },
  beforeRouteUpdate (to, from, next) {
    next(vm => {
    	vm.begin = true   	
  	})
  },
  data() {
    return {
      popup: false,
      begin: true,	
      selected: '1',
      popupVisible: false,
      items: null,
      img: '/images/1.jpg',
      i: -1
    }
  },
  components: {
  	Fix,
  	ToDrag,
    CardBlack,
    MessageBox
  },
  methods: {
    nextCard (done){
      if(this.currentPCB.id == this.pcbs[this.pcbs.length - 1]){
        this.$store.dispatch('switch_pcb')
      }
    },
    closePlan() {
      this.popup = false
      /*const spareTime = this.$store.state.task.spareTime
      const planManger = new PlanManager(this.items,spareTime)
      this.$store.dispatch('init_pcbs',planManger.getPCBs)*/
    },
    goRoute(){
      let _this = this
      MessageBox.confirm('确定退出黑屋模式?').then(action => {
        _this.$router.replace({path:'/'})
      })
    }
  },
  computed: {
    ...mapGetters({
      currentPCB: 'currentPCB',
      pcbs: 'pcbs'
    })
  }
}
</script>
<style lang="scss" scoped>
#div1{
	width:100px;
	height:100px;
	background-color:pink;
}
.child_wrap{
	width:100%;
	max-height: vh;
	height: 100%;
	.blurEffect{
		position:absolute;
		background-image:url('/images/2.jpg');
		background-size:cover;
		-moz-filter: blur(55px);
	    -webkit-filter: blur(55px);
	    -o-filter: blur(55px);
	    -ms-filter: blur(55px);
	    filter: blur(55px);
		height: 100%;
		width:100%;
	}
	.content{
		padding-top:7.5rem;
		position:relative;
	}
}

.ok_btn{
  width:4rem;
  height:4rem;
  background:#26a2ff;
  text-align:center;
  line-height:4rem;
  border-radius:100%;
  font-size:2rem;
  color:#fff;
  position:absolute;
  left:50%; bottom:4rem; 
  transform:translateX(-50%);
}
.item-drag{
	background:none;
}
.mint-navbar.is-fixed{
	top:2.5rem;
}
.mint-navbar .mint-tab-item.is-selected{
	margin-bottom: 0px;
}
.fix-bar{
	width:100%;
	display: inline-block;
	background: pink;
}

/* 1. declare transition */
.dragfade-move, .dragfade-enter-active{
	transition: all .5s cubic-bezier(.55,0,.1,1);
}
/* 2. declare enter from and leave to state */
.dragfade-enter{
	opacity: 0;
}
/* 3. ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
.dragfade-leave-active {
	display: none;
}

.popup{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.8);
  color:#fff;

  .drag_wrap{
      width:90%;
      max-height:90%;
      overflow-y:auto;
      -webkit-overflow:touch;
      margin:1rem auto;
      position:relative;
      li{
        background:none;
        padding:1rem;
        border-radius:4px;
        margin:8px 0px;
        display:flex;
        justify-content: space-around;
        .title{
          padding:0 .5rem;
        } 
        .time{
          text-align:right;
          input{
            background:none;
            text-align:right;
            color:#fff;
          }
        }
      }
    }
}

</style>