<template>
	<div class="timer" v-if="time">
		<span class="hour" v-text="hour"></span><span>:</span>
		<span class="min" v-text="min"></span><span>:</span>
		<span class="sec"  v-text="sec"></span>
	</div>
</template>

<script>
export default{
	name: "TimeCounter",
	props: {
		time: String
	},
	data () {
		return {
			hour:'00',
			min:'00',
			sec: '00',
			timer: 0
		}
	},
	mounted () {
		this.start()
	},
	watch: {
		time: 'start'
	},
	methods: {
		start () {
			const t = this.time.split(':')
			this.hour = t[0]
			this.min = t[1]
			this.sec = t[2]

			let _this = this,
				hour  = parseInt(this.hour), 
				min   = parseInt(this.min), 
				sec   = parseInt(this.sec)
			this.timer = setInterval(function(){
				if(sec == 0){
					sec = 59
					if(min == 0){
						min = 59
						if(hour < 1){
							clearInterval(_this.timer)
							_this.$emit('changecard')
						}else{
							hour --
						}						
					}else{
						min --
					}					
				}else{
					sec --
				}
				

        		_this.hour = hour < 10 ? '0' + hour : hour
        		_this.min  = min  < 10 ? '0' + min  : min
        		_this.sec  = sec  < 10 ? '0' + sec  : sec

        		_this.$emit('timeout')
			}, 1000)
		}
	}
}
</script>

<style lang="scss" scoped>
.timer{
  font-size:3rem;
  color:#000;
  height:100%;
  border-bottom:dashed 1px #ccc;
}
</style>