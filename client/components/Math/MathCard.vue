<template>
<div>
  <div class="swipe-card" :class="{'pop-out':swipe}" ref="card" :style="{'z-index': (100-i)}">
      <div class="title" v-text="title"></div>
      <div class="problem" >{{ content }} = <em v-text="answer">?</em></div>
      <div class="result" v-if="rs!= null">
        <div class="true" v-if="rs">
          <a href=""></a>
        </div>
        <div class="false" v-if="!rs">
          <a href=""></a>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default{
	props: ['title','content','answer','i','rs'],
	data () {
		return {
			swipe: false
		}
	},
	mounted () {
		this.swipeFun()
	},
	methods: {
		swipeFun () {
	      var myElement = this.$refs.card
	      var mc = new Hammer(myElement)
	      mc.get('swipe').set({
	        direction: Hammer.DIRECTION_RIGHT,
          pointers: 1
	      })
	      mc.on("swipe", (ev) => {
	          //myElement.textContent = ev.type +" gesture detected."
	          //myElement.style.left = ev.deltaX + 'px'
	          this.swipe = true 
            setTimeout( () => {
              myElement.style.display = 'none'
            }, 1100)  
            this.$emit('throw')       
	      })
	    }
	}
}
</script>

<style lang="scss">
.swipe-card {
  width:70%;
  padding:1rem 0;
  background-color: #fff;
  border-radius: 4px;
  position:absolute; 
  top:30%;
  left:0; right:0; margin:auto;
}

.swipe-card .title {
  padding: 5px;
  color: #fff;
  background:#ee4d4d;
  position:relative;
  margin-left:-4px;
  display:inline;
  &:before{
    content:'';
    position:absolute;
    top:-4px;
    left:0;
    width: 0;
    height: 0;
    border-bottom: 4px solid red;
    border-left: 4px solid transparent; 
  }
}


@keyframes ballmove {
    0% {
      transform-origin: right top;
      transform: translateX(0) translateY(0) rotate(0);
    }               
  100% {
    transform-origin: right top;
    transform: translate(100px, -100px) rotate3d(0, 0, 1, 90deg) scale(.1);
  }
}

.swipe-card.pop-out {
  -webkit-animation: ballmove 1s ease-out;
  animation-fill-mode:forwards; 
}


.problem{
  width:100%;
  text-align:center;
  font-size:2rem;
  font-weight:bold;
  margin-bottom:1rem;
}

/* 打勾 打叉 */
.true{
  text-align:center;
  a{ display: inline-block; width: 10px;height:5px; background: red;line-height: 0;font-size:0;vertical-align: middle;-webkit-transform: rotate(45deg);}
  a:after{content:'/';display:block;width: 20px;height:5px; background: red;-webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);}
}

.false{
  text-align:center;
  a{ display: inline-block; width: 20px;height:5px; background: red;line-height: 0;font-size:0;vertical-align: middle;-webkit-transform: rotate(45deg);}
  a:after{content:'/';display:block;width: 20px;height:5px; background: red;-webkit-transform: rotate(-90deg);}
}

</style>