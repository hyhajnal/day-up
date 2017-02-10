<template>

<div class="op_table">
    <div class="num_bar">
      <div class="row">
        <a class="num" v-for="n in 4" @click="numPress(n)">{{ n }}</a>
      </div>
      <div class="row">
        <a class="num" v-for="n in 4" @click="numPress(n+4)">{{ n + 4 }}</a>
      </div>
      <div class="row">
        <a class="btn" @click="clear">删除</a>
        <a class="num" @click="numPress(9)">9</a>
        <a class="num" @click="numPress(0)">0</a>
        <a class="btn">下题</a>
      </div>
    </div>
    <!-- <div class="button_bar">
      <button class="button">删除</button>
      <button class="button">下题</button>
    </div> -->
</div>
	
</template>

<script>
export default{
	props: [],
  methods: {
    numPress ( v ) {
      this.$emit('num-press', v)
    },
    clear () {
      this.$emit('num-clear')
    }
  }
}
</script>

<style lang="scss" scoped>
.op_table{
  width:100%;
  background-color:#2b2e48;
  display:flex;
  flex-flow:column no-wrap;
  position:fixed;
  bottom:0;
}

.num_bar{
  padding:.5rem;
  flex:1;
}
.row{
  display:flex;
  flex-flow:row wrap;
  justify-content: center;

  .num, .btn{
    margin:.3rem .4rem;
    width:3rem;
    height:3rem;
    display:block;
    border-radius:100%;
    text-align:center;
    line-height:3rem;
    background-color:#fff;
    color:#2b2e48;
    font-size:1.5rem;
  }

  .btn{
    background-color:orange;
    font-size:1rem;
  }
}

a:active{
  -webkit-animation: zoomIn 1s ease-out;
}

@keyframes zoomIn {
    0% {
      opacity: 1;
    }

    70% {
      opacity: 0;
      transform: scale3d(.1, .1, .1);
    }

    100% {
      opacity: 1;
      transform: scale3d(1);
    }
}
	
</style>