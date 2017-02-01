<template>
	<div >
		<header class="bar bar-nav">
			<router-link :to="'/chat'" class="button button-link button-nav pull-left back">
				<span class="icon icon-left">返回</span>
			</router-link>
			<h1 class="title">聊天室{{ room.name }}</h1>
      <!-- {{ $route.params.id }} -->
		</header>
		<div class="content" ref="list">
        <div class="chat_wrap" v-for="msg in msgs" >
          <mt-badge size="small" type="primary" color="#ccc"
                    v-if = "msg.type == 2" class="sys_tip">
            <strong>{{ msg.owner }}</strong> 加入了群聊
          </mt-badge>
          <div :class="{ 'item me': msg.type == 0, 
                         'item other' : msg.type == 1}" 
            v-if = "msg.type != 2">
            <div class="avator">
              <div class="name"><strong>{{ msg.owner }}</strong></div>
              <img src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg" alt="avator" width='50' height='50'>

            </div>
            <div class="chat_content">
              <div class="time"><em>{{ msg.timestamp | time}}</em></div>
              <div class="saying">{{ msg.content }}</div>
            </div>
          </div>
          

        </div>
      </div>

      <div class="sendbox">
        <input type="text" ref="msg" @keyup.enter='sendMsg'>
        <span class="icon icon-emoji"></span>
        <mt-button size="small" type="primary" @click="send()">发送</mt-button>
      </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as Csocket from '../api/socket'
	export default{
    mounted() {
      this.$store.commit('setNavbar', 0)
      Csocket.init(this.room.id)
    },
    methods: {
      sendMsg (e) {
        const content = e.target.value
        if (content.trim()) {
          Csocket.sendMsg(content, this.room.id, 0)
          e.target.value = ''
        }
      },
      send (){
        let msg = this.$refs.msg.value
        if(msg.trim()){
          Csocket.sendMsg(msg, this.room.id, 0)
          this.$refs.msg.value = ''
        }
      }

    },
    computed: {
      ...mapGetters({
        room: 'currentRoom',
        msgs: 'currentMsgs'
      })
    },
    watch: {
      //监听room.lastMsg值的变动，当有新消息时，自动滚到底部
      'room.lastMsg': function(){
        this.$nextTick(() => {
          const list = this.$refs.list
          //滚动条高度为list的高度
          list.scrollTop = list.scrollHeight
        })
      }
    },
    beforeRouteLeave(to, from, next){
      //离开恢复navbar
      this.$store.commit('setNavbar', 1)
      next()
    }

	}
</script>

<style lang='scss' scoped>
$font-color: #fff;
$font-color-alter: #333;
$message-color: #2ECC71;


.content{
  padding-bottom: 2.5rem;
  -webkit-overflow-scrolling: touch;
}
.chat_wrap{

  padding:.2rem .8rem;
  text-align: center;

  .sys_tip{
    margin: .2rem auto;
  }

  .item{
    display:flex;
    flex-direction:row;

    .avator{
      flex-shrink:0;
      img{
          border-radius:50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      }
    }

    .chat_content{
      padding-top:.8rem;
      padding-left:1rem;

      .saying{
        background-color:$message-color;
        border-radius:.3rem;
        padding:.2rem;
        position:relative;
        color:#fff;

        &:after{
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          border-top: .6rem solid $message-color;
          border-left: 1rem solid transparent;
          border-right: 1rem solid transparent;

        }
      }
    }

  }

  .me{
    flex-direction:row-reverse;
    .chat_content{
      padding-right:1rem;

      .time{
        text-align: right;
      }
      .saying:after{
        right:-.7rem;
      }
    }
  }

  .other .saying:after{
    left:-.7rem;
  }

}

.sendbox{
    position:fixed;
    bottom:0;
    z-index: 1000;
    width: 100%;
    display: flex;
    flex-direction:row;
    background-color: #ccc;
    align-items:center;
    padding:.5rem;

    input{
      -webkit-appearance:none;
      flex:1;
      border:none;
    }

    span{
      padding: 0 .2rem;
    }
  }






</style>