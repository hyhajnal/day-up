<template>
  <div class="content content_bottom">
    <!-- <mt-search v-if="search"
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search> -->
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
        <card :title="'为你推荐'+ card" v-for="card in cards">
          <card-item img="/images/3.jpg" label="英语早读营" icon="people"
          v-for="i in 5"></card-item>
        </card>
        <!-- <p v-for="card in cards">{{ card }}</p> -->
      </div>
    </mt-loadmore>
    
</template>

<script>
import Card from '../components/Card/Card'
import CardItem from'../components/Card/CardItem' 
export default {
  name: 'Find',
  mounted() {
    this.$store.commit('setNavbar', this.control)
  },
  data (){
    return {
      control: {
        header: true,
        bottom: true,
        title: '发现',
        content: {
          icon1: 'back',
          icon2: 'more',
          url: '/'
        }
      },
      search: true,
      cards: [0],
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
    }
  },
  components: {
    Card,
    CardItem
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
</style>