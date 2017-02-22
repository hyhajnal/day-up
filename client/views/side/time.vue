<template>
<div class="child_wrap">
  <mt-datetime-picker
    type:"time"
    v-model="pickerValue"
    @confirm="handleChange"
    ref="picker3">
  </mt-datetime-picker>
	<div class="content content_head content_bottom">
      <ul>
        <li class="border_1px" @click="openPicker()" v-for="item in timeList">
          <grid wrap="wrap" align="between" :avg="3">
              <span class="title">{{item.content}}</span>
              <span class="time">{{item.sTime}}</span>
              <span class="time">{{item.eTime}}</span>
          </grid>
        </li>
      </ul>
	</div>
</div>
</template>

<script>
import Grid from '../../components/Flex/Grid'
export default {
  name: 'page-navbar',
  mounted() {
  	this.$store.commit('setNavbar',this.control)
  	//this.begin = false
  },
  data() {
    return {
      pickerValue: null,
      control: {
          header: true,
          bottom: true,
          title: '我的习惯',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      },
      timeList:[
        {content:'放学回家', sTime:"15:00",eTime:"— —",type:1},
        {content:'吃饭', sTime:"18:00",eTime:"18:30",type:1},
        {content:'特殊安排1', sTime:"20:40",eTime:"21:10",type:1},
        {content:'特殊安排2', sTime:"19:30",eTime:"19:40",type:1},
        {content:'睡觉', sTime:"— —",eTime:"21:30",type:1}
      ]
    }
  },
  methods:{
    openPicker() {
      //this.$refs[picker].open()
      console.log(this.$refs)
    },
    handleChange (value) {
      console.log(value)
    }
  },
  components: {
    Grid
  }
}
</script>
<style lang="scss" scoped>
.bar{
  background:#2b2e48
}
.mint-popup{
  background:#222;
}
.content{
  background:#222;
  ul{
    height:120%;
  }
  li{
    height: 4rem;
    .grid{
      width:100%;
      height:100%;
      color:#fff;
      padding:0 1rem;
      .title{
        font-size:1rem;
      }
      .time{
        font-size: 2rem;
        font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif;
        font-weight:100;
      }
    }
  }
}

</style>