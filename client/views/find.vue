<template>
  <div class="content content_bottom">
    <mt-search v-if="search"
      v-model="value"
      cancel-text="取消"
      placeholder="搜索">
    </mt-search>
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
    
    <div class="spinner"><mt-spinner color="#26a2ff" type="snake"></mt-spinner></div>

    <card title="为你推荐">
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
    </card>

    <card title="TV">
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
    </card>

    <card title="学校活动">
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
      <card-item img="/images/3.jpg" label="英语早读营" icon="people"></card-item>
    </card>
    
</template>

<script>
import Card from '../components/Card/Card'
import CardItem from'../components/Card/CardItem' 

export default {
  name: 'Find',
  mounted() {
    this.$store.commit('setNavbar', this.control)
    this.listenScroll()
  },
  data (){
    return {
      control: {
        header: false,
        bottom: true,
        title: '发现',
        content: {
          icon1: 'back',
          icon2: 'more',
          url: '/'
        }
      },
      search: true
    }
  },
  methods: {
    listenScroll() {
      
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

</style>