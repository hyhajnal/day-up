var querystring = require('querystring');
var url = require('url');
var http = require('http');
var https = require('https');
var util = require('util');
var StuCtrl = require('../controller/student')

var stuFun = function(app) {

    app.post('/server/student/login',StuCtrl.login)

    app.post('/server/student/register',StuCtrl.register)

	app.get('/server/student/tasks',StuCtrl.getTasksByDate)

	app.post('/server/student/getLetter', function(reQ,reS,next){

        
        //console.log(url.parse('https://api.hanvon.com/rt/ws/v1/hand/single?key=17206102-495d-4ddc-b23a-4cfa28b55d9e&code=83b798e7-cd10-4ce3-bd56-7b9e66ace93d'))

        //POST URL
        var urlstr = 'https://api.hanvon.com/rt/ws/v1/hand/single?key=add26bdb-eafb-4dd9-9c25-2fae836c4ba3&code=83b798e7-cd10-4ce3-bd56-7b9e66ace93d';
        console.log(reQ.body.dataStr)
        //POST 内容
        var bodyQueryStr = {
            uid: "219.82.202.26",
            type: "1",
            data: reQ.body.dataStr
        };

        var contentStr = querystring.stringify(bodyQueryStr);
        var contentLen = Buffer.byteLength(contentStr, 'utf8');
        //console.log(util.format('post data: %s, with length: %d', contentStr, contentLen));
        var httpModule = urlstr.indexOf('https') === 0 ? https : http;
        var urlData = url.parse(urlstr);

        //HTTP请求选项
        var opt = {
            hostname: urlData.hostname,
            path: urlData.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Length': contentLen
            }
        };

        //处理事件回调
        var req = httpModule.request(opt, function(httpRes) {
            var buffers = [];
            httpRes.on('data', function(chunk) {
                buffers.push(chunk);
            });

            httpRes.on('end', function(chunk) {
                var wholeData = Buffer.concat(buffers);
                var dataStr = wholeData.toString('utf8');
                console.log('content ' + wholeData);
                var r = JSON.parse(base64decode(dataStr))
                console.log(r)
                if(r.code == '0'){
                    var letter = tohanzi(r.result)
                    console.log(letter)
                    reS.json(letter)
                }
            });
        }).on('error', function(err) {
            console.log('error ' + err);
        });;

        //写入数据，完成发送
        req.write(contentStr);
        req.end();
	})

}

var base64DecodeChars = new Array(
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
         52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
         -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
         15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
         -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
         41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1)

function base64decode(str){  
    var c1, c2, c3, c4  
    var i, len, out  
    len = str.length  
    i = 0  
    out = ""  
    while (i < len) {  
        /* c1 */  
        do {  
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]  
        }  
        while (i < len && c1 == -1)  
        if (c1 == -1)   
            break  
        /* c2 */  
        do {  
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]  
        }  
        while (i < len && c2 == -1)  
        if (c2 == -1)   
            break  
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))  
        /* c3 */  
        do {  
            c3 = str.charCodeAt(i++) & 0xff  
            if (c3 == 61)   
                return out  
            c3 = base64DecodeChars[c3]  
        }  
        while (i < len && c3 == -1)  
        if (c3 == -1)   
            break  
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2))  
        /* c4 */  
        do {  
            c4 = str.charCodeAt(i++) & 0xff  
            if (c4 == 61)   
                return out  
            c4 = base64DecodeChars[c4]  
        }  
        while (i < len && c4 == -1)  
        if (c4 == -1)   
            break  
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)  
    }  
    return out  
}

function tohanzi(data){
    if(data == '') return '请输入十六进制unicode'
    data = data.split(",");
    var str ='';
    str = String.fromCharCode(data[0])
    //console.log(str);
    return str
}

module.exports = stuFun

/*var s_date = new Date(2016,9,1);
var e_date = new Date(2016,12,1);*/