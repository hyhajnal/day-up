export default {
	bind () {
		this.documentHandler = (e) => {
			
			if(this.el.contains(e.target)){
				return false   //node.contains( otherNode ) 判断是否包含另一个node
			}
			if(this.expression){  //expression: 绑定值的字符串形式
				//执行expression这个方法
				this.vm[this.expression]()
			}
		}
		document.addEventListener('click', this.documentHandler)
	},
	update () {

	},
	unbind () {
		document.removeEventListener('click', this.documentHandler)
	}
}