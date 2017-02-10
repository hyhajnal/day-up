<template>
	<div class="content content_head content_bottom">
		<!-- <mt-header title="STUDING" fixed>
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button icon="more" slot="right"></mt-button>
		</mt-header> -->

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
			<mt-spinner color="#26a2ff" type="triple-bounce" v-if='loading'></mt-spinner>
			<div id="timeline" v-if='!loading'>
				<!-- .............................................. -->
				<div class='subj-item' v-for="(task,i) in tasks">
					<div class='subj-title' @click='changeDown(i)'>
						<div class="subj-icon">
							<span :class="{ 'iconfont icon-down': task.isDown, 'iconfont icon-up':!task.isDown }"></span>
						</div>
						<mt-badge size="small" color="#ffc107">{{task._id}}</mt-badge>
					</div>
					<!-- .............................................. -->
					<transition name="fade">
						<div class="subj-content" v-show='task.isDown'>
							<div class="timeline-item" v-for="(child,index) in task.items">
							<!-- <router-link :to="{ name: 'taskIndex', params: { id: child._id }}"> -->
								<div class="timeline-icon">
								</div>
								<div :class="[ index % 2 == 0 && i % 2 != 0 ? 'right ': '', 'timeline-content']" @click='goTask(child._id, i, index)'>
									<p class="content-text">{{child.content}}</p>
									<p class="content-icon">
										<span :class="{'iconfont icon-shouji':!child.complete && child.online,
										'iconfont icon-edit':!child.complete && !child.online,
										'iconfont icon-wancheng':child.complete}"></span>
									</p>
								</div>
							<!-- </router-link> -->
							</div>
					</transition>
					<!-- .............................................. -->
				</div>
				<!-- .............................................. -->
			</div>
			<p><span class="iconfont icon-zhong"></span></p>
		</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui'
	const CN = ['一','二','三','四','五','六','日', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const EN = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

	export default {
		mounted() {
			this.$store.commit('setNavbar', this.control)
			this.date = new Date().getFullYear()+'/'
						+ ( new Date().getMonth() + 1 ) + '/'
						+ new Date().getDate()
			this.getTasks()
		},
	    data() {
	        return {
	        	control: {
			        header: true,
			        bottom: true,
			        title: '首页',
			        content: {
			          icon1: 'back',
			          icon2: 'more',
			          url: '/'
			        }
			    },
	        	url: this.$store.state.serverHost,
		        value4: null,
		        visible4: false,
		        tasks: null,
		        date: '',
		        loading: true
	        }
	    },
	    components: {},
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
	      		/*let url = this.url+'/data/student/tasks'*/
	      		self.loading = true
		        self.$http.get('http://192.168.2.7:3000/server/student/tasks?date='+this.date)
		      	.then((response) => {
		      		//success
		      		self.loading = false
		      		if(response.data.success){
		      			//这里的bug调了很久，isDown这个字段之前是先赋值给data后再添加的，
		      			//然后视图无法由数据变化而更新。后来是先添加字段再赋值给data
		      			let tasks = response.data.data
			      		tasks.forEach(function(task,i){
			      			task.isDown = 1 //标志下拉
			      			task.items.forEach(function(item, i){
			      				item.online = item.external ? 1: 0
			      			})
			      		})
			      		self.tasks = tasks
		      		}else{
					    MessageBox.alert('获取失败!', '提示')
		      		}
		      	}, (response) => {
		      		//error
					MessageBox.alert('网络连接错误!', '提示')
		      		self.loading = false
		      	})
	      	},
	      	changeDown(i) {
	      		this.tasks[i].isDown = !this.tasks[i].isDown
	      	},
	      	goTask(_id, i, index){
	      		let item = this.tasks[i].items[index]
	      		if(!item.complete && item.online){
	      			this.$router.replace({ name: 'taskIndex', params: { id: _id }})
	      		}else{
	      			this.tasks[i].items[index].complete = !item.complete
	      		}   			      		
	      	}
	    },
	    filters: {
              dateFilter : function(date){
              		let d = date.split('/')
                    return d[0] + '/' + d[1] + '/' + d[2] 
              }
        }


	}
</script>

<style lang='scss'  src='../../static/css/components/timeline.scss' scoped>
</style>