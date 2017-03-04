<template>
<div class="child_wrap">
	<mt-header title="我的圈子" fixed class="header">
		<i class="iconfont icon-side" slot="left" @click="openSidebar"></i>
        <i class="iconfont icon-add" slot="right" @click="popupVisible = true"></i>
    </mt-header>
	<div class="content content_bottom content_head chatPage">
	    <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="mint-popup" >
			<ul class="add_container">
				<li class="add_item" v-for="room in rooms_all">
					<div class="room">
						<img src="/images/panda.png" width="30" height="30">
						<div class="room_title">{{ room.name }}</div>
					</div>
					<mt-button size="small" type="primary" @click="addRoom(room, $event)" >加入</mt-button>
				</li>
			</ul>
	    </mt-popup>
	    <div>
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
</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { MessageBox } from 'mint-ui'
	import * as Csocket from '../api/socket'
	import { roomData } from '../api/chatData'
	export default {
		mounted() {
			this.$store.commit('setBottom', true)
		    if(!localStorage.getItem('usrId')){
		  	    MessageBox.prompt('请输入姓名').then(({ value, action }) => {
		        	localStorage.setItem('usrId', value + Date.now())
		        	localStorage.setItem('usrName',value)
		      	}).catch( ( cancle ) => {
		      		console.log(cancle)
		      	})
		    }
		    Csocket.init()
	    },
	    data() {
	    	return {
	    		popupVisible: false,
	    		rooms_all: roomData.rooms
	    	}
	    },
		methods: {
			goChat (id) {
				this.$store.dispatch('changeRoom', { id })
				this.$router.replace({ name: 'chatwindow', params: { id: '123'}})
			},
			logout(roomId, name){
				MessageBox.confirm('确定要退出'+name+'聊天室么?').then(action => {
				  Csocket.logout(roomId)
				  //this.$store.dispatch('remove_room',{ roomId })
				}).catch( (cancle) => {
					//console.log(cancle)
				})
			},
			addRoom(room, e){
				e.target.className +=  ' added'
				e.target.innerText = '已加入'
				Csocket.listen_login(room.id) //监听加入
				Csocket.listen_logout(room.id) //监听退出
				Csocket.login(room.id)
				this.$store.dispatch('add_room',room)
			},
	      	openSidebar() {
		      this.$store.commit('setSidebar', true)
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

<style lang='scss'>
.chatPage{
	a{
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		/* 移动端a被touch显示的背景色 */
	}
	.mint-cell-label{
		position:absolute;
		left:4rem;
		bottom:20%;
	}
	.mint-cell-text{
		top:20%;
		position:absolute;
		left:4rem;
	}
	.mint-cell-title img{
		border-radius: 50%;
	}

	.mint-cell-wrapper{
		padding:.2rem;
	}

	.mint-popup {
        width: 14rem;
        height:16rem;
        overflow-y:auto;
        -webkit-overflow-scrolling : touch; 
        border-radius: 8px;
        transform: translate(-50%, -8rem);
        font-size: .85rem;
        padding:1rem;
      }

      .add_container{
      	margin:0; padding: 0;
      	width: 100%; height:100%;
      	list-style: none;
      	display: flex;
      	flex-flow: row wrap;
      	justify-content: center;

  		li{
  			text-align: center;
  			box-sizing: border-box;
			background: #fff;
			flex: 0 0 50%;
			padding:.1rem;			
			display: flex;
			flex-flow: row nowrap;
			justify-content:space-around;
			align-items:center;
				
				.mint-button--small{
					width:2.8rem;
					height:1.2rem;
					line-height: 1.2rem;
					padding:0;
					transition:all 1s;
					animation: bounceIn_custom 0.6s ease-in-out;
				}

				@keyframes bounceIn_custom {
					 0% {
					 transform: scale(1);
					}
					 50% {
					 	transform: scale(1.2);
					}
					 100% {
					 	transform: scale(1);
					}
				}

				.room_title{  /* 超过截断 */
					width:35px;
					white-space: nowrap;  
					overflow: hidden;  
					text-overflow:ellipsis;      /*兼容IE*/
					margin-top: -7px;  
				}

				.added{
					background-color: #fff;
					border: 1px solid #26a2ff;
					color:#26a2ff;
					font-size: .7rem;
				}
  		}
      }
}
</style>