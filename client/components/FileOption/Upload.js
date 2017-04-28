
let _vm
//类型校验
function validateImg(file){

	const reg = /^(gif|jpg|jpeg|png|GIF|JPG|PNG|image\/jpeg)$/
	const size = 2 * 1024 * 1024 //2M
	if(!reg.test(file.type)){
        _vm.$emit('info','你传的文件格式不符合要求')
		return false
	}
	if(file.size > size){
        _vm.$emit('info','你传的图片太大了')
		return false
	}
    return true
}

//显示信息
function showDetail(file){

	let fileSize = 0
	if(file.size > 1024 * 1024){
		fileSize = Math.round(file.size * 100 / (1024 * 1024) / 100).toString() + 'MB'
	}else{
		fileSize = Math.round(file.size * 100 / 1024 / 100).toString() + 'KB'
	}
    _vm.$emit('info',file.name + file.size + file.type)
}

//flieReader预览
export const selectImg = function(vm,e){
    _vm = vm

	const file = e.target.files[0]
    if(!validateImg(file)) return 

    //showDetail(file)

	vm.imgWidth = 200
	vm.imgHeight = Math.round(200 / file.width * file.height)
	let reader = new window.FileReader()
	reader.readAsDataURL(file) //转换成base64编码的字符串
	reader.onload = function(ev){
		vm.popupVisible = true
		vm.imgUrl = ev.target.result 
		vm.$emit('imgReady')
	}


}



//进度条显示，限速
//lengthComputable可计算的已上传字节
function progress(e){
	if(e.lengthComputable){
		let percent = Math.round(e.loaded * 100 / e.total)
        _vm.progerss = percent
	}

	//页面显示percent	
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


export const showAsCanvas = function (canvas,info, init){
	
	const size = document.body.clientWidth * 0.9
	canvas.width = size
	canvas.height = size
	let gC = canvas.getContext("2d")

	gC.beginPath()
	gC.arc(size/2,size/2,size/2,0,2*Math.PI)
	gC.strokeStyle = "rgba(250,250,250,0)"
	gC.stroke()
	gC.clip()
    gC.closePath()

    let img = new Image()
	img.src = info.url
	const rate = img.width / info.w

	img.onload = () => {

		gC.drawImage(img, info.x*rate, info.y*rate, 200*rate, 200*rate, 0, 0, size, size)
        if(!init){
            const img_compress = canvas.toDataURL("image/jpeg", 0.5) //图片压缩
            uploadFile(img_compress)
        }
	}
}




//上传两种方式
//将图片转化为base64：可以通过xhr ajax或者xhr2 FormData进行提交
//将图片数据转为Blob对象，使用FormData上传文件：Blob对象无法注入到FormData对象当中


//Android机上没有Blob对象的可以用BlobBuild来代替
function newBlob(data, datatype){
    var out;
    try {
        out = new Blob([data], {type: datatype});
    }
    catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
 
        if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(data.buffer);
            out = bb.getBlob(datatype);
        }
        else if (e.name == "InvalidStateError") {
            out = new Blob([data], {type: datatype});
        }
        else {
        }
    }
    return out;
}
 
// 判断是否需要blobbuilder
var needsFormDataShim = (function () {
        var bCheck = ~navigator.userAgent.indexOf('Android')
                        && ~navigator.vendor.indexOf('Google')
                        && !~navigator.userAgent.indexOf('Chrome');
 
        return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
    })(),
    blobConstruct = !!(function () {
        try { return new Blob(); } catch (e) {}
    })(),
    XBlob = blobConstruct ? window.Blob : function (parts, opts) {
        var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        parts.forEach(function (p) {
            bb.append(p);
        });
 
        return bb.getBlob(opts ? opts.type : undefined);
};
 
function FormDataShim () {
    // Store a reference to this
    var o = this,
        parts = [],// Data to be sent
        boundary = Array(5).join('-') + (+new Date() * (1e16*Math.random())).toString(32),
        oldSend = XMLHttpRequest.prototype.send;
 
    this.append = function (name, value, filename) {
        parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
 
        if (value instanceof Blob) {
            parts.push('; filename="'+ (filename || 'blob') +'"\r\nContent-Type: ' + value.type + '\r\n\r\n');
            parts.push(value);
        } else {
            parts.push('\r\n\r\n' + value);
        }
        parts.push('\r\n');
    };
 
    // Override XHR send()
    XMLHttpRequest.prototype.send = function (val) {
        var fr,
            data,
            oXHR = this;
 
        if (val === o) {
            //注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
            parts.push('--' + boundary + '--\r\n');
            data = new XBlob(parts);
            fr = new FileReader();
            fr.onload = function () { oldSend.call(oXHR, fr.result); };
            fr.onerror = function (err) { throw err; };
            fr.readAsArrayBuffer(data);
 
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
            XMLHttpRequest.prototype.send = oldSend;
        }
        else {
            oldSend.call(this, val);
        }
    };
}
 
//把图片转成formdata 可以使用的数据...
//这里要把\s替换掉..要不然atob的时候会出错....
function dataURLtoBlob(data) {
    var tmp = data.split(',');
    
    tmp[1] = tmp[1].replace(/\s/g,'');
    var binary = atob(tmp[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new newBlob(new Uint8Array(array), 'image/jpeg');
}
 
function uploadFile(img){
    var fd = needsFormDataShim ? new FormDataShim() : new FormData();
    var file = dataURLtoBlob(img);
    fd.append('img',file);
    fd.append('oldPath',_vm.$store.state.usr.avator)
 
    var prog = function(e){
        progress(e)
    }

    var load = function(e){
        /*你的逻辑*/
    }
    var error = function(e){
        /*你的逻辑*/
    }
    var abort = function(e){
        /*你的逻辑*/
    }    
 
    var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress',prog,false);
        xhr.addEventListener('load',load,false);
        xhr.addEventListener('error',error,false);
        xhr.addEventListener('abort',abort,false);   
 
    xhr.onreadystatechange = function(){
        /*你的逻辑*/
        if(xhr.readyState == 4){
            const status = xhr.status
            //debugger
            if(status > 199 && status < 300 || status == 304){
                _vm.options.success(xhr.responseText)
            }else{
                _vm.options.err()
            }
        }
    }
    xhr.open('POST','/server/student/postImg',true);
    xhr.send(fd);   
}