<template>
<div class="child_wrap">
	<mt-navbar v-model="selected" fixed>
	  <mt-tab-item id="1">日计划</mt-tab-item>
	  <mt-tab-item id="2">周计划</mt-tab-item>
	  <mt-tab-item id="3">期计划</mt-tab-item>
	</mt-navbar>

	<div class="blurEffect">
	</div>
	<div class="content content_head content_bottom">
		<!-- tab-container -->
		<mt-tab-container v-model="selected" swipeable>
		  <mt-tab-container-item id="1">

	      <mt-button type="default" @click="insert">default</mt-button>
		  <mt-button type="primary" @click="reset">primary</mt-button>
		  <mt-button type="danger"  @click="shuffle">danger</mt-button>

			<drag-drop :list="items" :options="{animation: 150, dragClass: 'item-drag'}">
		      <transition-group name="dragfade">
		        <mt-cell v-for="(item,index) in items"
		          :key="item.task"
		          :title="item.task" is-link>
		        </mt-cell>
		      </transition-group>
			</drag-drop>

		  </mt-tab-container-item>

		  <mt-tab-container-item id="2">
		    <mt-cell v-for="n in 4" :title="'测试 ' + n" is-link>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <mt-cell v-for="n in 6" :title="'选项 ' + n" is-link>
		  </mt-tab-container-item>
		</mt-tab-container>

		<!-- <fix :offsetTop="50">
		        <span class="fix-bar">固定在最顶部1</span>
		    </fix>
		<p v-for="n in 20">{{ n }}</p>
		<fix :offsetTop="50">
		        <span class="fix-bar">固定在最顶部2</span>
		    </fix>
		    <p v-for="n in 20">{{ n }}</p> -->
	</div>
</div>
</template>

<script>
import Fix from '../../components/Fix'
export default {
  name: 'TaskList',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
  	//this.begin = false
  },
  beforeRouteUpdate (to, from, next) {
    next(vm => {
    	vm.begin = true   	
  	})
  },
  data() {
    return {
      begin: true,	
      selected: '1',
      popupVisible: false,
      control: {
          header: true,
          bottom: false,
          title: '我的计划',
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

      ]
    }
  },
  methods:{
  	insert () {
        var i = Math.round(Math.random() * this.items.length)
        //this.items.splice(i, 0, id++)
    },
    reset () {
        //this.items = [1, 2, 3, 4, 5]
    },
    shuffle () {
        this.items = this.shuffler(this.items)
    },
    remove (i) {
        this.items.splice(i, 1)
    },
    shuffler(arr){
	    var result = [],
	        random;
	    while(arr.length>0){
	        random = Math.floor(Math.random() * arr.length)
	        result.push(arr[random])
	        arr.splice(random, 1)
	    }
	    return result
	}
  },
  components: {
  	Fix
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
		.mint-cell{
			background:rgba(255,255,255,1);
			width:90%;
			margin:1rem auto;
			border-radius:4px;
		}
		.mint-cell-allow-right::after{
				border:solid 2px #ffffff;
		}
	}
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
.dragfade-move, .dragfade-enter-active, .dragfade-leave-active {
	transition: all .5s cubic-bezier(.55,0,.1,1);
}
/* 2. declare enter from and leave to state */
.dragfade-enter, .dragfade-leave-to {
	opacity: 0;
	transform: scaleY(0.01) translate(30px, 0);
}
/* 3. ensure leaving items are taken out of layout flow so that moving
    animations can be calculated correctly. */
.dragfade-leave-active {
	position: absolute;
}

.cell-rotate{
	transform:rotateY(-90deg);
	animation-name: myRotateY;
	transform-origin:0% 50%;
	animation: myRotateY 1s;
	animation-fill-mode: forwards;
}
/* .mint-cell{
	transition: all .5s;
} */

@for $i from 1 through 10 { 
	.cell-#{$i} { 
		animation-delay: .5s * $i;
	} 
}

@keyframes myRotateY
{
	from {transform:rotateY(-90deg);}
	to {transform:rotateY(0deg);}
}


</style>