<template>
<div class="content content_head">
	<tianzi-ge v-if="task != null" :wordarray="task.external"></tianzi-ge>
</div>
</template>

<script>
import { findIndex as _findIndex } from 'lodash'
import TianziGe from '../../components/Chinese/TianziGe'
export default {
  name: 'Chinese',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
    const id = this.$route.params.id
    const items = this.$store.state.task.items
    const index = _findIndex(items, function(item) {
                    return item.id == id
                  })
    this.task = items[index]
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
      },
      task: null
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