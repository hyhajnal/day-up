<template>
<div class="child_wrap">
  <mt-header title="我的习惯" fixed class="header">
      <i class="iconfont icon-side" slot="left" @click="openSidebar"></i>
      <mt-button icon="more" slot="right"></mt-button>
  </mt-header>
	<div class="content content_head content_bottom">
      <ul>
        <li v-for="(item,index) in sparetime.timeList">
          <grid wrap="wrap" align="between" :avg="3" >
              <div class="title">{{item.content}}</div>
              <div class="time" @click="openPicker(index,'sTime')">{{item.sTime}}</div>
              <div class="time" @click="openPicker(index,'eTime')">{{item.eTime}}</div>
          </grid>
        </li>
        <li>
          <grid wrap="wrap" align="between">
              <column :cols="2"><div class="title">专注力 ( 30-50 )</div></column>
              <column :cols="4">
                <span>{{sparetime.focus}}</span>
                <mt-range v-model="sparetime.focus" :min="30" :max="50"
                :step="5" :bar-height="5" class="range">
                </mt-range>
              </column>
          </grid>
        </li>
        <li>
          <grid wrap="wrap" align="between">
              <column :cols="2"><div class="title">休息 ( 0-15 )</div></column>
              <column :cols="4">
              <span>{{sparetime.release}}</span>
                <mt-range v-model="sparetime.release" :min="0" :max="15"
                :step="3" :bar-height="5" class="range">
                </mt-range>
              </column>
          </grid>
        </li>
      </ul>
	</div>
  <mt-datetime-picker v-if="current"
    type="time"
    v-model="pickerValue"
    @confirm="handleChange"
    ref="picker"
    :startHour="timeRange[current.index].s"
    :endHour="timeRange[current.index].e">
  </mt-datetime-picker>
</div>
</template>

<script>
import Grid from 'components/Flex/Grid'
import Column from 'components/Flex/Col'
import { mapGetters } from 'vuex'
export default {
  name: 'page-navbar',
  mounted() {
    if(localStorage.getItem('sparetime')){
      this.sparetime = JSON.parse(localStorage.getItem('sparetime'))
    }
  	this.$store.commit('setBottom',false)
  	//this.begin = false
  },
  data() {
    return {
      pickerValue: null,
      sparetime:{
        focus: 40,
        release:10,
        timeList:[
          {content:'放学回家', sTime:"— —",eTime:""},
          {content:'吃饭', sTime:"— —",eTime:"— —"},
          {content:'睡觉', sTime:"",eTime:"— —"}
        ]
      },
      current:null,
      timeRange:[{s:16,e:17},{s:17,e:18},{s:20,e:21}]
    }
  },
  methods:{
    openPicker(index, time) {
      this.current = Object.assign({},this.someObject,{index:index,time,time})
      this.$nextTick(function(){
        this.$refs.picker.open()
      })
    },
    handleChange (value) {
      this.sparetime.timeList[this.current.index][this.current.time] = value
    },
    openSidebar() {
      this.$store.commit('setSidebar', true)
    }
  },
  components: {
    Grid,
    Column
  },
  beforeRouteLeave (to, from, next) {
    localStorage.setItem('sparetime',JSON.stringify(this.sparetime))
    //console.log(localStorage.getItem('sparetime'))
    next()
  },
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
    @include border(bottom,#ccc)
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