<template>
	<div>
		<header class="bar bar-nav">
			<router-link :to="'/home'" class="button button-link button-nav pull-left back">
				<span class="icon icon-left">返回</span>
			</router-link>
			<h1 class="title">列表</h1>
		</header>
		<div class="content">
			<p>作业任务号： {{ $route.params.id }}</p>
		</div>
	</div>
	<!-- <div class="content">
		<p>作业任务号： {{ $route.params.id }}</p>
	</div> -->
</template>
<script>
	export default {

	}
</script>