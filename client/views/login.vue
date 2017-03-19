<template>
  <div class="login_wrap">

    <div class="form_wrap">
      <input type="file" accept="audio/*" capture="microphone" @change="handleChange" ref="fileinput" v-show="false">
      <!-- 绑定touchend ios触发click -->
      <div class="avator" @click="handleClick" @touchend="handleClick">
        <img :src="sourceImgUrl">
      </div>
      <form @submit.prevent="validateBeforeSubmit">
        <div class="form-item">
            <label class="label"><i class="iconfont icon-people"></i></label>
            <input name="username" v-model="loginform.username" v-validate:name.initial="'required'" :class="{'input': true }" type="text" placeholder="请输入用户名">
            <label class="label">
              <i class="iconfont icon-gou" v-if="!errors.has('username') && loginform.username != null"></i>
              <i class="iconfont icon-tanhao" v-if="errors.has('username')"></i>
            </label>
        </div>
        <div class="form-item">
            <label class="label"><i class="iconfont icon-mima"></i></label>
            <input name="password" v-model="loginform.password" v-validate:password.initial="'required'" :class="{'input': true}" type="password" placeholder="请输入密码">
            <label class="label">
              <i class="iconfont icon-gou" v-if="!errors.has('password') && loginform.password != null"></i>
              <i class="iconfont icon-tanhao" v-if="errors.has('password')"></i>
            </label>
        </div>
        <p class="control">
            <button class="button is-primary" type="submit">登录</button>
        </p>
      </form>

    </div>
  </div>
</template>

<script>
import { Toast,MessageBox  } from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      loginform:{
        username:null,
        password:null
      },
      sourceImgUrl: null
    }
  },
  mounted () {
    this.$store.commit('setBottom', false)
  },
  methods: {
    validateBeforeSubmit() {
        // Validate All returns a promise and provides the validation result.
        this.$validator.validateAll().then(success => {
            if (! success) {
                Toast('提示信息')
                //return
            }
            this.postLogin()
            // this.$router.replace({ path:'/'} )
        })
    },
    postLogin() {
        const formData = JSON.stringify(this.loginform)
        this.$http.post('/server/student/login', formData).then((response) => {
            let data = response.data
            if(data.success){
              if(data.data){
                sessionStorage.setItem('usr', JSON.stringify(data.data))
                this.$store.commit('setUsr', data.data)
                this.$router.replace({ path:'/'} )
              }else{
                MessageBox.alert(data.msg, '提示')
              }
            }else{
              MessageBox.alert('连接失败', '提示')
            }
        }, (response) => {
            MessageBox.alert('网络连接错误!', '提示')
        })
    },
    handleClick(e) {
      if (e.target !== this.$refs.fileinput) {
        e.preventDefault()
        this.$refs.fileinput.click()
      }
    },
    handleChange(e) {
        e.preventDefault()
        let files = e.target.files || e.dataTransfer.files
        this.$set(this.loginform, 'avator', this.$refs.fileinput.value)

        this.setSourceImg(files[0])
    },
    // 设置图片源
    setSourceImg(file) {
        let _this = this,
        fr = new FileReader()
        fr.onload = function(e) {
            _this.sourceImgUrl = fr.result
        }
        fr.readAsDataURL(file)
    }
  }
  
}
</script>

<style lang="scss" scoped>
$text:#eee;

.login_wrap{
  position:fixed;
  left:0;top:0;right:0;bottom:0;
  width:100%;
  height:100%;
  background: url('/images/10.jpg');
  background-size:cover;
  color:#fff;
   &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom right,#002f4b,#000);
    opacity: .6; 
  }
  .avator{
    width:6rem;
    height:6rem;
    margin:0 auto;
    margin-bottom: 1rem;
    border-radius:100%;
    background-image:url('/images/6.jpg');
    background-size:cover;
    img{
      width:100%;
      height:100%;
      border-radius:100%;
      border:1px solid #fff;
    }
  }
  .form_wrap{
    width:100%;
    height:70%;
    background:none;
    position:absolute;
    left:0;top:0;bottom:0;right:0;
    margin:auto;
    padding:2rem 4rem;
    color:#000;
    .form-item{
      padding:.5rem .5rem 0 .5rem;
      display:flex;
      justify-content:space-between;
      align-items:flex-end;
      @include border(bottom,$text)
      label{
        text-align:left;
        color:$text;
        display:table;
        i{
          display:table-cell;
          vertical-align:middle;
        }
        .icon-gou{
          color:#46e44c;
        }
        .icon-tanhao{
          color:#f44336;
        }
      }
      input{
        text-indent:4px;
        background: none;
        color:$text;
      }
      @include placeholder($text)
    }
    button{
      margin-top: 1.5rem;
      padding:.8rem 0;
      width:100%;
      border-radius:100px;
      border:1px solid $text;
      background:none;
      color:#fff;
    }
  }
}

.vicp-wrap{
  width:100%;
}
</style>