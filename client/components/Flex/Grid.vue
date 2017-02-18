<template>
	<div :class="classes" :styles="styles">
		<slot></slot>
	</div>	
</template>

<script>
const preClass = 'grid'
import { oneOf } from '../../api/util'
export default {
	name: 'Grid',
	props: {
		wrap: {
			validator (value) {
                return oneOf(value, ['wrap','nowrap','reverse'])
            }
		},
		avg: Number,
		align: {
			validator (value) {
                return oneOf(value, ['start','end','center','between','around'])
            }
		}
	},
	computed: {
		classes () {
			return [
				{
					[`${preClass}`]: true,
					[`${preClass}-${this.wrap}`]: !!this.wrap,
					[`${preClass}-${this.align}`]: !!this.align,
					[`${preClass}-${this.avg}`]: !!this.avg
				}
			]
		},
		styles () {

		}
	}
}
</script>

<style lang="scss" scoped>
.grid{
	display: flex;
	flex-direction: row;		
}

//wrap
.grid-wrap{
	flex-wrap: wrap; 
}
.grid-nowrap{
	flex-wrap: nowrap; 
}
.grid-reverse{
	flex-wrap: wrap-reverse;  
}

//align
.grid-start{
	justify-content: flex-start;
}
.grid-end{
	justify-content: flex-end;
}
.grid-center{
	justify-content: center;
}
.grid-between{
	justify-content: space-between;
}
.grid-around{
	justify-content: space-around;
}

//avg
.grid-1{
	.col{
		flex-basis:100%; 
	}
}
.grid-2{
	.col{
		flex-basis:50%;
	}
}
.grid-3{
	.col{
		flex-basis:33.333333%; 
	}
}
.grid-4{
	.col{
		flex-basis:25%; 
	}
}
.grid-5{
	.col{
		flex-basis:20%; 
	}
}
.grid-6{
	.col{
		flex-basis:16.666667; 
	}
}
</style>