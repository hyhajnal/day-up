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
			imgW: 200,
			pos_c:null, //圆边界坐标
			translate:'translate3d(0,0,0)',
			scale: 'scale(1)',
			maxscale: 3 //最大放大
		}
	},
	mounted(){
		this.img = this.$refs.touchimg
		this.toZoom()
		this.pos_c = this.getCirclePos() //获取圆的四个点坐标
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
		getCirclePos(){
			const W = this.$refs.imgBox.clientWidth
			const H = this.$refs.imgBox.clientHeight
			const r = 100
			return {
				l:{
					x: W / 2 - r,
					y: H / 2
				},
				r:{
					x: W / 2 + r,
					y: H / 2
				},
				t:{
					x: W / 2 ,
					y: H / 2 - r
				},
				b:{
					x: W / 2 ,
					y: H / 2 + r
				}
			}
		},
		//移动效果
		changePos(x,y){
			x = Number(x).toFixed(1)
			y = Number(y).toFixed(1)
			const i = this.getImgBounding()
			const i_new = {
				ls: this.caculate(i.ls, x),
				lm: this.caculate(i.lm, x),
				ts: this.caculate(i.ts, y),
				tm: this.caculate(i.tm, y)
			}
			const old_translate = this.translate
			this.translate =  'translate3d('+ x +'px,'+ y +'px,0)'
			if(!this.edgeDetect(i_new)){
				this.img.style.webkitTransition = '300ms ease-in-out'
				this.translate =  old_translate
			}
		},
		//缩放运动
		changeSize(n){
			let scale =  Number(this.scale.match(/\d\.?\d?/)[0]).toFixed(1)
			if(n){
				//小数运算会有误差，因为是先转二进制，有些小数转不了
				scale = this.caculate(scale, 0.1)
			}else{
				scale = this.caculate(scale, -0.1)
			}
			const i = this.getImgBounding()
			//缩放使得四顶点的变化
			/*debugger*/
			const cw = parseInt(this.imgW * (scale - 1) / 2 )
			const cy = parseInt(this.$refs.imgBox.clientHeight * 0.6 * (scale- 1) / 2)
			const i_new = {
				ls: parseInt(i.ls) - cw,
				lm: parseInt(i.lm) + cw,
				ts: parseInt(i.ts) - cy,
				tm: parseInt(i.tm) + cy
			}
			//边缘地区弹性缩放
			this.scale = ' scale('+ scale +')'
			setTimeout(()=>{
				if(!this.edgeDetect(i_new)){
					this.img.style.webkitTransition = '300ms ease-in-out';
					this.translate = 'translate3d(0,0,0)'
					this.scale = ' scale(1)'
				}
				if(scale > this.maxscale){
					this.img.style.webkitTransition = '300ms ease-in-out';
					this.scale = ' scale('+ this.maxscale +')'
				}
			}, 100)
		},
		//边缘检测，判断是否让其运动
		edgeDetect(i){
			const c = this.getCirclePos()

			if(c.l.x < i.ls || c.r.x > i.lm || c.t.y < i.ts || c.b.y > i.tm){
				return false
			}else{
				return true
			}
		},
		caculate(a, b){
			return (parseFloat(a) * 10 + parseFloat(b) * 10) / 10
		},
		getImgBounding(){
			const w = this.img.clientWidth / 2
			const y = this.img.clientHeight /2 
			const o = this.getOriginPos()
			//console.log(o)
			return {
				ts: o.y - y,
				tm: o.y + y,
				ls: o.x - w,
				lm: o.x + w
			}
		},
		getOriginPos(){
			let img = this.img
			let str = img.style.transform
			const l = this.$refs.imgBox.clientWidth / 2
			const t = this.$refs.imgBox.clientHeight / 2
			const tl = str.match(/\d+(?=px)/g) ? parseInt(str.match(/\d+(?=px)/g)[0]) : 0
			const tt = str.match(/\d+(?=px)/g) ? parseInt(str.match(/\d+(?=px)/g)[1]) : 0

			if(!img.style.transform){
				return {
					x: l,
					y: t
				}
			}
			return {
				x: tl + l,
				y: tt + t
			}
		},
		toMove(e){
			const event = e || window.e
			if(event.touches.length > 1) return
			const obj = event.touches[0]
			let x = obj.pageX - this.img.clientWidth / 2 - this.img.offsetLeft
			let y = obj.pageY - this.img.clientHeight /2 - this.img.offsetTop
			this.changePos(x,y)

		},
		/*panMove(){
			let _this = this
			let hm = new Hammer(this.$refs.rect)
			hm.add()
			hm.on("pan",(ev) =>{
				swith(ev.type){
					case 'panleft':
						//
						break
					case 'panleft':
						//
						break
					case 'panleft':
						//
						break
				}
			})
		},*/
		toZoom(){
			let _this = this
			let hammertime = new Hammer(this.$refs.rect)
	         //为该dom元素指定触屏移动事件
	         hammertime.add(new Hammer.Pinch())
	         //添加事件
	         hammertime.on("pinchin", function (e) {
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
		width:200px;
		position:absolute;
		top:0;right:0;left:0;bottom:0;
		margin:auto;
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