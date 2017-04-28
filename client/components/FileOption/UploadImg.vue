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
		<div class="preview">
			<input type="file" @change="selectImg($event)" ref="imgfile" v-show="false" id="imgfile">
			<label for="imgfile" id="imglabel">hhhhh</label>
			<canvas ref="showCanvas" class="showCanvas" @click="triggerFile()">
			</canvas>
			<div class="progress" v-text="progress" v-if="progress > -1"></div>
		</div>

		<mt-popup
		  v-model="popupVisible"
		  popup-transition="popup-fade">

		  <mt-header title="剪裁" fixed class="header">
			<i class="iconfont icon-side" slot="left"></i>
	        <mt-button icon="more" slot="right" ></mt-button>
	     </mt-header>

		  <div class="img_box" ref="imgBox">
		  		  	<!-- @click.capture="triggerClick($event)" 事件捕获 -->
			<img :src="imgUrl" alt="test" ref="touchimg" :style="imgStyle">
			<img :src="imgUrl" alt="test" :style="imgStyle" class="img_move" ref="move">
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

		  <div class="sure" @click="uploadImg()">
		  	<mt-button type="primary" size="small">确认</mt-button>
		  </div>
		</mt-popup>
	</div>
</template>

<script>
var fireEvent = function fireEvent(element,event){
    if (document.createEventObject){
        // IE浏览器支持fireEvent方法
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // 其他标准浏览器使用dispatchEvent方法
        var evt = document.createEvent( 'HTMLEvents' );
        // initEvent接受3个参数：
        // 事件类型，是否冒泡，是否阻止浏览器的默认行为
        evt.initEvent(event, true, true); 
        return !element.dispatchEvent(evt);
    }
};

import { Popup, MessageBox } from 'mint-ui'
import * as Upload from './Upload'
import { debounce as _debounce } from 'lodash'
export default{
	name: 'Upload',
	props:{
		oldImg: String,
		options: Object
	},
	data(){
		return {
			popupVisible: false,
			imgUrl:'',
			boxW: 0,
			boxH: 0,
			imgWidth:0,
			imgHeight:0,
			img:null,
			pos_c:null, //圆边界坐标
			initScale: 1.2,
			scale: 1.2,
			dX:0,
			dY:0,
			maxscale: 3, //最大放大
			progress:-1
		}
	},
	mounted(){
		const canvas = this.$refs.showCanvas
		const info = {
			url:this.oldImg,
			x: 0,
			y: 0,
			w: 200,
			h: 200
		}
		Upload.showAsCanvas(canvas,info,1)
		this.$on('imgReady',()=>{
			this.img = this.$refs.move
			this.img.onload = () => {
				this.imgHeight = Math.round(200 / this.img.naturalWidth * this.img.naturalHeight)
				this.imgWidth = 200
			}

			this.boxW = this.$refs.imgBox.clientWidth
			this.boxH = this.$refs.imgBox.clientHeight
			this.pos_c = this.getCirclePos() //获取圆的四个点坐标
			this.motion()

		})
		this.$on('info',(info)=>{
			MessageBox('提示', info)
		})
	},
	computed:{
		imgW() {
			return this.scale * this.imgWidth
		},
		imgH() {
			return this.scale * this.imgHeight
		},
		imgStyle(){
			return { 
				width: this.imgWidth + 'px',
				height: this.imgHeight + 'px',
				transform: 'translate3d('+ this.dX +'px,'+ this.dY +'px,0)' + ' scale(' + this.scale + ')'
			}
		}
	},
	methods:{
		triggerFile(){
			//this.$refs.imglabel.click()
			document.getElementById("imglabel").click()
			//fireEvent(this.$refs.imgfile, 'click')
		},
		uploadImg(){
			this.popupVisible = false
			const canvas = this.$refs.showCanvas
			const i = this.getImgBounding()
			const info = {
				url:this.imgUrl,
				x: this.pos_c.ls - i.ls,
				y: this.pos_c.ts - i.ts,
				w: this.imgW,
				h: this.imgH
			}
			Upload.showAsCanvas(canvas,info)
		},
		selectImg(e){
			this.initScale = 1.2
			this.scale = 1.2
			this.dX = 0
			this.dY = 0
			Upload.selectImg(this,e)
		},
		getCirclePos(){
			const W = this.boxW
			const H = this.boxH
			const r = 100
			return {
				ts: Math.round(H / 2 - r),
				tm: Math.round(H / 2 + r),
				ls: Math.round(W / 2 - r),
				lm: Math.round(W / 2 + r)
			}
		},
		//移动效果
		changePos(x,y){
			const i = this.getImgBounding()

			const i_new = {
				ls: i.ls + x,
				lm: i.lm + x,
				ts: i.ts + y,
				tm: i.tm + y
			}
			const old_X = this.dX
			const old_Y = this.dY
			let optionFun

			let check = this.edgeDetect(i_new,i)

			if(check != true){
				optionFun = function(_this){
					_this.$refs.touchimg.style.webkitTransition = '300ms ease-in-out'
					_this.dX = check.x == 0 ? old_X : check.x
					_this.dY = check.y == 0 ? old_Y : check.y
				}
			}else{
				optionFun = false
			}
			this.dX = x
			this.dY = y
			this.$refs.touchimg.style.webkitTransition = ''
			return optionFun
		},
		//缩放运动
		changeSize(newScale){
			const scale =  this.scale
			const i = this.getImgBounding()
			//debugger
			const deltaScale = ( newScale.toFixed(1) * 10 - scale.toFixed(1) * 10 ) / 10

			//缩放使得四顶点的变化
			const cw = Math.round((this.imgW * deltaScale / 2 ))
			const cy = Math.round((this.imgH * deltaScale / 2 ))

			const i_new = {
				ls: i.ls - cw,
				lm: i.lm + cw,
				ts: i.ts - cy,
				tm: i.tm + cy
			}

			let optionFun

			if(this.edgeDetect(i_new)!=true){

				optionFun = function(_this){
					_this.$refs.touchimg.style.webkitTransition = '300ms ease-in-out'
					_this.dX = 0
					_this.dY = 0
					_this.scale = _this.initScale
				}
			}else if(newScale > this.maxscale){
				optionFun = function(_this){
					_this.$refs.touchimg.style.webkitTransition = '300ms ease-in-out'
					_this.scale = _this.maxscale
				} 
			}else{
				optionFun = false
			}
			console.log(optionFun)
			this.$refs.touchimg.style.webkitTransition = ''
			this.scale = newScale
			return optionFun
		},
		//边缘检测，判断是否让其运动
		edgeDetect(i,i_old){
			const c = this.pos_c
			let x,y
			const moveX = this.imgW / 2 - 100
			const moveY = this.imgH / 2 - 100
			//debugger
			x = c.ls < i.ls ? moveX : 0
			x = c.lm > i.lm ? -moveX : x
			y = c.ts < i.ts ? moveY : 0
			y = c.tm > i.tm ? -moveY : y

			if(x || y){
				return {
					x: x,
					y: y
				}
			}else{
				return true
			}
		},
		getImgBounding(){
			const w = this.imgW / 2
			const y = this.imgH /2 
			const o = this.getOriginPos()

			return {
				ts: Math.round(o.y - y),
				tm: Math.round(o.y + y),
				ls: Math.round(o.x - w),
				lm: Math.round(o.x + w)
			}
		},
		getOriginPos(){
			let img = this.img
			const l = this.boxW / 2
			const t = this.boxH / 2
			return {
				x: this.dX + l,
				y: this.dY + t
			}
		},
		motion(){
			let _this = this

			let manager = new Hammer.Manager(this.$refs.move)
			let Pan = new Hammer.Pan()
			let Rotate = new Hammer.Rotate()
			let Pinch = new Hammer.Pinch()
			Pinch.recognizeWith([Rotate, Pan])

			let deltaX = 0
			let deltaY = 0
			let currentScale = 1

			let funPan 
			let funPinch 

			manager.add(Pan)
			manager.add(Rotate)
			manager.add(Pinch)

			manager.on('panmove', (e) => {
				funPan = _this.changePos(deltaX + e.deltaX, deltaY + e.deltaY)
				//_this.dX = deltaX + e.deltaX
			  	//_this.dY = deltaY + e.deltaY
			})
			manager.on('panend', (e) => {
				if(!funPan){
					deltaX += e.deltaX
			  		deltaY += e.deltaY
				}else{
					funPan(_this)
					deltaX = _this.dX
					deltaY = _this.dY
				}
			})
			manager.on('pinchmove', (e) => {
				funPinch = _this.changeSize(e.scale * currentScale)
				//_this.scale = e.scale * currentScale
			})
			manager.on('pinchend', (e) => {
				if(!funPinch){
					currentScale = currentScale * e.scale
				}else{
					funPinch(_this)
					currentScale = _this.scale
				}
			})

		}

	},
	components:{
		Popup
	}

}
</script>

<style lang="scss" scoped>
label{
	float:right;
}
.mint-popup{
	width:100%;
	height:100%;
}
.img_move{
	opacity:0.5;
	z-index:10000;
	opacity:0;
}
.upload, .preview{
	height:100%;
}
.preview{
	position:relative;
	.showCanvas{
		margin: auto;
		position: absolute;
		left:0;right:0;bottom:0;top:0;
		display:block;
	}
}

.img_box{
	width:100%;
	height:100%;
	overflow:hidden;
	position:relative;

	img{
		position:absolute;
		top:0;right:0;left:0;bottom:0;
		margin:auto;
		transform-origin:50% 50%;
		//transition:all 50ms ease-in-out;
	}

	svg{
		width:100%;
		height:100%;
		position:absolute;
	}
}
.sure{
	position:absolute;
	bottom:1rem;
	right:1rem;
	z-index:10001;
}	
</style>