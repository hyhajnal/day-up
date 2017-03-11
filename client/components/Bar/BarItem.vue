<!-- router-link默认渲染成a标签 -->
<template>
	 <router-link :to="{ path: path }" class="tab-item" active-class="active">
		<span class="iconfont" :class="iconClass"></span>
		<span class="tab-label" v-text="label"></span>
	</router-link>
</template>

<script>
export default {
	props:['label', 'icon', 'path'],
	computed: {
		iconClass () {
			return `icon-${this.icon}`
		}
	}
}
</script>

<style lang="scss">
@import "../../../static/css/help/base.scss";
.tab-item {
  position: relative;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  color: #929292;

  .iconfont {
    position: relative;
    z-index:20;
  }

  &.active,
  &:active {
    color: $color-primary;
  }

  .tab-label {
    display: block;
    font-size: 0.6rem;
  }
}
</style>