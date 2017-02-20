<template>
	<item class="card_child" ref='item'>
		<div class="img_box" :style="{backgroundImage: 'url(' + img + ')'}">
			<grid class="cd_icon" wrap="wrap" align="between" v-if="!posDown">
	      		<item :gutter='8' v-if="icon1"><i class="iconfont" :class="iconClass1"></i>&nbsp;23</item>
	      		<item :gutter='8' v-if="icon2"><i class="iconfont" :class="iconClass2"></i>&nbsp;23</item>
	      	</grid>
		</div>
      	<span class="cd_name" v-text="label" v-if="label"></span>
      	<grid class="posDown" wrap="wrap" align="start" v-if="posDown">
      		<item v-if="icon1"><i class="iconfont" :class="iconClass1"></i>&nbsp;23</item>
      		<item v-if="icon2"><i class="iconfont" :class="iconClass2"></i>&nbsp;23</item>
      	</grid>
	</item>
</template>

<script>
import Grid from '../Flex/Grid'
import Item from '../Flex/Col'
export default{
	props: {
		img: String,
		label: String,
		icon1: String,
		icon2: String,
		posDown: {
			type: Boolean,
			default: false
		}
	},
	mounted() {
        if(this.posDown){
			this.$el.className = 'card_child'
			this.$el.style.flexShrink = 0
		}
	},
	computed: {
		iconClass1 () {
			return `icon-${this.icon1}`
		},
		iconClass2 () {
			return `icon-${this.icon2}`
		}
	},
	components: {
		Grid,
		Item
	}
}
</script>

<style lang="scss" scoped>
.card_child{
	padding:.2rem;
	.img_box{
		position:relative;
		width:100%;
		height:5rem;
		background-size: cover;
	}
	.cd_name{
		display:block;
		text-align: center;	
	}
	.cd_icon{
		position: absolute;
		bottom: 4px;
		width:100%;
		.col:nth-child(even){
			text-align:right;
		}
	}
	.cd_icon,i{
		font-size:.8rem;
		color:#fff;
	}
	.posDown{
		font-size:.8rem;
		color:#ccc;
		text-align:left;
		i{ color:#ccc; }
		.col:nth-child(even) {
			//margin-left:-30px;
		}
	}
}
</style>