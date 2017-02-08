<template>
	<div class="card_wrap">
		<div class="card_head">
			<span v-text="title"></span>
		</div>
		<div class="outter_body">
        <ul class="card_body">
          <slot></slot>
        </ul>  
    </div>
		<div class="card_foot">
			<slot name="foot"></slot>
		</div>
	</div>
</template>

<script>
export default{
	props: ['title']
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
  }

  .card_body{
    width:100%;
    height:9rem;
    overflow-x:scroll;
    -webkit-overflow-scrolling: touch;/*滚动touch*/
    display: flex;
    flow-row: row no-wrap;
   
    li:first-child{
      margin-left: -.1rem;
    }
    li:last-child{
      margin-right: -.1rem;
    }
  }
}	
</style>