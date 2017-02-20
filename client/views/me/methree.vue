<template>
<div class="content content_head content_bottom">
	<mt-navbar v-model="selected">
	  <mt-tab-item id="1">周计划</mt-tab-item>
	  <mt-tab-item id="2">月计划</mt-tab-item>
	  <mt-tab-item id="3">期计划</mt-tab-item>
	</mt-navbar>

	<!-- tab-container -->
	<mt-tab-container v-model="selected" swipeable>
	  <mt-tab-container-item id="1">
	    <mt-cell v-for="n in 10" :title="'内容 ' + n" is-link @click.native="popup">
	  </mt-tab-container-item>
	  <mt-tab-container-item id="2">
	    <mt-cell v-for="n in 4" :title="'测试 ' + n" is-link>
	  </mt-tab-container-item>
	  <mt-tab-container-item id="3">
	    <mt-cell v-for="n in 6" :title="'选项 ' + n" is-link>
	  </mt-tab-container-item>
	</mt-tab-container>

	<!-- <fix :offsetTop="50">
	        <span class="fix-bar">固定在最顶部1</span>
	    </fix>
	<p v-for="n in 20">{{ n }}</p>
	<fix :offsetTop="50">
	        <span class="fix-bar">固定在最顶部2</span>
	    </fix>
	    <p v-for="n in 20">{{ n }}</p> -->
	<mt-popup
	  v-model="popupVisible"
	  popup-transition="popup-fade" :modal="false">
	  jhjbj
	</mt-popup>
</div>
</template>

<script>
import Fix from '../../components/Fix'
export default {
  name: 'page-navbar',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
  },
  data() {
    return {
      selected: '1',
      popupVisible: false,
      control: {
          header: true,
          bottom: true,
          title: '我的计划',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      }
    }
  },
  methods:{
  	popup(){
  		this.popupVisible = !this.popupVisible
  	}
  },
  components: {
  	Fix
  }
}
</script>
<style>
	.mint-navbar .mint-tab-item.is-selected{
		margin-bottom: 0px;
	}
	.fix-bar{
		width:100%;
		display: inline-block;
		background: pink;
	}
</style>