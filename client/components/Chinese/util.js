const base64DecodeChars = new Array(
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
         52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
         -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
         15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
         -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
         41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1)
export function base64decode(str){  
    let c1, c2, c3, c4  
    let i, len, out  
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

export function tohanzi(data){
    if(data == '') return '请输入十六进制unicode'
    data = data.split(",");
    var str ='';
    str = String.fromCharCode(data[0])
    //console.log(str);
    return str
}


/**
 * 绘制田字格
 * @param  {dom} canvas [canvas元素dom]
 * 
 */
export function drawBackground(canvas, big){
    
    //console.log('drawcanvas')
    let board,cvWidth,cvHeight
    
    canvas.height = canvas.width
    //console.log(canvas.style.height)
    //console.log(canvas.width)
    cvWidth = canvas.width
    cvHeight = canvas.width
    
    board = canvas.getContext("2d")//获取绘图上下文
    
    
    board.strokeStyle = '#f2b93f'
    board.lineWidth = big ? 6 : 2
    board.beginPath()//开始绘图
    board.rect(1, 1,cvWidth - 2,cvHeight - 2)
    board.stroke()

    board.lineWidth = 1
    //board.setLineDash([5,5])//虚线

    //画"\"线
    board.moveTo(0, 0)
    board.lineTo(cvWidth, cvHeight)

    //画"/"线
    board.moveTo(0, cvHeight)
    board.lineTo(cvWidth, 0)

    //画"-"线
    board.moveTo(0, cvHeight / 2)
    board.lineTo(cvWidth, cvHeight / 2)

    //画"|"线
    board.moveTo(cvWidth / 2, 0)
    board.lineTo(cvWidth / 2, cvHeight)

    board.stroke()//绘图结束

    //画笔重置
    board.strokeStyle = 'black'
    board.lineWidth = 4
}


/**
 * 使js睡眠 n 秒
 * @param  {number} numberMillis [秒数]
 */
export function sleep(numberMillis) { 
    var now = new Date()
    var exitTime = now.getTime() + numberMillis
    while (true) { 
    now = new Date()
    if (now.getTime() > exitTime) 
        return
    } 
}