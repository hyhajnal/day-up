/*let img = new Image()

//类型校验
function validateImg(file){
	const reg = /^(gif|jpg|jpeg|png|GIF|JPG|PNG)$/
	const size = 5 * 1024 //5kb
	if(!reg.test(file.type)){
		return '你传的文件格式不符合要求'
	}
	if(file.size > size){
		return '你传的图片太大了'
	}
}

//显示信息
function showDetail(file){
	let fileSize = 0
	if(file.size > 1024 * 1024){
		fileSize = Math.round(file.size * 100 / (1024 * 1024) / 100).toString() + 'MB'
	}else{
		fileSize = Math.round(file.size * 100 / 1024 / 100).toString() + 'KB'
	}

	return {
		name: file.name,
		size: file.size,
		type: file.type
	}
}

//flieReader预览
function preview(e){
	const file = e.target.files[0]
	const reader = new FileReader()
	reader.onload = function(){
		const dataURL = reader.result
		/*img.src = dataURL*/ 
		//插入DOM中
		//
		//第二种方式
		/*
		showAsCanvas(dataURL)
	}
	reader.readAsDataURL(file) //转换成base64编码的字符串
}

function showAsCanvas(url,pos){
	let img = new Image()
	img.src = url

	let gC = canvas.getContext("2d")
	const w = canvas.width
	const h = canvas.height
	gC.drawImage(img, 0, 0, w, h)
	canvas.toDataURL("image/jpeg", 0.7) //图片压缩
}

//剪裁,缩放，拖动
function clipping(){

}

//进度条显示，限速
//lengthComputable可计算的已上传字节
function progress(e){
	if(e.lengthComputable){
		let percent = Math.round(e.loaded * 100 / e.total)
	}

	//页面显示percent	
}

//post到后台
function postImg(){

}


//断点续传
function limit(e){
	const file = e.target.files[0]
	const reader = new FileReader()
	const step = 1024 * 1024
	const total = file.size
	let curLoad = 0

	const sTime = new Date()
}
*/