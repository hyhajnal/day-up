<template>
	<div class="card_wrap">
		<div class="card_head sticky" >
			<span v-text="title" ></span>
		</div>
		<div class="outter_body" v-if="avg == 0">
        <div class="card_body">
          <slot name="content" class="scroll_h"></slot>
        </div>  
    </div>
    <grid class="card_body" wrap="wrap" :avg="avg" align="between" v-if="avg">
        <slot></slot>
    </grid>
		<div class="card_foot">
			<slot name="foot"></slot>
		</div>
	</div>
</template>

<script>
import Grid from '../Flex/Grid'
import Item from '../Flex/Col'
export default{
	props: {
    title: {
      type: String
    },
    avg: Number
  },
  components: {
    Grid,
    Item
  }
}
</script>

<style lang="scss" scoped>
.card_wrap{
  width:100%;
  background-color: #fff;
  margin:1rem auto;
  padding:.5rem 1rem;

  .card_head{
    border-left: 2px solid #ee4d4d;
    margin-bottom: 1rem;
    span{
      padding-left:.4rem;
    }
  }

  .outter_body{
    height:7.5rem; //隐藏横向滚动条
    overflow-y:hidden;
    .card_body{
      width:100%;
      height:9rem;
      overflow-x:scroll;
      -webkit-overflow-scrolling: touch;/*滚动touch*/
      display: flex;
      flex-flow: row no-wrap;
      .img_box{
        width:8rem;
      }
      .card_child{
        width:9rem;
      }
    }
  }

  .card_body{
    width:100%;
    .img_box{
      width:100%;
    }
  }


}	
</style>