<template>
  <div class="common-layout">
    <el-container>
      <el-main class="main">
        <el-row class="main__row">
          <Slogan />
          <el-col :span="12" class="right">
            <router-link class="signBtn" :to="{ name: 'Login' }"
              >LOG IN</router-link
            >
            <div class="wrapper">
              <p class="wrapper__tittle">Sign up for</p>
              <div class="wrapper__info">
                <img
                  class="wrapper__info__logo"
                  src="../../assets/img/logo.png"
                />
                <div class="wrapper__info__desc">
                  <span class="wrapper__info__name">Geekhub</span>
                  <span class="wrapper__info__site">geekhub.ink</span>
                </div>
              </div>
              <el-form class="wrapper__form">
                <el-form-item>
                  <p class="wrapper__form__desc">Email</p>
                  <el-col :span="24">
                    <input class="wrapper__form__item" v-model="email" />
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24"
                    ><p class="wrapper__form__desc">Verify code</p></el-col
                  >
                  <el-col :span="12">
                    <input class="wrapper__form__item" v-model="verifyCode" />
                  </el-col>
                  <el-col :span="12">
                    <el-button
                      @click="handleSendCodeClick"
                      :disabled="sendCodeInfo.disabled"
                      class="wrapper__form__getCodeBtn"
                      type="primary"
                      >{{ sendCodeInfo.text }}</el-button
                    >
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <p class="wrapper__form__desc">Username</p>
                  <el-col :span="24">
                    <input class="wrapper__form__item" v-model="username" />
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <p class="wrapper__form__desc">Password</p>
                  <el-col :span="24">
                    <input
                      class="wrapper__form__item"
                      v-model="password"
                      type="password"
                      show-password
                    />
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24">
                    <el-button
                      class="wrapper__form__item loginbtn"
                      color="#66bb6a"
                      @click="handleSignupClick"
                      >CREATE ACCOUNT</el-button
                    >
                  </el-col>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Slogan from '../../components/Slogan.vue'
import { post, get } from '../../utils/request'
import { useRouter } from 'vue-router'

export default {
  name: 'Signup',
  components: { Slogan },
  setup () {
    const router = useRouter()
    const sendCodeInfo = reactive({
      text: 'send code',
      disabled: false
    })
    const data = reactive({
      email: '',
      username: '',
      password: '',
      verifyCode: ''
    })
    const handleSendCodeClick = async () => {
      try {
        const result = await get('/api/sendVerifyCode', {
          email: data.email
        })
        alert(result.data)
      } catch (e) {
        alert()
      }
      let i = 60
      sendCodeInfo.disabled = true
      const countDown = setInterval(() => {
        if (i > 0) {
          sendCodeInfo.text = i + '秒后重新发送'
          i--
        } else {
          sendCodeInfo.disabled = false
          sendCodeInfo.text = '重新发送'
          clearInterval(countDown)
        }
      }, 1000)
    }
    const handleSignupClick = async () => {
      try {
        const result = await post('/api/signup', {
          email: data.email,
          username: data.username,
          password: data.password,
          verifyCode: data.verifyCode
        })
        if (result.code === 200) {
          router.push({ name: 'Home' })
          alert('注册成功')
        } else {
          // 提示组件
          alert('注册失败')
        }
      } catch (e) {
        router.push({ name: 'Home' })
      }
    }
    const { email, username, password, verifyCode } = toRefs(data)
    return {
      email,
      username,
      password,
      verifyCode,
      handleSignupClick,
      handleSendCodeClick,
      sendCodeInfo
    }
  }
}
</script>

<style lang='scss' scoped>
.main {
  height: 100%;
  background: #bbc0cd;
  padding: 0;
  &__row {
    height: 100%;
  }
}

.right {
  // 定位居中
  position: relative;
  height: 100%;
  background: #ffffff;
}

.signBtn {
  position: absolute;
  top: 20px;
  right: 20px;
  text-decoration: none;
  height: 40px;
  width: 90px;
  border: 2px solid #43a047;
  border-radius: 3px;
  line-height: 40px;
  text-align: center;
  color: #43a047;
  font-size: 13px;
}
.signBtn:hover {
  background: #ecf5ec;
}
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 500px;
  &__tittle {
    font-size: 25px;
  }
  &__info {
    display: flex;
    margin: 30px 0 30px 0;
    border: 1px solid #e5e5e5;
    height: 65px;
    padding-top: 14px;
    &__logo {
      height: 40px;
      margin-left: 15px;
    }
    &__desc {
      margin-left: 30px;
      //border: black 1px solid;
    }
    &__name {
      display: block;
      font-size: 18px;
      font-family: 'Microsoft YaHei';
    }
    &__site {
      display: block;
      color: #6d767e;
    }
  }
  &__form {
    &__item {
      width: 100%;
      min-height: 50px;
      // 解决溢出
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      //background: #ffffff;
    }
    &__getCodeBtn {
      height: 50px;
      width: 100%;
      line-height: 50px;
      font-size: 15px;
    }
    &__desc {
      padding: 0;
      margin: 0;
      color: #44474e;
    }
  }
}
el-form-item {
  margin: 0;
}
.loginbtn {
  font-size: 16px;
  color: #fff;
}
</style>
