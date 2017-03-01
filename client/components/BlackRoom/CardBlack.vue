<template>
	<div class="card_wrap">
		<div class="card_head">
			<div class="head_wrap">
        <span class="title">数学
          <span class="subtitle">数学科特18-20页</span>
        </span> 
        <span class="num">46<em>人已完成</em></span>  
      </div>
		</div>
    <div class="card_body" wrap="wrap">
      <span>00:40:00</span>
    </div>
		<div class="card_foot">
      <div class="ctr_btn">开始</div>
      <div class="ctr_btn">完成</div>
		</div>
	</div>
</template>

<script>
import Grid from '../Flex/Grid'
import Item from '../Flex/Col'
export default{
	props: {
    /*title: {
      type: String
    },
    avg: Number*/
  },
  components: {
    Grid,
    Item
  }
}
</script>

<style lang="scss">
.card_wrap{
  width:90%;
  height:70%;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  position: absolute;
  background:none;
  border-radius:8px;
  .card_head{
    height:50%;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    background-image:url('/images/2.jpg');
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
        font-size:1.2rem;
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
  .card_foot{
    height:25%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    background:radial-gradient(circle at top left,transparent 15px,#fff 0) top left,
               radial-gradient(circle at top right,transparent 15px,#fff 0) top right;
    background-size:50% 100%;
    background-repeat: no-repeat;
  }
  .card_body{
    height:25%;
    text-align:center;
    padding-top:2rem;
    background:/* linear-gradient(-45deg,transparent 15px,#fff 0) bottom right,
               linear-gradient(45deg,transparent 15px,#fff 0) bottom left; */
               radial-gradient(circle at bottom left,transparent 15px,#fff 0) bottom left,
               radial-gradient(circle at bottom right,transparent 15px,#fff 0) bottom right;
    background-size:50% 100%;
    background-repeat: no-repeat;
    padding:0 15px;
    span{
      width:100%;
      font-size:3rem;
      color:#000;
      height:100%;
      display:block;
      border-bottom:dashed 1px #ccc;
    }
  }

  .ctr_btn{
    width:4rem;
    height:4rem;
    background:#26a2ff;
    text-align:center;
    line-height:4rem;
    border-radius:100%;
    font-size:1.5rem;
    color:#fff;
  }
}
</style>