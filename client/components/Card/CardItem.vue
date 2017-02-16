<template>
	<li class="card_child">
		<img :src="img" alt="">
      	<span class="cd_name" v-text="label"></span>
      	<div class="cd_icon">
      		<span><i class="iconfont" :class="iconClass"></i>&nbsp;23</span>
      		<span><i class="iconfont" :class="iconClass"></i>&nbsp;23</span>
      	</div>
	</li>
</template>

<script>
export default{
	props: ['img','label','icon'],
	computed: {
		iconClass () {
			return `icon-${this.icon}`
		}
	}
}
</script>

<style lang="scss" scoped>
.card_child{
	width:8rem;
	margin: 0 .2rem;
	img{
		width:8rem;
		height:5rem;
	}
	.cd_name{
		display:block;
		text-align: center;	
	}
	.cd_icon,i{
		font-size:.5rem;
		color:#999;
	}
}
</style>