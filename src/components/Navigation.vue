<template>
  <div class="navigation">
    <div class="navigation__logo">
      <img class="navigation__logo__img" src="../assets/img/logo-dark.png" />
      <span class="navigation__logo__name">Geekhub</span>
    </div>
    <ul class="navigation__menu">
      <router-link :to="item.to" v-for="(item, index) in menuList" :key="index">
        <li
        :class="{ 'navigation__menu__item': true, 'navigation__menu__item--active': index === currentIndex }"
        :key="index"
        >
        {{item.text}}
        </li>
      </router-link>
    </ul>
    <div class="navigation__search">
      <el-input
        v-model="searchData"
        class="navigation__search__input"
        prefix-icon="Search"
        placeholder="Please input"
      />
      <el-button color=" #c8c9cc" class="navigation__search__btn"
        >search</el-button
      >
    </div>
    <div class="navigation__account">
      <div v-if="isLogin">
        <el-dropdown class="navigation__account__user">
          <span class="el-dropdown-link">
            {{currentUsername}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link :to="`/user/${currentUsername}`">个人中心</router-link>
                <el-icon><Avatar /></el-icon>
              </el-dropdown-item>
              <el-dropdown-item @click="handleLogoutClick">退出登录<el-icon><RemoveFilled /></el-icon></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div v-else>
        <router-link class="navigation__account__item navigation__account__login" :to="{ name: 'Login' }">LOG IN</router-link>
        <router-link class="navigation__account__item navigation__account__signup" :to="{ name: 'Signup' }">SIGN UP</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../utils/request'
import { useStore } from 'vuex'

export default {
  name: 'Navigation',
  props: ['currentIndex'],
  setup () {
    const store = useStore()
    const menuList = [
      { text: '首页', to: { name: 'Home' } },
      { text: '分类', to: { name: 'Classification' } },
      { text: '创作', to: { name: 'Creation' } },
      { text: '星球', to: { name: 'Talk' } }
    ]
    const isLogin = ref(parseInt(localStorage.isLogin))
    let currentUsername = ''
    try {
      const user = JSON.parse(localStorage.currentUser)
      currentUsername = user?.username
    } catch (e) {
    }
    const handleLogoutClick = async () => {
      try {
        const result = await get('/api/logout')
        console.log(result)
      } catch (e) {
        alert()
      }
      localStorage.isLogin = 0
      isLogin.value = false
      currentUsername = ''
      store.commit('clearCurrentUser')
    }
    const searchData = ref('')
    return { searchData, menuList, handleLogoutClick, isLogin, currentUsername }
  }
}
</script>

<style lang='scss' scoped>
.navigation {
  background: #050c1a;
  display: flex;
  position: relative;
  width: 100%;
  height: 60px;
  &__logo {
    display: flex;
    &__img {
      height: 32px;
      width: 44px;
      margin: 12px 8px 12px 24px;
    }
    &__name {
      display: block;
      height: 56px;
      line-height: 56px;
      color: #FFFFFF;
      font-size: 18px;
      font-style: italic;
      font-weight: bold;
    }
  }
  &__menu {
    position: absolute;
    left: 30%;
    display: flex;
    margin: 0;
    &__item {
      height: 58px;
      width: 100px;
      //border: white solid 1px;
      color: #8c9096;
      font-size: 15px;
      text-align: center;
      line-height: 58px;
      margin: 0 2px;
      font-weight: bold;
      &--active {
        background:#434a50;
        border-bottom: 2px solid #ffd04b;
        color: #FFFFFF;
      }
      a {
        text-decoration: none;
        color: #ffffff;
      }
    }
    &__item:hover {
      color: #ffffff;
      background: #434a50;
      cursor: pointer;
    }
    &__logo {
      height: 30px;
      width: 10px;
      border: 1px solid white;
      margin-right: 30px;
    }
  }
  &__search {
    position: absolute;
    right: 200px;
    height: 36px;
    margin: 10px 0;
    width: 250px;
    //border: 1px solid white;
    display: flex;
    &__input {
      padding: 0;
      //display: block;
      height: 36px;
      margin: 0;
      width: 200px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      box-sizing: border-box;
      border: none;
      box-shadow: none;
    }
    &__input:focus {
      padding: 0;
    }
    &__btn {
      height: 36px;
      line-height: 36px;
      margin: 0;
      width: 50px;
      border: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: #909399;
      border-left: 1px solid #f2f2f2;
    }
  }
  &__account {
    position: absolute;
    right: 10px;
    //border: 1px white solid;
    height: 36px;
    margin: 10px 0;
    width: 180px;
    &__item {
      display: inline-block;
      //border: 1px white solid;
      height: 36px;
      width: 80px;
      font-size: 16px;
      text-align: center;
      line-height: 36px;
      margin: 0 5px 0 auto;
      border-radius: 4px;
      box-sizing: border-box;
    }
    &__login {
      color: #43a047;
    }
    &__login:hover {
      background: #0b1b1e;
      cursor: pointer;
    }
    &__signup {
      color:#dceddd ;
      background: #43a047;
    }
    &__signup:hover {
      background: #66bb6a;
      cursor: pointer;
    }
    &__user {
      line-height: 36px;
      height: 36px;
      margin-left: 40px;
      font-size: 18px;
    }
  }
}
</style>

<style>
.navigation__search .el-input__inner {
  height: 36px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
