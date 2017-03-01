<template>
  <div class="login_wrap">

    <div class="form_wrap">
      <input type="file" @change="handleChange" ref="fileinput" v-show="false">
      <div class="avator" @click="handleClick">
        <img :src="sourceImgUrl">
      </div>
      <form @submit.prevent="validateBeforeSubmit">
        <div class="form-item">
            <label class="label"><i class="iconfont icon-people"></i></label>
            <input name="name" v-model="loginform.name" v-validate:name.initial="'required|alpha'" :class="{'input': true }" type="text" placeholder="请输入用户名">
            <label class="label">
              <i class="iconfont icon-gou" v-if="!errors.has('name') && loginform.name != null"></i>
              <i class="iconfont icon-tanhao" v-if="errors.has('name')"></i>
            </label>
        </div>
        <div class="form-item">
            <label class="label"><i class="iconfont icon-mima"></i></label>
            <input name="password" v-model="loginform.password" v-validate:password.initial="'required|alpha'" :class="{'input': true}" type="password" placeholder="请输入密码">
            <label class="label">
              <i class="iconfont icon-gou" v-if="!errors.has('password') && loginform.password != null"></i>
              <i class="iconfont icon-tanhao" v-if="errors.has('password')"></i>
            </label>
        </div>
        <p class="control">
            <button class="button is-primary" type="submit">登陆</button>
        </p>
      </form>

    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Login',
  data() {
    return {
      loginform:{
        name:null,
        password:null
      },
      control: {
          header: false,
          bottom: false,
          title: '登陆',
          content: {
            icon1: 'back',
            icon2: 'more',
            url: '/'
          }
      },
      sourceImgUrl: null
    }
  },
  mounted () {
    this.$store.commit('setNavbar', this.control)
  },
  methods: {
    validateBeforeSubmit() {
        // Validate All returns a promise and provides the validation result.
        this.$validator.validateAll().then(success => {
            if (! success) {
                Toast('提示信息')
                //return
            }
            this.$router.replace({ path:'/'} )
        })
    },
    /*postLogin() {
        const formData = JSON.stringify(this.loginform)
        this.$http.post('/path/to', formData).then((response) => {
            const 
        }, (response) => {
            // error callback
        })
    },*/
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
input{
  font-size:.55rem;
  height:2rem;
  border-bottom:1px solid #222;
  color:#222;
  width:100%;
  background:none;
}
input[type="text"]:focus{
}
.login_wrap{
  width:100%;
  height:100%;
  background-image:url('/images/login.jpg');
  background-size:cover;
  .avator{
    width:6rem;
    height:6rem;
    margin:0 auto;
    border-radius:100%;
    background-image:url('/images/2.jpg');
    background-size:cover;
    img{
      width:100%;
      height:100%;
      border-radius:100%;
    }
  }
  .form_wrap{
    width:80%;
    height:50%;
    background:none;
    position:absolute;
    left:0;top:0;bottom:0;right:0;
    margin:auto;
    padding:2rem 4rem;
    color:#000;
    .form-item{
      padding:.5rem;
      display:flex;
      justify-content:space-between;
      align-items:flex-end;
      label{
        text-align:left;
        color:#222;
        border-bottom:1px solid #222;
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
      }
    }
    button{
      padding:1rem 0;
      width:100%;
      border-radius:100px;
      background:#ffc107;
      color:#fff;
    }
  }
}

.vicp-wrap{
  width:100%;
}
</style>