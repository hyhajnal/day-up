<template>
    <div>
        <div :class="classes" :style="styles">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    const prefixCls = 'affix'

    //获取滚动距离
    function getScroll(elm, top) {
        let ret
        if(top){
            ret = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop
        }else{
            ret = isNaN(elm.scrollLeft) ? elm.pageXOffset : elm.scrollLeft
        }
        return ret
    }

    //相对scroll元素的偏移量
    function getOffset(element, target) {
        const rect = element.getBoundingClientRect()  //获取元素相对视窗的左上top,left,bottom,right
        const scrollTop = getScroll(target, true)
        const scrollLeft = getScroll(target)
        const clientTop = target.clientTop || 0
        const clientLeft = target.clientLeft || 0
        return {
            top: rect.top + scrollTop - clientTop,  //元素距窗口高度+scroll元素上滚的高度-父元素的边框
            left: rect.left + scrollLeft - clientLeft
        }
    }

    //获取scroll祖先元素
    function getScrollParent(elm) {
        if (elm.tagName === 'BODY') {
          return window;
        } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
          return elm;
        }
        return getScrollParent(elm.parentNode)
    }

    export default {
        props: {
            offsetTop: {
                type: Number,
                default: 0
            },
            offsetBottom: {
                type: Number
            }
        },
        data () {
            return {
                affix: false,
                styles: {}
            };
        },
        computed: {
            offsetType () {
                let type = 'top'
                if (this.offsetBottom >= 0) {
                    type = 'bottom'
                }
                return type
            },
            classes () {
                return [
                    {
                        [`${prefixCls}`]: this.affix
                    }
                ]
            }
        },
        mounted () {
            this.scrollParent = getScrollParent(this.$el)
            this.scrollParent.addEventListener('scroll', this.handleScroll, false);
            this.scrollParent.addEventListener('resize', this.handleScroll, false);
        },
        beforeDestroy () {
            this.scrollParent.removeEventListener('scroll', this.handleScroll, false);
            this.scrollParent.removeEventListener('resize', this.handleScroll, false);
        },
        methods: {
            handleScroll () {
                
                const affix = this.affix
                const scrollTop = getScroll(this.scrollParent, true)
                const elOffset = getOffset(this.$el, this.scrollParent)
                const windowHeight = window.innerHeight
                const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight
                
                // Fixed Top ,this.offsetTop需要被定位的高度
                if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType == 'top' && !affix) {
                    //还未滚动到需要的距离
                    this.affix = true;
                    this.styles = {
                        top: `${this.offsetTop}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    }
                    this.$emit('on-change', true);
                } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType == 'top' && affix) {
                    this.affix = false
                    this.styles = null
                    this.$emit('on-change', false)
                }
                // Fixed Bottom
                if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
                    this.affix = true
                    this.styles = {
                        bottom: `${this.offsetBottom}px`,
                        left: `${elOffset.left}px`,
                        width: `${this.$el.offsetWidth}px`
                    };
                    this.$emit('on-change', true);
                } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix) {
                    this.affix = false
                    this.styles = null
                    this.$emit('on-change', false)
                }
            }
        }
    };
</script>

<style>
    .affix{
        position:fixed;
        z-index: 1000;
        -webkit-backface-visibility: hidden;
        -webkit-transform: translateZ(0);
    }
</style>