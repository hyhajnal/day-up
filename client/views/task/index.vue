<template>
	<div class="content content_head">		
		<mt-header fixed title="作业列表">
			<router-link to="/home" slot="left">
		    <mt-button icon="back">返回</mt-button>
			</router-link>
			<mt-button icon="more" slot="right"></mt-button>
	    </mt-header>

		<div>
			<p>作业任务号： {{ $route.params.id }}</p>
		</div>

    <mt-progress :value="60">
      <div slot="start"></div>
      <div slot="end">12/20题</div>
    </mt-progress>

    <div class="cardlist">
      <math-card v-for="(card,i) in cards"
        :title="'问题'+ (i+1)" :content="card.content" :answer="card.answer" @throw="nextCard" :i="i">
      </math-card>
    </div>
  
    <op-table @num-press="myAnswer" @num-clear="clearNum"></op-table>

	</div>

</template>
<script>
import MathCard from '../../components/Math/MathCard'
import OpTable from '../../components/Math/OpTable'
export default {
	mounted() {
		this.$store.commit('setNavbar', 0)

	},

  data () {
    return {
      cards: [
        { content:'13 + 26 = ', answer: '?'},
        { content:'76 - 65 = ', answer: '?'},
        { content:'103 + 56 = ', answer: '?'},
        { content:'64 / 2 = ', answer: '?'}
      ],
      currentCard: 0
    }
  },

  methods: {
    nextCard () {
      this.currentCard ++
    },
    myAnswer(num) {
      if(this.cards[this.currentCard].answer === '?'){
        this.cards[this.currentCard].answer = ''
      }
      this.cards[this.currentCard].answer += num.toString()
    },
    clearNum() {
      this.cards[this.currentCard].answer = ''
    }
  },

  components: {
    MathCard,
    OpTable
  },

	beforeRouteLeave(to, from, next){
		this.$store.commit('setNavbar', 1)
		next()
	}
}
</script>

<style lang="scss">
.mt-progress{
  width:70%;
  margin:0 auto;
}
</style>