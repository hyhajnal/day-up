<template>
<div class="child_wrap">
  <mt-header title="我的习惯" fixed class="header">
      <i class="iconfont icon-side" slot="left" @click="openSidebar"></i>
      <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
	<div class="content content_head content_bottom">
      <ul>
        <li class="border_1px" v-for="(item,index) in timeList">
          <grid wrap="wrap" align="between" :avg="3">
              <div class="title">{{item.content}}</div>
              <div class="time" @click.stop="test">{{item.sTime}}</div>
              <div class="time" @click="openPicker(index,'eTime')">{{item.eTime}}</div>
          </grid>
        </li>
      </ul>
	</div>
  <!-- <mt-datetime-picker
    type="time"
    v-model="pickerValue"
    @confirm="handleChange"
    ref="picker">
  </mt-datetime-picker> -->
</div>
</template>

<script>
import Grid from '../../components/Flex/Grid'
export default {
  name: 'page-navbar',
  mounted() {
  	this.$store.commit('setBottom',false)
  	//this.begin = false
  },
  data() {
    return {
      pickerValue: null,
      timeList:[
        {content:'放学回家', sTime:"17:00",eTime:"— —",type:1},
        {content:'吃饭', sTime:"18:00",eTime:"18:30",type:1},
        {content:'睡觉', sTime:"— —",eTime:"21:30",type:1}
      ],
      current:null
    }
  },
  methods:{
    test(){ 
      alert('test')
    },
    openPicker(index, time) {
      debugger
      this.$refs.picker.open()
      this.$set(this.current,'index',index)
      this.$set(this.current, 'time', time)
    },
    handleChange (value) {
      timeList[this.current.index][this.current.time] = value
    },
    openSidebar() {
      this.$store.commit('setSidebar', true)
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