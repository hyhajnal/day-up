<template>
	<div :class="classes" :style="styles">
		<slot></slot>
	</div>
</template>

<script>
const preClass  = 'col'
const preOffset = 'col-offset'
const preShrink = 'col-shrink'
import { oneOf } from '../../api/util'
export default {
	name: 'Col',
	props: {
		cols: Number,
		offset: Number,
		shrink: Boolean,
		gutter: {
            type: Number,
            default: 0
        }
	},
	computed: {
		classes() {
			return [
				{
					[`${preClass}`] : true,
					[`${preClass}-${this.cols}`] : !!this.cols,
					[`${preClass}-${this.offset}`] : !!this.offset,
					[`${preShrink}`] : !this.shrink
				}
			]
		},
		styles () {
            let style = {};
            if (this.gutter !== 0) {
                style = {
                    paddingLeft: this.gutter + 'px',
                    paddingRight: this.gutter + 'px'
                };
            }
            return style;
        }
	}
}
</script>

<style lang="scss">
.col{
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
}
.col-shrink{
	flex-shrink: 0; //该项目不可伸缩
}
.col-1{
	flex-basis:16.666667%;
	//max-width :16.666667%;
}
.col-2{
	flex-basis:33.333333%;
	//max-width :33.333333%;
}
.col-3{
	flex-basis:50%;
	//max-width :50%;
}
.col-4{
	flex-basis:66.666667%;
	//max-width :66.666667%;
}
.col-5{
	flex-basis:83.333333%;
	//max-width :83.333333%; 
}
.col-6{
	flex-basis:100%;
	//max-width :100%;
}
.col-offset-1{
	margin-left:16.666667%; 
}
.col-offset-2{
	margin-left:33.333333%; 
}
.col-offset-3{
	margin-left:50%;
}
.col-offset-4{
	margin-left:66.666667%; 
}
.col-offset-5{
	margin-left:83.333333%;
}
</style>