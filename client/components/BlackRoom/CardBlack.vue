<template>
	<div class="bc_card_wrap">
		<div class="bc_card_head" :style="{backgroundImage: 'url(' + img + ')'}">
			<div class="head_wrap">
        <span class="title">{{ title }}
          <span class="subtitle" v-if="subtitle">{{ subtitle }}</span>
        </span> 
        <span class="num" v-if="num">{{ num }}<em>人已完成</em></span>  
      </div>
		</div>
    <div class="bc_card_body" wrap="wrap">
      <time-remind :stime="stime" :etime="etime" :done="done" 
      @changecard="timeout" @start="stage = 1"></time-remind>
    </div>
		<div class="bc_card_foot">
      <div class="stage stage0" v-if="stage == 0">未开始</div>
      <div class="stage stage1" v-if="stage == 1">进行中</div>
      <div class="stage stage2" v-if="stage == 2">已完成</div>
      <div class="stage stage3" v-if="stage == 3">未完成</div>
      <div class="ctr_btn" @click="haveDone" v-if="stage == 1">完&nbsp;&nbsp;成</div>
		</div>
	</div>
</template>

<script>
import TimeRemind from '../BlackRoom/TimeRemind'
import { MessageBox } from 'mint-ui'
export default{
	props: {
    title: String,
    subtitle: String,
    num: String,
    stime: String,
    etime: String,
    done: Boolean,
    img: String
  },
  data(){
    return {
      stage:0
    }
  },
  watch:{
    stime: function(){
      this.stage = 0
    }
  },
  components: {
    TimeRemind
  },
  methods: {
    timeout() {
      if(this.done){
        this.stage = 2
      }else{
        this.stage = 3
      }
      this.$emit('next')
    },
    haveDone () {
        this.stage = 2
        this.$emit('done')
    }
  }
}
</script>

<style lang="scss" scoped>
.bc_card_wrap{
  width:90%;
  height:70%;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  position: absolute;
  background:none;
  border-radius:8px;
  .bc_card_head{
    height:50%;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    /* background-image:url('/images/2.jpg'); */
    background-size:cover;
    position:relative;
    .head_wrap{
      width:100%;
      height:40%;
      position:absolute;
      bottom:0;
      background:linear-gradient(rgba(255,255,255,0),rgba(0,0,0,8));
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding: 0 2rem;
      color:#fff;
      .title{
        font-size:1.5rem;
      }
      .subtitle{
        display:block;
        font-size:1rem;
      }
      .num{
        font-size:1rem;
        border-radius:8px;
        display:block;
        width:3rem;
        height:3rem;
        border:1px solid #fff;
        text-align:center;
        em{
          font-size:.5rem;
        }
      }
    }
  }
  .bc_card_foot{
    height:25%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    background:radial-gradient(circle at top left,transparent 15px,#fff 0) top left,
               radial-gradient(circle at top right,transparent 15px,#fff 0) top right;
    background-size:50% 100%;
    background-repeat: no-repeat;
  }
  .bc_card_body{
    height:25%;
    text-align:center;
    padding-top:2rem;
    background:/* linear-gradient(-45deg,transparent 15px,#fff 0) bottom right,
               linear-gradient(45deg,transparent 15px,#fff 0) bottom left; */
               radial-gradient(circle at bottom left,transparent 15px,#fff 0) bottom left,
               radial-gradient(circle at bottom right,transparent 15px,#fff 0) bottom right; //径向渐变
    background-size:50% 100%;
    background-repeat: no-repeat;
    padding:0 15px;
  }

  .stage, .ctr_btn{
    padding:.5rem;
    border-radius:4px;
    font-size:1rem;
    color:#fff;
  }
  .stage0{
    background:#26a2ff;
  }
  .stage1{
    background:#ffaa26;
  }
  .stage2{
    background:#3bc159;
  }
  .stage3{
    background:red;
  }

  .ctr_btn{
    background:#26a2ff;
  }
}
</style>