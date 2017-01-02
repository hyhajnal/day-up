<!-- router-link默认渲染成a标签 -->
<template>
	 <router-link :to="{ path: path }" class="tab-item" active-class="active">
		<span class="icon" :class="iconClass"></span>
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