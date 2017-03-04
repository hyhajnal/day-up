<template>
<div class="child_wrap">
	<mt-header title="首页" fixed class="header">
		<i class="iconfont icon-side" slot="left" @click="openSidebar"></i>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
	<div class="content content_head content_bottom">
		<mt-swipe :auto="4000">
		  <mt-swipe-item>
		  	<img src="/images/1.jpg" alt="1">
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	<img src="/images/2.jpg" alt="2">
		  </mt-swipe-item>
		  <mt-swipe-item>
		  	<img src="/images/3.jpg" alt="3">
		  </mt-swipe-item>
		</mt-swipe>

		<div class="bar_m">
			<div class="bar_wrap">
				<span class="iconfont icon-zhong" @click="open('picker4')"></span>
				<section>
					<i class="iconfont icon-jinri"></i>
					<em>今日</em>
				</section>
				<span>{{ date | dateFilter }}</span>
			</div>
		</div>

		<mt-datetime-picker
	      ref="picker4"
	      type="date"
	      v-model="value4"
	      year-format="{value} 年"
	      month-format="{value} 月"
	      date-format="{value} 日"
	      @confirm="handleChange">
	    </mt-datetime-picker>


		<div>
			<mt-spinner color="#26a2ff" type="triple-bounce" v-if='loading' class="align-c"></mt-spinner>
			<div id="timeline" v-if='!loading'>
				<!-- .............................................. -->
				<div class='subj-item' v-for="(task,i) in tasks">
					<div class='subj-title' @click='changeDown(i)'>
						<div class="subj-icon">
							<span :class="{ 'iconfont icon-down': isDown[i], 'iconfont icon-up':!isDown[i] }"></span>
						</div>
						<mt-badge size="small" color="#ffc107">{{task.name}}</mt-badge>
					</div>
					<!-- .............................................. -->
					<transition name="fade">
						<div class="subj-content" v-show='isDown[i]'>
							<div class="timeline-item" v-for="(child,index) in task.items">
							<!-- <router-link :to="{ name: 'taskIndex', params: { id: child._id }}"> -->
								<div class="timeline-icon">
								</div>
								<div :class="[ index % 2 == 0 && i % 2 != 0 ? 'right ': '', 'timeline-content']" @click='goTask(i,index)'>
									<p class="content-text">{{child.content}}</p>
									<p class="content-icon">
										<span :class="{'iconfont icon-shouji':!child.done && child.type == 0,
										'iconfont icon-edit':!child.done && child.type == 1,
										'iconfont icon-wancheng':child.done}"></span>
									</p>
								</div>
							<!-- </router-link> -->
							</div>
					</transition>
					<!-- .............................................. -->
				</div>
				<!-- .............................................. -->
			</div>
			<p class="align-c">
				<span v-if="!loading && rst == 1">服务器出错</span>
				<span v-if="!loading && rst == 2">网络连接出错</span>
				<span v-if="!loading && !tasks">暂无数据</span>
			</p>
			<p><span class="iconfont icon-zhong"></span></p>
		</div>
	</div>
</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { MessageBox } from 'mint-ui'
	const CN = ['一','二','三','四','五','六','日', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const EN = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

	export default {
		name: 'Home',
		beforeMount() {
			//当从另一个页面返回时，不会调mounted方法
			this.$store.commit('setBottom', true)
			this.date = new Date().getFullYear()+'/'
						+ ( new Date().getMonth() + 1 ) + '/'
						+ new Date().getDate()
			if(!this.$store.state.task.items){
				this.getTasks()
			}else{
				this.doneList()
			}
		},
	    data() {
	        return {
			    url: this.$store.state.serverHost,
		        value4: null,
		        visible4: false,
		        isDown: null,
		        date: '',
		        loading: false,
		        rst:null
	        }
	    },
	    methods: {
	        open(picker) {
	        	this.$refs[picker].open()
	      	},
	      	handleChange(value) {
	      		let timeArray = value.toString().split(' ')
	      		let week = CN[EN.indexOf(timeArray[0])]
	      		let month = CN[EN.indexOf(timeArray[1])]
	      		let day = timeArray[2]
	      		let year = timeArray[3]
	        	this.date = year + '/' + month + '/' + day 
	        	this.getTasks()
	        },
	      	getTasks() {
	      		let self = this
	      		let url = this.url+'/server/student/tasks?date='+this.date
	      		self.loading = true
		        self.$http.get(url)
		      	.then((response) => {
		      		//success
		      		self.loading = true
		      		if(response.data.success){
		      			//这里的bug调了很久，isDown这个字段之前是先赋值给data后再添加的，
		      			//然后视图无法由数据变化而更新。后来是先添加字段再赋值给data
		      			let tasks = response.data.data

		      			let taskList = []
		      			tasks.forEach( function(task,i){
		      				/*self.isDown = Object.assign({}, self.isDown, { [i]: true})*/
		      				task.items.forEach(function(item, idx){
		      					let itm = {
		      						id: item._id,
		      						content: item.content,
		      						done: false,
		      						tag: item.type,
		      						type: item.external ? 0: 1,
		      						external:item.external ? item.external : null 
		      					}
		      					taskList.push(itm)
		      				})
		      			})
		      			localStorage.setItem('taskLength', tasks.length)
		      			self.doneList()
			      		self.$store.dispatch('initTasks',taskList)
		      		}else{
					    MessageBox.alert('获取失败!', '提示')
					    self.rst = 1
		      		}
		      		self.loading = false
		      	}, (response) => {
		      		//error
					MessageBox.alert('网络连接错误!', '提示')
		      		self.rst = 2
		      		self.loading = false
		      	})
	      	},
	      	changeDown(i) {
	      		this.isDown[i] = !this.isDown[i]
	      	},
	      	goTask( i, index){
	      		let item = this.tasks[i].items[index]
	      		if(!item.done && item.type == 0){
	      			const page = item.tag == '语文'? 'taskChinese' : 'taskMath'
	      			this.$router.replace({ name: page, params: { id: item.id }})
	      		}else{
	      			this.$store.dispatch('toogleItem',item)
	      		}   			      		
	      	},
	      	doneList(){
	      		const length = parseInt(localStorage.getItem('taskLength'))
	      		for(let i = 0; i < length; i++){
	      			this.isDown = Object.assign({}, this.isDown, { [i]: true})
	      		}
	      	},
	      	openSidebar() {
		      this.$store.commit('setSidebar', true)
		    }
	    },
	    filters: {
              dateFilter : function(date){
              		let d = date.split('/')
                    return d[0] + '/' + d[1] + '/' + d[2] 
              }
        },
		computed: {
	      ...mapGetters({
	        tasks: 'currentTasks'
	      })
	    }


	}
</script>

<style lang='scss'  src='../../static/css/components/timeline.scss' scoped>
</style>