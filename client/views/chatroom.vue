<template>
	<div>
	  <header class="bar bar-nav">
	    <a class="button button-link button-nav pull-left back" @click.prevent="clear">
	      <span class="icon icon-friends" @click="popupVisible = true"></span>
	    </a>
	    <h1 class="title">聊天室</h1>
	  </header>
	  <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mint-popup" >
			<ul class="add_container">
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
				<li class="add_item">
					<img src="/images/panda.png" width="30" height="30">
					<div class="room">
						<div class="room_title">聊天室</div>
						<mt-button size="small" type="primary">加入</mt-button>
					</div>
				</li>
			</ul>
	  </mt-popup>
	  <div class="content">
			<mt-cell-swipe
			  v-for="room in rooms"
			  :title= "room.name"
			  :right="[
			    {
			      content: '退出',
			      style: { background: 'red', color: '#fff' },
			      handler: () => logout(room.id, room.name)
			    }
			  ]"
			  :label= "room.lastMsg.owner+':'+room.lastMsg.content"
			  >
			  		<em @click='goChat(room.id)'>{{ room.lastMsg.timestamp | time }} &nbsp;&nbsp;&nbsp;&nbsp;</em>
			  		<mt-badge size="small" type="primary">{{ room.unreadNum }}</mt-badge>
					<img slot="icon" src="/images/panda.png" width="50" height="50">
			</mt-cell-swipe>

	  </div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { MessageBox } from 'mint-ui'
	import * as Csocket from '../api/socket'
	export default {
		mounted() {
		    if(!localStorage.getItem('usrId')){
		  	    MessageBox.prompt('请输入姓名').then(({ value, action }) => {
		        	localStorage.setItem('usrId', value + Date.now())
		        	localStorage.setItem('usrName',value)
		      	}).catch( ( cancle ) => {
		      		console.log(cancle)
		      	})
		    }
	    },
	    data() {
	    	return {
	    		popupVisible: false
	    	}
	    },
		methods: {
			goChat (id) {
				this.$store.dispatch('changeRoom', { id })
				this.$router.replace({ name: 'chatwindow', params: { id: '123'}})
			},
			logout(roomId, name){
				MessageBox.confirm('确定要退出'+name+'聊天室么?').then(action => {
				  Csocket.init(roomId)
				  Csocket.logout(roomId)
				}).catch( (cancle) => {
					//console.log(cancle)
				})
			}
		},
		computed: {
			...mapGetters([
				'rooms',
				'currentRoom'
			])
		}
	}
</script>

<style lang='scss' scoped>
	#childPage a{
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		/* 移动端a被touch显示的背景色 */
	}
	#childPage .mint-cell-label{
		margin-bottom:6px;
	}
	#childPage .mint-cell-title img{
		border-radius: 50%;
	}

	.mint-popup {
        width: 14rem;
        height:16rem;
        overflow-y:auto;
        -webkit-overflow-scrolling : touch; 
        border-radius: 8px;
        padding: 1rem;
        transform: translate(-50%, -8rem);
        h1 {
          font-size: 20px;
          color: #26a2ff;
        }
        p {
          margin-bottom: 10px;
        }
      }

      .add_container{
      	font-size: .1rem;
      	margin:0;
      	padding: 0;
      	width: 100%;
      	list-style: none;
      	display: flex;
      	flex-flow: row wrap;
      	justify-content: center;

  		li{
  			box-sizing: border-box;
			background: #fff;
			flex: 0 0 50%;
			height: 3rem;
			box-shadow: 1px 1px 7px #bcbcbc; 
			
			display: flex;
			flex-flow: row nowrap;
			justify-content:space-around;
			align-items:center;
				
				.mint-button--small{
					padding: .1rem .3rem;
					height:auto;
				}
  		}
      }

</style>