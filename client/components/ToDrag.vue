<template>
  <div ref="pNode" class="drag_wrap">
    <slot></slot>
  </div>
</template>

<script>
import Bus from './Bus'
export default {
  name: 'DragItem',
  props: ['items','gutter','i'],
  data () {
    return {
      upDom: null, //看不见元素的Dom
      downDom: null,
      index: 0, //看不见元素的Index
      y: 0,
      ticking: false
    }
  },
  computed:{
    selectIdx: function(){
      return this.i
    }
  },
  mounted(){
    Bus.$on('select',i => {
      this.selectDrag(i)
      Bus.$emit('lock')
    })
  },
  methods: {
    selectDrag(i) {
      this.index = i
      this.downDom = this.$refs.pNode.firstChild.childNodes[i]

      //复制一个可移动的dom
      this.handleDragStart()
      //为这个dom监听touch事件
      this.upDom.addEventListener('touchstart', this.handleDragMove, false)
      this.upDom.addEventListener('touchmove', this.handleDragMove, false)
      this.upDom.addEventListener('touchend', this.handleDragEnd, false)  
    },

    judgeIndex() {
      //判断应该插入哪一个位置
      const regExp = /\.*translateY\((.*)px\)/i
      const upDomH  = parseInt(regExp.exec(this.upDom.style.transform)[1]) + this.upDom.offsetTop
      let i = Math.round(upDomH / (this.downDom.clientHeight + this.gutter * 2))
      if(i < 0) {
        i = 0
      }
      if(i > (this.items.length - 1)) {
        i = this.items.length - 1
      }
      if( i != this.index) {
        this.changePos(i, this.index)
        this.index = i
      }
    },
    handleDragStart() {
      //克隆一个元素，并且将原有元素变成透明
      this.upDom = this.downDom.cloneNode(true)
      this.$refs.pNode.appendChild(this.upDom)

      this.downDom.style.visibility = 'hidden'

      this.upDom.style.position = 'absolute'
      this.upDom.style.background = 'none'
      this.upDom.style.top = (this.downDom.offsetTop - this.gutter) + 'px'
      this.upDom.style.left = '0'
      this.upDom.style.right = '0'
      this.upDom.style.zIndex = 2000
      this.upDom.style.border = '1px solid #fff'
      this.upDom.style.color = '#fff'
    },
    handleDragMove(e) {
      if(!this.ticking){
        requestAnimationFrame(function(){
            this.ticking = false
            const event = e || window.e
            e.stopPropagation()
            event.preventDefault()
            const obj = event.touches[0]

            this.y = this.getOffsetTop(this.upDom) + this.downDom.clientHeight / 2
            this.upDom.style.transform = 'translateY('+ (obj.pageY - this.y) +'px) translateZ(0)'
            this.upDom.style.webkitTransform 
            = 'translateY('+ (obj.pageY - this.y) +'px) translateZ(0)'
            this.judgeIndex()
        }.bind(this))
      }
      this.ticking = true
    },
    handleDragEnd(e) {
      this.downDom.style.visibility = 'visible'
      this.$refs.pNode.removeChild(this.upDom)
      this.upDom.removeEventListener('touchstart', this.handleDragMove, false)
      this.upDom.removeEventListener('touchmove', this.handleDragMove, false)
      this.upDom.removeEventListener('touchend', this.handleDragEnd, false)
      Bus.$emit('lock')
    },
    //交换位置
    changePos(a, b) {
      const va = this.items[a]
      const vb = this.items[b]
      this.items.splice(a, 1, vb)
      this.items.splice(b, 1, va)
    },
    getOffsetTop(element) {
      var top = element.offsetTop       
      var parent = element.offsetParent    
      while(parent != null && parent != undefined){            
        top += parent.offsetTop        
        parent = parent.offsetParent     
      }                   
      return top  
    }
  }
}
</script>