<template>
	<div class="content content_head">		
		<mt-header fixed :title="'作业列表'+$route.params.id ">
			<router-link to="/home" slot="left">
		    <mt-button icon="back">返回</mt-button>
			</router-link>
			<mt-button icon="more" slot="right"></mt-button>
	    </mt-header>
    
		<div>

        <start-button @click.native.once="start" :text="time"
        :class="{'start':!complete}"></start-button> 

		</div>
    
    <div>
      <mt-progress :value="(currentCard + 1) / (cards.length) * 100" 
      v-if="!complete && currentCard < cards.length">
        <div slot="start"></div>
        <div slot="end">{{ currentCard + 1 }} / {{cards.length}} 题</div>
      </mt-progress>

      <div class="cardlist" v-if="!complete">
        <math-card v-for="(card,i) in cards"
          :title="'问题'+ (i+1)" :content="card.content" :answer="card.answer" 
          @throw="nextCard" :i="i" :rs="card.rs">
        </math-card>
      </div>
    
      <transition name="fade">
        <op-table v-if="!complete"
          @num-press="myAnswer" @num-clear="clearNum">
        </op-table>
      </transition>
    </div>
  

	</div>

</template>
<script>
import MathCard from '../../components/Math/MathCard'
import OpTable from '../../components/Math/OpTable'
import StartButton from '../../components/Math/StartButton'
export default {
	mounted() {
		this.$store.commit('setNavbar', 0)

	},

  data () {
    return {
      cards: [
        { content:'13 + 26', answer: '', rs: null},
        { content:'76 - 65', answer: '', rs: null},
        { content:'103 + 56', answer: '', rs: null},
        { content:'64 / 2', answer: '', rs: null}
      ],
      currentCard: 0,
      complete: true,
      time: '开始',
      timer: null
    }
  },

  methods: {
    nextCard () {
      this.currentCard < this.cards.length  ? this.currentCard ++ : this.cards.length
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
      content[0] = parseInt(content[0])
      content[2] = parseInt(content[2])

      if( content[1] == '+' ) {
        t_answer = content[0] + content[2]
      }

      if( content[1] == '-' ) {
        t_answer = content[0] - content[2]
      }

      if( content[1] == '*' ) {
        t_answer = content[0] * content[2]
      }

      if( content[1] == '*' ) {
        t_answer = content[0] / content[2]
      }

     
      return t_answer ==  c_answer
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

      this.time = h + ':' + m +':' + s

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

  components: {
    MathCard,
    OpTable,
    StartButton
  },

	beforeRouteLeave(to, from, next){
		this.$store.commit('setNavbar', 1)
		next()
	}
}
</script>

<style lang="scss" scoped>
.mt-progress{
  position:absolute;
  top:20%;
  width:70%;
  margin:auto;
  left:0;right:0;
}
.mt-progress-progress{
  transition:width 500ms;
}

.start {
  transform: scale(.3);
  top:1%;
  margin: 0 auto;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter{
  opacity: 1;
  transform: translateY(100px);
}
.fade-leave{
  opacity: 0;
  transform: translateY(-100px);
}
</style>