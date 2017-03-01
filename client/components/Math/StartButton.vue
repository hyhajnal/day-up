<template>
<div class="startBtn" ref="s_btn">
	<div class="pulse1"></div>
	<div class="pulse2"></div>
	<div class="icon"></div>
	<div class="icon2">{{ text }}</div>
</div>
</template>

<script>
export default{
	name: 'StartButton',
	props: ['text'],
	mounted () {
		this.bindTouch()
	},

	data () {
		return {
			x: null,
			y: null
		}
	},

	methods: {
		bindTouch () {
			this.$refs.s_btn.addEventListener('touchstart',this.touchFun, false) 
    		this.$refs.s_btn.addEventListener('touchmove',this.touchFun, false)  
    		this.$refs.s_btn.addEventListener('touchend',this.touchFun, false)
		},
		touchFun (e) {
			const event = e || window.e    
   			const obj = event.touches[0]
   			let dom = this.$refs.s_btn
	        switch(event.type){  
	            case "touchstart": 
	                this.x = dom.offsetLeft + dom.clientWidth / 2
	                this.y = dom.offsetTop + dom.clientHeight / 2
	                break;  
	            case "touchend":  
	                this.x = dom.offsetLeft + dom.clientWidth / 2
	                this.y = dom.offsetTop + dom.clientHeight / 2
	                break;
	            case "touchmove":  
	                event.preventDefault()  //阻止touch时滚动条滚动等默认行为
	                this.$refs.s_btn.style.webkitTransform = 
	                	'translate('+ (obj.pageX - this.x) +'px,'
                        + (obj.pageY - this.y) +'px) scale(.4)'
	                break;
	        } 
		}
	}
}
</script>

<style lang="scss">
.startBtn{
	width: 10rem;
    height: 10rem;
    margin: auto;
    top: 0; left: 0; bottom: 0; right: 0;
    position: absolute; 
    transform: scale(1);
}
.icon{
    position: absolute; 
    width: 9rem;
    height: 9rem;
    background:#2b2e48;
    margin: auto; 
    top: 0; left: 0; bottom: 0; right: 0;
    z-index: 3;
    border-radius: 100%;
}

.icon2{
	color: #fff;
	text-align:center;
	line-height:8.4rem;
	font-size:1.5rem;
	width: 8.4rem;
	height: 8.4rem;
	background: #2b2e48;
	z-index: 4;
	position:absolute;
	border-radius: 100%;
	margin: auto;
	top: 0; left: 0; bottom: 0; right: 0;
	border:.3rem solid #eee;
}

.pulse1 {
    position: absolute;  
    width: 10rem;
    height: 10rem;
    margin: auto; 
    top: 0; left: 0; bottom: 0; right: 0;
    z-index: 1;
    opacity: 0;
    border: 3px solid rgba(255,255,255,.1);
  
    animation: pulsejg1 2s linear infinite;
    border-radius: 999px;
    box-shadow: inset 0px 0px 15px 10px rgba(0, 0, 0, .6);
}

.pulse2 {
    position: absolute;
    width: 10rem;
    height: 10rem;
    margin: auto; 
    top: 0; left: 0; bottom: 0; right: 0;
    z-index: 2;
    opacity: 0;
    border: 1px solid rgba(255,255,255,0);
  
    animation: pulsejg2 2s linear infinite;
    border-radius: 999px;
    box-shadow: inset 0px 0px 12px 5px rgba(255, 255, 255, .8);
}

@-webkit-keyframes pulsejg1 {
    0% {
        -webkit-transform: scale(.6);
        opacity: 0;
    }

    50% {
        -webkit-transform: scale(.6);
        opacity: 0;
    }

    60% {
        -webkit-transform: scale(.9);
        opacity: .2;
    }

    70% {
        -webkit-transform: scale(1.1);
        opacity: .35;
    }

    80% {
        -webkit-transform: scale(1.25);
        opacity: .2;
    }

    100% {
        -webkit-transform: scale(1.4);
        opacity: 0;
    }
}

@-moz-keyframes pulsejg1 {
    0% {
        -moz-transform: scale(.6);
        opacity: 0;
    }

    50% {
        -moz-transform: scale(.6);
        opacity: 0;
    }

    60% {
        -moz-transform: scale(.9);
        opacity: .2;
    }

    70% {
        -moz-transform: scale(1.1);
        opacity: .35;
    }

    80% {
        -moz-transform: scale(1.25);
        opacity: .2;
    }

    100% {
        -moz-transform: scale(1.4);
        opacity: 0;
    }
}

@keyframes pulsejg1 {
    0% {
        transform: scale(.6);
        opacity: 0;
    }

    50% {
        transform: scale(.6);
        opacity: 0;
    }

    60% {
        transform: scale(.9);
        opacity: .1;
    }

    70% {
        transform: scale(1.1);
        opacity: .25;
    }

    80% {
        transform: scale(1.25);
        opacity: .1;
    }

    100% {
        transform: scale(1.4);
        opacity: 0;
    }
}

@-webkit-keyframes pulsejg2 {
    0% {
        -webkit-transform: scale(.6);
        opacity: 0;
    }

    40% {
        -webkit-transform: scale(.8);
        opacity: .05;
    }

    50% {
        -webkit-transform: scale(1);
        opacity: .1;
    }

    60% {
        -webkit-transform: scale(1.1);
        opacity: .3;
    }

    80% {
        -webkit-transform: scale(1.2);
        opacity: .1;
    }

    100% {
        -webkit-transform: scale(1.3);
        opacity: 0;
    }
}

@-moz-keyframes pulsejg2 {
    0% {
        -moz-transform: scale(.6);
        opacity: 0;
    }

    40% {
        -moz-transform: scale(.8);
        opacity: .05;
    }

    50% {
        -moz-transform: scale(1);
        opacity: .1;
    }

    60% {
        -moz-transform: scale(1.1);
        opacity: .3;
    }

    80% {
        -moz-transform: scale(1.2);
        opacity: .1;
    }

    100% {
        -moz-transform: scale(1.3);
        opacity: 0;
    }
}

@keyframes pulsejg2 {
    0% {
        transform: scale(.6);
        opacity: 0;
    }

    40% {
        transform: scale(.8);
        opacity: .05;
    }

    50% {
        transform: scale(1);
        opacity: .1;
    }

    60% {
        transform: scale(1.1);
        opacity: .3;
    }

    80% {
        transform: scale(1.2);
        opacity: .1;
    }

    100% {
        transform: scale(1.3);
        opacity: 0;
    }
}	
</style>