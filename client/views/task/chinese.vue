<template>
<div class="child_wrap">
  <mt-header title="听写" fixed class="header">
    <mt-button icon="back"  slot="left" @click="goRoute()"></mt-button>
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
  <div class="content content_head">
  	<tianzi-ge v-if="task != null" :wordarray="task.external"
    @complete="complete"></tianzi-ge>
  </div>
</div>
</template>

<script>
import { findIndex as _findIndex } from 'lodash'
import TianziGe from '../../components/Chinese/TianziGe'
import { MessageBox } from 'mint-ui'
export default {
  name: 'Chinese',
  mounted() {
  	this.$store.commit('setBottom',false)
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
      task: null
    }
  },
  methods:{
    goRoute(){
      let _this = this
      MessageBox.confirm('确定退出当前作业?').then(action => {
        _this.$router.replace({path:'/'})
      })
    },
    complete(score){
      const payload = {
        item: this.task,
        score: score
      }
      this.$store.dispatch('addScore', payload)
      this.$store.dispatch('toogleItem', this.task)
      this.$router.replace({path:'/'})
    }
  },
  components: {
    TianziGe,
    MessageBox
  }
}
</script>
<style>

</style>