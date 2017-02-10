<template>
	<div class="content content_bottom content_head">

		<mt-button  @click="popupVisible = true">加入</mt-button>
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
</template>

<script>
	import { mapGetters } from 'vuex'
	import { MessageBox } from 'mint-ui'
	import * as Csocket from '../api/socket'
	import { roomData } from '../api/chatData'
	export default {
		mounted() {
			this.$store.commit('setNavbar', this.control)
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
	    		rooms_all: roomData.rooms,
	    		control: {
			        header: true,
			        bottom: true,
			        title: '我的圈子',
			        content: {
			          icon1: 'back',
			          icon2: 'more',
			          url: '/'
			        }
			    }
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
				e.target.className = 'added'
				e.target.innerText = '已加入'
				Csocket.listen_login(room.id) //监听加入
				Csocket.listen_logout(room.id) //监听退出
				Csocket.login(room.id)
				this.$store.dispatch('add_room',room)
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

	#childPage .mint-cell-wrapper{
		padding:10px;
	}

	.mint-popup {
        width: 14rem;
        height:16rem;
        overflow-y:auto;
        -webkit-overflow-scrolling : touch; 
        border-radius: 8px;
        padding: .2rem;
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
      	font-size: .5rem;
      	margin:0;
      	padding: 0;
      	width: 100%;
      	list-style: none;
      	display: flex;
      	flex-flow: row wrap;
      	justify-content: center;

  		li{
  			text-align: center;
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
				}

				.added{
					background-color: #fff;
					border: 1px solid #26a2ff;
					color:#26a2ff;
				}
  		}
      }

</style>