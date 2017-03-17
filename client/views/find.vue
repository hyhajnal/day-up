<template>
<div class="child_wrap">
  <transition name="component-fade">
    <mt-search v-show="search"
      v-model="value"
      cancel-text="取消"
      placeholder="搜索"
      fixed>
    </mt-search >
  </transition>
  
  <transition name="component-fade">
    <mt-header title="发现" fixed class="header" v-show="!search">
      <i class="iconfont icon-side" slot="left" @click="openSidebar"></i>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </transition>
  
  <div class="content content_bottom" ref="scrollDom">
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img alt="1" src='/images/7.jpg'>
      </mt-swipe-item>
      <mt-swipe-item>
        <img alt="2" src='/images/8.jpg'>
      </mt-swipe-item>
      <mt-swipe-item>
        <img alt="3" src='/images/9.jpg'>
      </mt-swipe-item>
    </mt-swipe>

    <!-- <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" 
      :top-status.sync="topStatus" ref="loadmore"> -->
      <!-- <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="snake" color="#26a2ff" class="spinner-icon"></mt-spinner>
        </span>
      </div> -->
      <div class="cards_wrap">
        <card title="最热计划" :avg="2">
          <card-item :img="'/images/'+i+'.jpg'" label="小明的计划" 
            icon1="people" icon2="people" v-for="i in 4"></card-item>
        </card>
        <card title="附近圈子" :avg="0">
          <card-item slot="content" :img="'/images/'+i+'.jpg'" label="英语早读营" :posDown="true" 
            icon1="people" icon2="people" v-for="i in 5"></card-item>
        </card>
        <card title="推荐好书" :avg="5">
          <card-item :img="'/images/'+i+'.jpg'" label="海底两万里" 
           v-for="i in 5"></card-item>
        </card>
        <card title="短TV" :avg="3">
          <card-item :img="'/images/'+i+'.jpg'"
            icon1="shipin" icon2="msg" v-for="i in 9"></card-item>
        </card>
        <!-- <p v-for="card in cards">{{ card }}</p> -->
        <grid :avg="2" wrap='wrap' align='around'>
          <item>
            <grid :avg="2" wrap='wrap' align='around'>
              <item></item>
              <item></item>
              <item></item>
              <item></item>
            </grid>
          </item>
          <item></item>
          <item></item>
          <item></item>
        </grid>
      </div>
    <!-- </mt-loadmore> -->
</div>    
</template>

<script>
import Card from 'components/Card/Card'
import CardItem from'components/Card/CardItem'
import Grid from 'components/Flex/Grid'
import Item from 'components/Flex/Col' 
export default {
  name: 'Find',
  mounted() {
    this.$store.commit('setBottom', true)
    this.$refs.scrollDom.addEventListener('touchmove', this.handleScroll, false)
  },
  beforeDestroyed () {
    this.$refs.scrollDom.removeEventListener('touchmove', this.handleScroll, false)
  },
  data (){
    return {
      search: true,
      cards: [0,1,2,3,4,5],
      topStatus: ''
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        let firstValue = this.cards[0]
        this.cards.unshift(firstValue + 1)
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    handleScroll (e) {
      //e.preventDefault()
      const scrollTop = this.$refs.scrollDom.scrollTop
      if(scrollTop > 10) {
        this.search = false
      }
      if(scrollTop < 10) {
        this.search = true
      }
    },
    openSidebar() {
      this.$store.commit('setSidebar', true)
    }
  },
  components: {
    Card,
    CardItem,
    Grid,
    Item
  }
}
</script>

<style lang='scss'>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.spinner{
  padding-top: 1rem;
  text-align: center;
  span{
    display: inline-block;
  }
}
.mint-swipe{
  width:100%;
  height: 35%;
  margin:0 auto;
  img{
    width:100%;
  }
}

.mint-search{
  width:100%;
  height:auto;
  position: absolute;
  top:0;
  color: #fff;

  .mint-searchbar, .mint-searchbar-inner,input{
    background-color: rgba(0,0,0,0.5);
  }
  input{
    background-color: rgba(0,0,0,0);
  }
}


.is-rotate{
  transform: rotate(180deg);
}
.spinner-icon{
  display: inline-block;
  margin: 0 auto;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}

.sticky {
     /* 滚过初始位置时自动吸顶 */
    position: -webkit-sticky;
    position: sticky;
     /* 吸顶时的定位 */
    top: 2.5rem;
    left: 0;
    z-index: 9999;
    background: #fff;
}

</style>