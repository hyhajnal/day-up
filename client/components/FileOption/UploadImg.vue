<!-- 
capture表示，可以捕获到系统默认的设备，比如：camera-照相机；camcorder-摄像机；microphone-录音。
accept表示，直接打开系统文件目录
<input type="file" accept="image/*" multiple>  //支持多选
<input type="file" accept="image/*" capture="camera">
<input type="file" accept="video/*" capture="camcorder">
<input type="file" accept="audio/*" capture="microphone">
 -->
<template>
	<div class="upload">
		<input type="file" accept="image/*" capture="camera" @change="uploadImg()">
		<div class="preview">
			<div class="box"></div>
			<div class="progress"></div>
		</div>

		<mt-popup
		  v-model="popupVisible"
		  popup-transition="popup-fade">

		  <mt-header title="剪裁" fixed class="header">
			<i class="iconfont icon-side" slot="left" @click="changeSize(0)"></i>
	        <mt-button icon="more" slot="right" @click="changeSize(1)"></mt-button>
	     </mt-header>

		  <div class="img_box" ref="imgBox">
		  		  	<!-- <canvas></canvas> -->
		  		  	<!-- @click.capture="triggerClick($event)" 事件捕获 -->
			<img src="/images/1.jpg" alt="test" ref="touchimg" :style="imgStyle">
			<svg>
				<!-- defs 本身不会显示，作为url方式可复用 -->
				<defs>  
					<mask id="mask">
						<rect x="0" y="0" width="100%" height="100%" style="stroke:none;fill:#ccc"></rect>
						<circle id="circle" cx="50%" cy="50%" r="100" style="fill:#000" />
					</mask>
				</defs>
				<rect x="0" y="0" width="100%" height="100%" ref="rect"
					style="stroke:none;fill=#ccc;mask:url(#mask)"
					@touchmove="toMove($event)"
					></rect>
			</svg>
		  </div>

		  <mt-button type="primary" size="small" id="sure">确认</mt-button>
		</mt-popup>
	</div>
</template>

<script>
import { Popup } from 'mint-ui'
import Upload from './Upload'
import { debounce as _debounce } from 'lodash'
export default{
	name: 'Upload',
	props:{},
	data(){
		return {
			popupVisible: true,
			img:null,
			translate:'translate3d(0,0,0)',
			scale: 'scale(1)'
		}
	},
	mounted(){
		this.img = this.$refs.touchimg
		this.toZoom()
	},
	computed:{
		imgStyle(){
			return {
						transform: this.translate + ' ' + this.scale
					}
		}
	},
	methods:{
		uploadImg(){

		},
		changePos(x,y){
			let img = this.$refs.touchimg
			x = x < 0 ? 0 : x
			x = x > this.$refs.imgBox.clientWidth ? this.$refs.imgBox.clientWidth : x
			y = y < 0 ? 0 : y
			y = x > this.$refs.imgBox.clientWidth ? this.$refs.imgBox.clientWidth : x 
			this.translate =  'translate3d('+ x +'px,'+ y +'px,0)'
		},
		changeSize(n){
			let scale =  Number(this.scale.match(/\d\.?\d?/)[0]).toFixed(1)
			if(n){
				//小数运算会有误差，因为是先转二进制，有些小数转不了
				scale = (parseFloat(scale)*10 + parseFloat(0.1)*10)/10 
			}else{
				scale = (parseFloat(scale)*10 - parseFloat(0.1)*10)/10
			}
			if(scale * this.img.clientWidth > 100 && 
				scale > .5 && scale * this.img.clientWidth < screen.width * 1.5){
				this.scale = ' scale('+ scale +')'
			}
		},
		getPos(){
			let img = this.img
			let str = img.style.transform
			if(!img.style.transform){
				return {
					x: 0,
					y: 0
				}
			}
			return {
				x: parseInt(str.match(/\d+(?=px)/g)[0]),
				y: parseInt(str.match(/\d+(?=px)/g)[1])
			}
		},
		toMove(e){
			const event = e || window.e
			if(event.touches.length > 1) return
			const obj = event.touches[0]
			let x = obj.pageX - this.img.clientWidth / 2 - this.img.offsetLeft
			let y = obj.pageY - this.img.clientHeight /2 - this.img.offsetTop
			if(!this.lockTouch){
				this.changePos(x,y)
			}
		},
		toZoom(){
			let _this = this
			var hammertime = new Hammer(this.$refs.rect)
	         //为该dom元素指定触屏移动事件
	         hammertime.add(new Hammer.Pinch())
	         //添加事件
	         hammertime.on("pinchin", function (e) {
	         	e.preventDefault()
	         	_debounce(_this.changeSize(0), 300)
	         })
	         hammertime.on("pinchout", function (e) {
	            _debounce(_this.changeSize(1), 300)
	         })
		}

	},
	components:{
		Popup
	}

}
</script>

<style lang="scss" scoped>
.mint-popup{
	width:100%;
	height:100%;
}
.img_box{
	width:100%;
	height:100%;
	overflow:hidden;
	position:relative;

	img{
		height:60%;
		width:60%;
		position:absolute;
		top:20%;
		left:20%;
		transform-origin:50% 50%;
		transition:all 50ms ease-in-out;
	}

	svg{
		width:100%;
		height:100%;
		position:absolute;
	}

	#sure{
		position:absolute;
		bottom:.5rem;
		right:1rem;
	}
}	
</style>