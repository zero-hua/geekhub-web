<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navigation />
      </el-header>
      <el-main>
        <div class="midNav">
          <ul class="nav">
            <li class="nav__item nav__item--active">文章</li>
            <li class="nav__item">关注</li>
            <li class="nav__item">收藏</li>
            <li class="nav__item">草稿</li>
          </ul>
        </div>
        <div class="main">
          <div class="left">
            <div class="profile">
              <div class="profile__photo">
                <el-avatar :size="250" :src="avatarUrl" />
              </div>
              <div v-if="isEdit">
                <div class="profile__motto">
                  <div>Motto</div>
                  <el-input type="textarea" v-model="motto" placeholder=""></el-input>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont">&#xe882;</span>
                  <div class="profile__common__content">
                    <el-input v-model="qq" placeholder="" />
                  </div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont">&#xe94c;</span>
                  <div class="profile__common__content">
                    <el-input v-model="company" placeholder="" />
                  </div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont">&#xe650;</span>
                  <div class="profile__common__content">
                    <el-input v-model="location" placeholder="" />
                  </div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont">&#xe756;</span>
                  <div class="profile__common__content">
                    <el-input v-model="website" placeholder="" />
                  </div>
                </div>
                <div class="profile__common">
                  <el-button type="primary" @click="handleSaveClick">save</el-button>
                </div>
              </div>
              <div v-else>
                <div class="profile__common">
                  <span class="profile__name">{{ username }}</span>
                </div>
                <div class="profile__motto">{{ motto }}</div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont"
                    >&#xea9d;</span
                  >
                  <div class="profile__common__content">
                    {{ email }}
                  </div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont"
                    >&#xe882;</span
                  >
                  <div class="profile__common__content">{{ qq }}</div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont"
                    >&#xe94c;</span
                  >
                  <div class="profile__common__content">
                    {{ company }}
                  </div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont"
                    >&#xe650;</span
                  >
                  <div class="profile__common__content">
                    {{ location }}
                  </div>
                </div>
                <div class="profile__common">
                  <span class="profile__common__iconfont iconfont"
                    >&#xe756;</span
                  >
                  <div class="profile__common__content">
                    {{ website }}
                  </div>
                </div>
                <div class="profile__common">
                  <el-button type="primary" @click="handleEditClick">edit</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <ArticleList :userId="userId" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import Navigation from '@/components/Navigation'
import avatarUrl from '@/assets/img/微信图片_20220117222929.jpg'
import ArticleList from '@/components/ArticleList'
import { get, put } from '../../utils/request'
import { reactive, ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

const useUserInfoEffect = () => {
  const route = useRoute()
  const username = route.params.username
  const info = reactive({
    id: '',
    email: '',
    motto: '',
    qq: '',
    company: '',
    location: '',
    website: ''
  })
  const getUserInfo = async () => {
    const result = await get('/api/user/' + username)
    if (result?.data != null) {
      info.id = result.data.id
      info.email = result.data.email
      info.qq = result.data.qq
      info.company = result.data.company
      info.motto = result.data.motto
      info.location = result.data.location
      info.website = result.data.website
    }
  }
  const { id, email, qq, motto, company, location, website } = toRefs(info)
  return { getUserInfo, id, username, email, qq, motto, company, location, website }
}

export default {
  components: { Navigation, ArticleList },
  name: 'User',
  setup () {
    const store = useStore()
    const { userInfo, getUserInfo, username, email, qq, motto, company, location, website } = useUserInfoEffect()
    const userId = computed(() => store.state.currentUser.id)
    const isEdit = ref(false)
    const handleEditClick = () => {
      isEdit.value = true
    }
    const handleSaveClick = async () => {
      console.log(motto, 'is that')
      const result = await put('/api/user', {
        id: 1533168202311422000,
        email: email.value,
        qq: qq.value,
        motto: motto.value,
        company: company.value,
        location: location.value,
        website: website.value
      })
      if (result?.code === 200) {
        alert('修改成功')
      }
      isEdit.value = false
    }
    getUserInfo()
    console.log(userInfo)
    console.log(qq, '-------->')
    return {
      avatarUrl,
      userInfo,
      handleEditClick,
      isEdit,
      handleSaveClick,
      userId,
      motto,
      qq,
      username,
      email,
      company,
      location,
      website
    }
  }
}
</script>

<style lang='scss' scoped>
.el-main {
  padding: 0;
}
.midNav {
  height: 60px;
  width: 100%;
  border: 1px solid #d8dee4;
}
.nav {
  display: flex;
  height: 40px;
  width: 600px;
  margin: 20px auto 0;
  //border: 1px solid black;
  &__item {
    height: 35px;
    width: 23%;
    margin-right: 5px;
    line-height: 35px;
    text-align: center;
    //border: 1px solid black;
    font-weight: bold;
    letter-spacing: 3px;
    &--active {
      border-bottom: 2px solid #fd8c73;
    }
  }
  &__item:hover {
    background: #f0f2f4;
  }
}
.main {
  display: flex;
}
.left {
  //flex: 1;
  height: 80vh;
  position: relative;
  width: 30%;
  //border: 1px solid black;
}
.right {
  width: 70%;
  //border: 1px solid black;
}
.profile {
  position: absolute;
  right: 50px;
  width: 250px;
  height: 80vh;
  //border: 1px solid black;
  &__photo {
    width: 100%;
    height: 250px;
    //border: 1px solid black;
    &__img {
      height: 100%;
      width: 100%;
    }
  }
  &__name {
    font-size: 1.4rem;
    font-weight: bold;
  }
  &__motto {
    width: 100%;
    line-height: 20px;
    margin: 15px 0;
    font-size: 1rem;
    //border: 1px solid black;
  }
  &__common {
    height: 35px;
    width: 100%;
    margin: 2px 0;
    //border: 1px solid black;
    display: flex;
    &__iconfont {
      line-height: 35px;
      font-size: 1.5rem;
    }
    &__content {
      margin-left: 4px;
      height: 35px;
      line-height: 35px;
      //border: 1px solid black;
    }
  }
}
</style>
