function offsetLeft(element){
    var left = element.offsetLeft        // 得到第一层距离
    var parent = element.offsetParent      // 得到第一个父元素
    while(parent !== null){            // 判断如果还有上一层父元素
      left += parent.offsetLeft        // 将得到的距离累加
      parent = parent.offsetParent       // 将父元素也回溯
    }                       // 然后循环
    return left                 // 得到最终距离
}


function offsetTop(element){
    var top = element.offsetTop       
    var parent = element.offsetParent     
    while(parent !== null){            
      top += parent.offsetTop        
      parent = parent.offsetParent     
    }                      
    return top               
}


/**
 * 写字function
 * @param  {canvas} element [画图对象]
 * @param  {el}     element [vue实例对象，用于commit事件]
 */
const HandWriting = function(canvas, el) {
    if(!(this instanceof HandWriting)){
        return new HandWriting()  //避免不是通过new方式创建的
    }
    this.canvas     = canvas
    this.mousePress = false
    this.last       = null
    this.dataStr    = ''  //存放字体轨迹
    this.check      = new Array()  //计时器的号码
    this.el         = el
}

HandWriting.prototype = {
    /*constructor : HandWriting,*/
    getGc: function () {
        const gC = this.canvas.getContext("2d")//获取绘图上下文
        gC.strokeStyle = 'black'
        gC.lineWidth = 4
        return gC
    },
           
    beginDraw:function(){
        this.mousePress = true
        console.log(this)
    },

    pos:function(e){
        let x,y
        
        if(this.isTouch(e)){
            x = e.touches[0].pageX - offsetLeft(e.touches[0].target)
            y = e.touches[0].pageY - offsetTop(e.touches[0].target)
        }else{
            x = e.offsetX + e.target.offsetLeft
            y = e.offsetY + e.target.offsetTop
        }
         /*x = e.touches[0].pageX - offsetLeft(e.touches[0].target);
         y = e.touches[0].pageY - offsetTop(e.touches[0].target);*/
        this.dataStr = this.dataStr + x + ',' + y +','
        return {x:x, y:y}//返回一个点(Object)
    },
    
    drawing:function(e){
       // alert('drawing');
        e.preventDefault()
        if(!this.mousePress) return
        const xy = this.pos(e)
        const gC = this.getGc()
        if(this.last != null){
            //alert('('+ last.x + ',' + last.y +')->('+ xy.x + ',' + xy.y + ')');
            gC.beginPath();//开始绘图
            gC.moveTo(this.last.x, this.last.y);
            gC.lineTo(xy.x, xy.y);
            gC.stroke();//绘图结束
        }
        this.last = xy;
    },
    
    endDraw:function(e){
        this.mousePress = false
        e.preventDefault()
        this.last = null;
        const onecheck = setTimeout(function(){this.complete()}.bind(this), 1500)
        this.check.push(onecheck)
    },
    
    isTouch:function(e){
        const type = e.type;
        if(type.indexOf('touch') >= 0){
            return true
        }else{
            return false
        }
    },
    complete:function(){
        console.log("在判断中....................")
        if(!this.mousePress){
            this.check.forEach(function(v){
                clearTimeout(v)
            })
            console.log(this.dataStr)
            this.el.$emit('letterComplete',this.dataStr) //一个字写完后发出消息
            this.dataStr = ''
        }
    },
    
    execute:function(){
        this.canvas.onmousedown = this.beginDraw.bind(this)
        this.canvas.onmousemove = this.drawing.bind(this)
        this.canvas.onmouseup = this.endDraw.bind(this)
        this.canvas.addEventListener('touchstart', this.beginDraw.bind(this), false)
        this.canvas.addEventListener('touchmove', this.drawing.bind(this), false)
        this.canvas.addEventListener('touchend', this.endDraw.bind(this), false)
    }
    
    
}

export default HandWriting