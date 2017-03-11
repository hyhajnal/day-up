<!-- slot组件与组件嵌套时，替代内容的元素 -->
<template>
	<nav class="bar bar-tab">
		<slot></slot>
	</nav>
</template>
<!-- 如果未定义 scoped 属性，那么 <style> 元素必须位于 <head> 部分中,则样式仅仅应用到 style 元素的父元素及其子元素 -->
<script>
export default{
	
}
</script>
<style lang="scss">
@import "../../../static/css/help/base.scss";
.bar {
  display: table;
  table-layout: fixed;
  width: 100%;
  position: absolute;
  right: 0;
  left: 0;
  bottom:0;
  z-index: 10;
  background-color: #f7f7f8;
  height: $bar-tab-height;

}
</style>