<template>
	<div class="content content_head">		

    <progress-circle v-if="complete && currentCard > 0"
    :percent="score" :radius="90"></progress-circle>

    <start-button @click.native.once="start" :text="time"
    :class="{'start':!complete }" v-if="currentCard < cards.length"></start-button> 
    
    <transition name="time">
      <div class="time" v-if="currentCard > cards.length - 1">所用时间{{ time | dateFilter}}</div>
    </transition>
    <div>
      <mt-progress :value="(currentCard + 1) / (cards.length) * 100" 
      v-if="!complete && currentCard < cards.length">
        <div slot="start"></div>
        <span slot="end" class="card_progress">{{ currentCard + 1 }} / {{cards.length}} 题</span>
      </mt-progress>

      <div class="cardlist" v-if="!complete && currentCard < cards.length">
        <math-card v-for="(card,i) in cards"
          :title="'问题'+ (i+1)" :content="card.content" :answer="card.answer" 
          @throw="nextCard" :i="i" :rs="card.rs">
        </math-card>
      </div>
    
      <transition name="fade">
        <op-table v-if="!complete && currentCard < cards.length"
          @num-press="myAnswer" @num-clear="clearNum">
        </op-table>
      </transition>
    </div>
  

	</div>

</template>
<script>
import { findIndex as _findIndex } from 'lodash'
import MathCard from '../../components/Math/MathCard'
import OpTable from '../../components/Math/OpTable'
import StartButton from '../../components/Math/StartButton'
import ProgressCircle from '../../components/Progress'
export default {
	mounted() {
		this.$store.commit('setNavbar', this.control)
    const id = this.$route.params.id
    const items = this.$store.state.task.items
    const index = _findIndex(items, function(item) {
                    return item.id == id
                  })
    this.task = items[index]
    this.task.external.forEach((value, i) => {
      const card = { content:value, answer: '', rs: null}
      this.cards.push(card)
    })
	},

  data () {
    return {
      control: {
        header: true,
        bottom: false,
        title: '口算练习',
        content: {
          icon1: 'back',
          icon2: 'more',
          url: '/'
        }
      },
      task:null,
      cards: [],
      currentCard: 0,
      complete: true,
      time: '开始',
      timer: null,
      score: 0
    }
  },

  methods: {
    nextCard () {
      //this.currentCard < this.cards.length  ? this.currentCard ++ : this.cards.length
      if( this.currentCard < this.cards.length ) {
        this.currentCard ++
      }
      if( this.currentCard > this.cards.length - 1 ){
        this.$store.dispatch('toogleItem', this.task)
      }
    },
    myAnswer(num) {
      let card = this.cards[this.currentCard]
      card.answer += num.toString()
      card.rs = this.judge()
    },
    clearNum() {
      let card = this.cards[this.currentCard]
      card.answer = ''
      card.rs = this.judge()
    },
    
    judge() {
      const content = this.cards[this.currentCard].content.trim().split(' ')
      const c_answer = this.cards[this.currentCard].answer.trim()
      let t_answer
      content[0] = parseInt(content[0].trim())
      content[2] = parseInt(content[2].trim())

      if( content[1] == '+' ) {
        t_answer = content[0] + content[2]
      }

      if( content[1] == '-' ) {
        t_answer = content[0] - content[2]
      }

      if( content[1] == '*' ) {
        t_answer = content[0] * content[2]
      }

      if( content[1] == '/' ) {
        t_answer = content[0] / content[2]
      }
      if(t_answer ==  parseInt(c_answer)){
        this.score += 100 / this.cards.length
      }
      return t_answer ==  parseInt(c_answer)
    },

    timeCounter () {
      let h = 0,m = 0,s = 0 
      this.timer = setInterval(() => {
        s++
        if(s > 59){
          s = 0
          m++
        }
        if(m > 59){
          m = 0
          h++
        }

      const hh = h < 10 ?  ('0'+h) : h
      const mm = m < 10 ?  ('0'+m) : m
      const ss = s < 10 ?  ('0'+s) : s
      this.time = hh + ':' + mm +':' + ss

      }, 1000)

    },

    start () {
      this.complete = !this.complete
      if(!this.complete){
        this.timeCounter()
      }
    }

  },

  watch: {
    currentCard: function(val, oldVal){
      if(val == this.cards.length) {
        setTimeout(() => {
          this.complete = true
          clearInterval(this.timer)
        }, 1000)
      }
    }
  },

  filters: {
    dateFilter : function(date){
        let d = date.split(':')
        const h = d[0] != 0 ? (d[0] + '时') : ''
        const m = d[1] != 0 ? (d[1] + '分') : ''
        const s = d[2] != 0 ? (d[2] + '秒') : ''
        return h + m + s
    }
  },

  components: {
    MathCard,
    OpTable,
    StartButton,
    ProgressCircle
  },

	beforeRouteLeave(to, from, next){
		next()
	}
}
</script>

<style lang="scss">
.mt-progress{
  position:absolute;
  top:25%;
  width:70%;
  margin:auto;
  left:0;right:0;
    .mt-progress-progress{
      transition:all 2s ease-out;
    }

}
.card_progress{
  border:1px solid #ee4d4d;
  padding:0 .3rem;
  margin-left:1rem;
  color:#ee4d4d;
  border-radius:4px;
}

.start {
  transform: scale(.4) !important;
  margin: 0 auto !important;
}

.time {
  background:#fff;
  display:inline-block;
  font-size:1rem;
  border-radius: .5rem;
  margin-top:20%;
  margin-right:-1rem;
  float:right;
  padding:.8rem 1.2rem
}

.fade-enter-active,.time-enter-active{
  transition: all .5s
}
.fade-enter{
  opacity: 1;
  transform: translateY(100px);
}
.time-enter{
  opacity: 1;
  transform: translateX(20px);
}
</style>