<template>
<div class="child_wrap">

	<div class="blurEffect" :style="{backgroundImage: 'url(' + taskList[cardIndex].img + ')'}">
	</div>

	<div class="card_block content_head">
    <card-black :title="taskList[cardIndex].title" 
    :subtitle="taskList[cardIndex].subtitle" 
    :num="taskList[cardIndex].num"
    :time="taskList[cardIndex].time" 
    :img="taskList[cardIndex].img"
    @timeout="nextCard">
    </card-black>
	</div>

  <mt-popup v-model="popup" position="bottom" class="popup">
    <p class="align-c">按你的直觉给作业排个序吧！</p>
    <to-drag class="drag_wrap" 
      :items="items" :gutter="8" :i="i">
        <transition-group name="dragfade" tag="ul">
            <li v-for="(item,index) in items" :key="item">
              <span @click="i = index" class="title">{{item.task}}</span>
              <span class="time">
                <input type="text" value="" placeholder="预计完成时间">
                <em>min</em>
              </span>
            </li>
        </transition-group>
      </to-drag>
      <div class="ok_btn" @click="popup = false">
        ok?
      </div>
  </mt-popup>
</div>
</template>

<script>
import Fix from '../../components/Fix'
import ToDrag from '../../components/ToDrag'
import CardBlack from '../../components/BlackRoom/CardBlack'
export default {
  name: 'TaskList',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
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
      control: {
          header: true,
          bottom: false,
          title: '小黑屋',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      },
      items: [
      	{task:'抄写', complete:false},
      	{task:'听写', complete:false},
      	{task:'数学科特', complete:true},
      	{task:'跳绳3次', complete:false},
        {task:'抄写', complete:false},
        {task:'听写', complete:false}

      ],
      taskList:[
        {
          title: '数学',
          subtitle: '数学课特19-20',
          time: '00:00:10',
          num: 46,
          img: '/images/1.jpg'
        },
        {
          title: '语文',
          subtitle: '语文听写第3课',
          time: '00:00:20',
          num: 23,
          img: '/images/2.jpg'
        },
        {
          title: '英语',
          subtitle: '英语阅读2篇',
          time: '00:00:05',
          num: 43,
          img: '/images/3.jpg'
        },
        {
          title: '体育',
          subtitle: '锻炼3小时',
          time: '00:40:00',
          num: 36,
          img: '/images/4.jpg'
        }
      ],
      cardIndex:0, //当前卡片
      i: -1
    }
  },
  components: {
  	Fix,
  	ToDrag,
    CardBlack
  },
  methods: {
    nextCard (){
      this.cardIndex < this.taskList.length - 1 ? this.cardIndex ++ : this.taskList.length - 1
    }
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
      margin:5rem auto;
      position:relative;
      li{
        background:none;
        padding:1rem;
        border-radius:4px;
        margin:8px 0px;
        display:flex;
        justify-content: space-around;
        .title{
          width:40%;
        }
        .time{
          text-align:right;
          input{
            background:none;
            text-align:right;
          }
        }
      }
    }
}

</style>