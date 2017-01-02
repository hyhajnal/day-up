<template>
	<div class="content">
		<div class="content-block-title">home</div>
		<div class="card" v-for="book in books">
			<div class="card-content">
				<div class="card-content-inner">{{ book.title }}</div>
			</div>
		</div>
	</div>
</template>

<script> 

export default{
	data () {
		return {
			books:[]
		}
	},
	mounted () {
		var self = this
        self.$http.get('http://192.168.2.2:3000/books')
        .then((response) => {
        	//success
        	self.books = response.data

        },(response) => {
        	//error
        	console.log(response)
        })
	}
}
</script>

<style></style>