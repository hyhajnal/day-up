<template>
	<div class="timer">
		<span v-text="showTime"></span> <!-- 任务当前进行时间 -->
		<span>--</span>
		<span v-text="etime"></span>  <!-- 任务结束时间 -->
	</div>
</template>

<script>
export default{
	name: "TimeCounter",
	props: {
		stime: String,
		etime: String,
		done: Boolean //标志位 用户是否按下了完成
	},
	data () {
		return {
			showTime: null,
			timer: 0 //定时器
		}
	},
	mounted () {
		this.start()
	},
	watch: {
		stime: 'start'  //一旦stime更新，则开始计时
	},
	methods: {
		start(){
			const _this = this
			_this.timer = setInterval(function(){
				_this.check(_this)
			}, 1000)
		},
		check (_this) {
			const time = new Date()
			const hour = time.getHours()
			const min = time.getMinutes()
			const sec = time.getSeconds()

			const size = hour * 3600 + min * 60 + sec

			//如果当前时间在任务范围内 更新时间
			//如果用户按下了完成，停止更新时间
			if(size > _this.getTime(_this.stime) && 
			   size < _this.getTime(_this.etime) && !_this.done ){
			   	_this.$emit('start')
				_this.showTime = hour + ':' + min 
			}else{
				_this.showTime = _this.stime
			}

			//如果当前时间已经超过etime
			//进行下一个任务
			if(size > _this.getTime(this.etime)){
				_this.$emit('changecard',_this.done)
				clearInterval(_this.timer)
			}


		},
		//将stime,etime 转换成秒，用来比较大小
		getTime (timeStr) {
			const time = timeStr.split(':')
			const size = parseInt(time[0]) * 3600 + parseInt(time[1]) * 60
			return size
		}
	}
}
</script>

<style lang="scss" scoped>
.timer{
  font-size:2rem;
  color:#000;
  height:100%;
  border-bottom:dashed 1px #ccc;
  display:flex;
  align-items:center;
  justify-content:space-around;
}
</style>