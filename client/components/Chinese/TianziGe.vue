<template>
	<grid class="wr_wrap" :column="true" align='between' wrap="nowrap">
        <item class="toolbar" :cols="1">
            <grid :avg="3" :wrap="wrap" align="around">
                <item><i class="iconfont icon-replay" @click="speak()"></i></item>
                <item><i class="iconfont icon-xiangpi" @click="drawCanvas(1,0)"></i></item>
                <item><i class="iconfont icon-next" @click="changeWord()"></i></item>
            <grid>
        </item> 
        <item class="s_tian" :cols="1">
            <grid align='around' wrap="nowrap">
                <div class="word_box" v-for="n in correctWord.length" @click="changeLetter(n - 1)">
                    <canvas :id="'canvas'+n"
                    :class="{'active':n == currentLetterIdx + 1 }"></canvas>
                    <span class="word" v-cloak v-text="customArray[n-1]"></span>
                </div>
            </grid>
        </item> 
        <item class="b_tian" :cols="4">
            <canvas ref="wCanvas"></canvas>
        </item> 
    </grid>
</template>

<script>
import { MessageBox } from 'mint-ui'
import Grid from '../Flex/Grid'
import Item from '../Flex/Col'
import { base64decode, drawBackground, tohanzi } from './util'
import HandWriting from './writing'
//import BDSSpeechSynthesizer from 'baidu-speech-synthesizer'
export default {
	name: 'TianziGe',
	props: ['wordarray'],
    data() {
        return {
            Writing: null,
            /*wordarray: ['兴奋','急忙忙','喜悦','和风细雨'],*/      //所有词语
            currentLetterIdx: 0,  //当前字
            currentWordIdx: 0,    //当前词语
            customArray: [],    //学生写的词语
            customWord: null,     //学生写的当前字,数组
            customLetter: '',     //学生写的当前字
            score: 0 ,             //本次听写分数
            bigSize:0,
            smlSize:0
        }
    },
	mounted () {
        this.$nextTick(function () {
            this.bigSize = this.$refs.wCanvas.width
            this.smlSize = (this.bigSize - 4*15) / 4
            this.drawCanvas(1,1)
            this.writing()
            //this.speak()
            this.$on('letterComplete',function(dataStr){
                this.postLetter(dataStr)
            })
        })
	},
    computed: {
        correctWord () {
            return this.wordarray ? this.wordarray[this.currentWordIdx] : ''  //当前正确的词语
        }
    },
	methods: {
		drawCanvas(big, sml) {
             this.$nextTick(function () {
                if(big){
                    drawBackground(this.$refs.wCanvas,true)
                }
                if(sml){
                    for(let i=1; i <= this.correctWord.length; i++){
                        let canvas = document.querySelector('#canvas'+i)
                        canvas.width = this.smlSize
                        drawBackground(canvas)
                    }
                }
            })
        },
        writing () {
            const Writing = new HandWriting(this.$refs.wCanvas, this)
            Writing.execute()
        },
        /*speak() {
            let bss = new BDSSpeechSynthesizer()
            let speaker = bss.speak(this.wordarray[this.currentWordIdx])
            //speaker.on('ended', () => bss.speak('bye world'))
        },*/
        changeWord(){
            if(this.currentWordIdx < this.wordarray.length - 1 ){
                if(this.customArray.join('') == this.correctWord){
                    this.score ++
                }
                this.currentWordIdx ++
                this.currentLetterIdx = 0
                this.drawCanvas(1, 1)
                //this.speak()
                this.customArray = []
            }else{
                const score = this.score / this.wordarray.length * 100
                MessageBox.alert('分数'+score, '听写结束')
                this.$emit('complete',score)
            }
        },
        //解析汉字
        postLetter(Str) {
            let _this = this
            const postStr = { dataStr: Str + '-1,0'}
            this.$http.post('http://192.168.2.7:3000/server/student/getLetter',postStr)
            .then((response) => {
                const data = response.data
                console.log(data)
                _this.$set(_this.customArray,_this.currentLetterIdx,data)
                _this.drawCanvas(1,0)
                _this.currentLetterIdx < _this.correctWord.length - 1 ?
                _this.currentLetterIdx ++ : _this.correctWord.length
            }, (response) => {
                MessageBox.alert('网络连接错误!', '提示')
            })
        },
        changeLetter(index){
            this.currentLetterIdx = index
        }
	},
    components: {
        Grid,
        Item,
        MessageBox
    }
}
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.word_box{
    width:100%;
    height:100%;
    position:relative;
    .word,canvas{
        position:absolute;
        left:50%;top:50%;
        transform:translate(-50%, -50%);
        font-size:2rem;
    }
    .active{
        border:2px solid #ffc107;
    }
}
.wr_wrap{
    height:100%;
}
.b_tian{
    canvas{
        width:100%;
    }
}
.s_tian, .b_tian,.toolbar{
    width:100%;
    padding: 1rem 2rem;
    .grid{
        width:100%;
        height:100%;
    }
}
.toolbar{
    padding-top:2rem;
    text-align:center;
    i{
        font-size:2rem;
    }
}
</style>