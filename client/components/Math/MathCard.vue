<template>
<div>
  <div class="swipe-card" :class="{'pop-out':swipe}" ref="card" :style="{'z-index': (100-i)}">
      <div class="title" v-text="title"></div>
      <div class="problem" >{{ content }} = <em v-text="answer">?</em></div>
      <div class="result" v-if="rs!= null">
        <!-- stroke-linecap 端点样式 -->
        <svg v-if="rs" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
          <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
          <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
        </svg>

        <svg v-if="!rs" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
          <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
          <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
          <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
        </svg>

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
  top:35%;
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

/*动效 打勾 打叉  */

svg {
  width: 2rem;
  display: block;
  margin: 0 auto;
}

.path {
  stroke-dasharray: 1000;  //1000px虚线，1000px实线
  stroke-dashoffset: 0;  //虚线开始位置
  &.circle {
    -webkit-animation: dash .9s ease-in-out;
    animation: dash .9s ease-in-out;
  }
  &.line {
    stroke-dashoffset: 1000;
    -webkit-animation: dash .9s .35s ease-in-out forwards;
    animation: dash .9s .35s ease-in-out forwards;
  }
  &.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check .9s .35s ease-in-out forwards;
    animation: dash-check .9s .35s ease-in-out forwards;
  }
}


@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

</style>