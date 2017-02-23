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
                <canvas :id="'canvas'+n" v-for="n in correctWord.length"
                 @click="changeLetter()">
                <span calss="word" ref="word">测</span>
                </canvas>
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
import BDSSpeechSynthesizer from 'baidu-speech-synthesizer'
export default {
	name: 'TianziGe',
	props: ['wordarray'],
    data() {
        return {
            Writing: null,
            /*wordarray: ['兴奋','急忙忙','喜悦','和风细雨'],*/      //所有词语
            currentLetterIdx: 0,  //当前字
            currentWordIdx: 0,    //当前词语
            customArray: null,    //学生写的词语
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
        //console.log(this.$refs.word)
        //this.$refs.word.style.width = this.$refs.word.style.width = this.smlSize
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
        speak() {
            let bss = new BDSSpeechSynthesizer()
            let speaker = bss.speak(this.wordarray[this.currentWordIdx])
            //speaker.on('ended', () => bss.speak('bye world'))
        },
        changeWord(){
            if(this.currentWordIdx < this.wordarray.length - 1 ){
                this.currentWordIdx ++
                this.currentLetterIdx = 0
                this.drawCanvas(1, 1)
                this.speak()
            }
        },
        //解析汉字
        postLetter(dataStr) {
            const data = dataStr + '-1,0'
            this.$http.post('http://192.168.2.7:3000/server/student/getLetter', 
                { dataStr: data })
            .then((response) => {
                const data = response.data
                console.log(data)

            }, (response) => {
                MessageBox.alert('网络连接错误!', '提示')
            })
        }
	},
    components: {
        Grid,
        Item,
        MessageBox
    }
}
</script>
<style lang="scss">

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
.s_tian canvas{
    position:relative;
    .word{
        position: absolute;
        left: 0;
        right: 0;
    }
}
</style>