<template>
  <div class="common-layout">
    <el-container>
      <el-main class="main">
        <el-row class="main__row">
          <Slogan/>
          <el-col :span="12" class="right">
            <router-link class="signBtn" :to="{ name: 'Signup' }">SIGN UP</router-link>
            <div class="wrapper">
              <p class="wrapper__tittle">Log in  to</p>
              <div class="wrapper__info">
                <img class="wrapper__info__logo" src="../../assets/img/logo.png" />
                <div class="wrapper__info__desc">
                  <span class="wrapper__info__name">Geekhub</span>
                  <span class="wrapper__info__site">geekhub.ink</span>
                </div>
              </div>
              <el-form class="wrapper__form">
                <el-form-item>
                  <p class="wrapper__form__desc">Email or Username</p>
                  <el-col :span="24">
                    <input class="wrapper__form__item" v-model="username" clearable />
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <p class="wrapper__form__desc">Password</p>
                  <a class="wrapper__form__forget" href="">Forget the password?</a>
                  <el-col :span="24">
                    <input class="wrapper__form__item" v-model="password" type="password" show-password />
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24">
                    <el-button class="wrapper__form__item loginbtn" color="#66bb6a" @click="handleLoginClick">LOG IN</el-button>
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
import { post } from '../../utils/request'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  components: { Slogan },
  setup () {
    const router = useRouter()
    const store = useStore()
    const data = reactive({
      username: '',
      password: ''
    })
    const handleLoginClick = async () => {
      try {
        const result = await post('/api/login', {
          username: data.username,
          password: data.password
        })
        if (result?.code === 200) {
          const currentUser = result?.data
          localStorage.isLogin = 1
          store.commit('updateCurrentUser', { currentUser })
          alert('登录成功')
          router.push({ name: 'Home' })
        } else {
          alert('登录失败')
        }
      } catch (e) {
        alert('出了點問題')
      }
    }
    const { username, password } = toRefs(data)
    return { username, password, handleLoginClick }
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
  &__form{
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
    &__desc {
      padding: 0;
      margin: 0;
      color: #44474e;
    }
    &__forget {
      padding: 0;
      margin: 0;
      top: 0;
      position: absolute;
      right: 0;
      color: #67bb6b;
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
