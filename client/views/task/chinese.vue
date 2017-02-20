<template>
<div class="content content_head">
	<tianzi-ge><tianzi-ge>
</div>
</template>

<script>
import TianziGe from '../../components/Chinese/TianziGe'
export default {
  name: 'Chinese',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
  },
  data() {
    return {
      selected: '1',
      popupVisible: false,
      control: {
          header: true,
          bottom: false,
          title: '听写',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      }
    }
  },
  methods:{

  },
  components: {
    TianziGe
  }
}
</script>
<style>

</style>