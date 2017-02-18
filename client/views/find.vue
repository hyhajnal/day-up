<template>
  <div class="content content_bottom" ref="scrollDom">
    <!-- <mt-search v-if="search"
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search > -->
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <img src="/images/1.jpg" alt="1">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="/images/2.jpg" alt="2">
      </mt-swipe-item>
      <mt-swipe-item>
        <img src="/images/3.jpg" alt="3">
      </mt-swipe-item>
    </mt-swipe>
    
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" 
      :top-status.sync="topStatus" ref="loadmore">
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="snake" color="#26a2ff" class="spinner-icon"></mt-spinner>
        </span>
      </div>
      <div class="content">
        <card title="最热计划" :avg="2">
          <card-item img="/images/3.jpg" label="小明的计划" 
            icon1="people" icon2="people" v-for="i in 4"></card-item>
        </card>
        <card title="附近圈子" :avg="0">
          <card-item slot="content" img="/images/1.jpg" label="英语早读营" :posDown="true" 
            icon1="people" icon2="people" v-for="i in 5"></card-item>
        </card>
        <card title="推荐好书" :avg="5">
          <card-item img="/images/2.jpg" label="海底两万里" 
           v-for="i in 5"></card-item>
        </card>
        <card title="短TV" :avg="3">
          <card-item img="/images/4.jpg" 
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
    </mt-loadmore>
    
</template>

<script>
import Card from '../components/Card/Card'
import CardItem from'../components/Card/CardItem'
import Grid from '../components/Flex/Grid'
import Item from '../components/Flex/Col' 
export default {
  name: 'Find',
  mounted() {
    this.$store.commit('setNavbar', this.control)
    this.$refs.scrollDom.addEventListener('scroll', this.handleScroll, false)
  },
  beforeDestroyed () {
    this.$refs.scrollDom.removeEventListener('scroll', this.handleScroll, false)
  },
  data (){
    return {
      control: {
        header: false,
        bottom: true,
        search: true,
        title: '发现',
        content: {
          icon1: 'back',
          icon2: 'more',
          url: '/'
        }
      },
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
    handleScroll () {
      const scrollTop = this.$refs.scrollDom.scrollTop
      if(scrollTop > window.innerHeight * 0.35) {
        this.control.search = false
        this.control.header = true
        this.$store.commit('setNavbar', this.control)
      }else{
        this.control.search = true
        this.control.header = false
        this.$store.commit('setNavbar',this.control)
      }
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

/* .find{
  .grid{
    width:100%;
    margin-bottom: 20px;
  }
  .col{
    height:30px;
    border:1px solid #000;
  }
} */

</style>