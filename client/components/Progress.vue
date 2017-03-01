<template>
<div class="donut">
  <svg width="240" height="240" xmlns="http://www.w3.org/2000/svg" class="donut_svg">
    <circle id="donut-graph-x" class="donut_svg_scrim" r="90" cy="120" cx="120" stroke-width="3" stroke="#333" fill="none"/>
    <circle id="donut-graph" class="donut_svg_circle_one" r="90" cy="120" cx="120" stroke-width="4" stroke="#ee4d4d" stroke-linejoin="round" stroke-linecap="round" fill="none" ref="c1"/>
    
    <defs>
      <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="#7a5bcf"/>
        <stop offset="100%" stop-color="#ee4d4d"/>
      </linearGradient>
    </defs>

  </svg>
  <div class="donut_copy">
    <span class="donut_title">
      <span class="js-donut-figure" v-text="perc"></span>
      <span class="donut_spic">分</span>
    </span>
  </div>
</div>	
</template>

<script>

export default {
	name: 'ProgressCircle',
	props: ['percent','radius'],
	mounted () {
		this.perc = this.percent
		this.init()
	},
	data (){
		return {
			perc:0
		}
	},
	methods: {
		calcDashOffset() {
			let circumference = (Math.PI * (2 * this.radius))
			return Math.floor(circumference - ((this.percent / 100) * circumference))
		},
		createCSS() {
			console.log(this.calcDashOffset())
		    this.$refs.c1.style.strokeDashoffset = this.calcDashOffset() + 'px'
		},
		init() {  
		    setTimeout(() => {
		      this.createCSS()
		    }, 1000)

		    /*setTimeout(() => {
			   this.perc < this.percent ? this.perc ++ : this.percent
			}, 300)*/
		}
	}
}
</script>

<style lang="scss">
.donut {
  width: 240px;
  height: 240px;
  top: 0; bottom:0;
  left: 0; right:0;
  margin:auto;
  position: absolute;
}

.donut_copy {
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 68px;
  top: 0; bottom:0;
  left: 0; right:0;
  position: absolute;

}

.donut_title,
.donut_secondary {
  display: block;
  margin: 0;
  padding: 0;
}

.donut_title,
.donut_spic {
  color: #ee4d4d;
  font-weight: 200;
}

.donut_title {
  font-size: 79px;
  position: relative;
  animation: donutTitleFadeLeft 800ms 200ms cubic-bezier(.99,.01,.22,.94) forwards;
  opacity: 0;
  transform: translateX(0);
}

.donut_spic {
  position: absolute;
  top: 20px;
  font-size: 30px;
  line-height: 1em;
  content: "%";
  animation: donutTitleFadeRight 800ms 200ms cubic-bezier(.99,.01,.22,.94) forwards;
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes donutTitleFadeLeft {
  from {
    opacity: 0;
    transform: translateX(0);
  }
  
  to {
    opacity: 1;
    transform: translateX(-10px);
  }
}

@keyframes donutTitleFadeRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

$radius: 90;
$circumference: (3.14 * (2 * $radius));

.donut_svg {
  transform: rotate(-90deg);
}

.donut_svg_circle_one {
  stroke-dasharray: $circumference;
  stroke-dashoffset: $circumference;
  transition: stroke-dashoffset 1200ms cubic-bezier(.99,.01,.62,.94);
}

.info {
  font-size: 14px;
  color: #999;
  position: absolute;
  flex: 1;
  bottom: 40px;
  width: 100%;
  left: 0;
  text-align: center;
  
  a {
    color: #999;
  }
}	
</style>