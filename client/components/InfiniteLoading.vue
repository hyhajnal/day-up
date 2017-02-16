<template>
	<div class="infinite-wrap align-c">
    <div class="align-c loading">
      <mt-spinner color="#26a2ff" type="snake" v-show="isLoading"></mt-spinner>
    </div>
    <div class="infinite-tip" v-show="!isLoading && resultCount == 0 ">
      <slot name="no-more">没有更多了</slot>
    </div>
    <!-- <mt-popup v-model="newAdd" position="bottom" popup-transition="popup-fade" modal="false">
      <slot>新增 {{ resultCount }} 条</slot>
    </mt-popup> -->
  </div>
</template>

<script>
import { Popup, Spinner } from 'mint-ui' 

function getScrollParent(elm) {
    if (elm.tagName === 'BODY') {
      return window;
    } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
      return elm;
    }
    return getScrollParent(elm.parentNode);
}

function getCurrentDistance(elm, dir) {
    let distance;
    const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;
    if (dir === 'top') {
      distance = scrollTop;
    } else {
      const styles = getComputedStyle(elm === window ? document.body : elm);
      const innerHeight = elm === window
                        ? window.innerHeight
                        : parseInt(styles.height, 10);
      const scrollHeight = elm === window
                         ? document.body.scrollHeight
                         : elm.scrollHeight;
      const paddingTop = parseInt(styles.paddingTop, 10);
      const paddingBottom = parseInt(styles.paddingBottom, 10);
      distance = scrollHeight - innerHeight - scrollTop - paddingTop - paddingBottom;
    }
    return distance;
}

export default{
  props:{
    distance: {
      type: Number,
      default: 100
    },
    doNext: Function,
    direction: {
      type: String,
      default: 'bottom'
    }

  },
  data() {
    return {
      isLoading: false,
      resultCount: null
    }
  },
  computed: {
    newAdd: function(){
      return !this.isLoading && this.resultCount > 0 
    }
  },
  components: {
    Popup, Spinner
  },

  mounted () {
    this.scrollParent = getScrollParent(this.$el)
    this.scrollParent.addEventListener('scroll', this.scrollHandler)

    //对数据结果监听
    this.$on('InfiniteLoaded', (rsCount) => {
      this.isLoading = false
      this.resultCount = rsCount
    })
  },

  methods: {
    scrollHandler () {
      if(!this.isLoading) {
        this.toLoad()
      }
    },
    toLoad () {
      const currentDistance = getCurrentDistance(this.scrollParent,this.direction)
      if(!this.isLoading && currentDistance <= this.distance) {
        this.isLoading = true
        if(this.resultCount != 0){
          this.doNext.call()
        }else{
          setTimeout(function(){
            this.isLoading = false
          }.bind(this), 500)
        }
      }else{
        this.isLoading = false
      }
    },
    unbind () {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    }
  }

}
</script>

<style lang="scss">
.infinite-wrap{
  span {
    display:inline-block;
  }
}
</style>