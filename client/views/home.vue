<template>
	<div class="page_content">
		<header>
			<div class="container">
				<h1 class="logo">
					<span class="icon icon-clock" @click="open('picker4')"></span>
				</h1>
				<section class="social">
					{{ date | dateFilter }}
				</section>
			</div>
		</header>
		<mt-datetime-picker
	      ref="picker4"
	      type="date"
	      v-model="value4"
	      year-format="{value} 年"
	      month-format="{value} 月"
	      date-format="{value} 日"
	      @confirm="handleChange">
	    </mt-datetime-picker>


		<div class="container">
			<mt-spinner color="#26a2ff" type="triple-bounce" v-if='loading'></mt-spinner>
			<div id="timeline" v-if='!loading'>
				<!-- .............................................. -->
				<div class='subj-item' v-for="(task,i) in tasks">
					<div class='subj-title' @click='changeDown(i)'>
						<div class="subj-icon">
							<span :class="{ 'icon icon-down': task.isDown, 'icon icon-up':!task.isDown }"></span>
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
									<p class="content-text">
										{{child.content}}
									</p>
									<p class="content-icon">
										<span :class="{'icon icon-computer':!child.complete && child.online,
										'icon icon-edit':!child.complete && !child.online,
										'icon icon-check':child.complete}"></span>
									</p>
								</div>
							<!-- </router-link> -->
							</div>
					</transition>
					<!-- .............................................. -->
				</div>
				<!-- .............................................. -->
			</div>
			<p><span class="icon icon-clock"></span></p>
		</div>
	</div>
</template>

<script>
	import SideBar from '../components/SideBar'
	import { MessageBox } from 'mint-ui'
	const CN = ['一','二','三','四','五','六','日', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	const EN = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

	export default {
		mounted() {
			this.date = new Date().getFullYear()+'/'
						+ ( new Date().getMonth() + 1 ) + '/'
						+ new Date().getDate()
			this.getTasks()
		},
	    data() {
	        return {
	        	url: this.$store.state.serverHost,
		        value4: null,
		        visible4: false,
		        tasks: null,
		        date: '',
		        loading: true
	        }
	    },
	    components: {SideBar},
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
		        self.$http.get('http://localhost:3000/server/student/tasks?date='+this.date)
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
                    return d[0] + '年' + d[1] + '月' + d[2] + '日'
              }
        }


	}
</script>

<style lang='scss' src='../../static/css/timeline.scss'>
</style>