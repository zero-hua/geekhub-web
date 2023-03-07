<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <Navigation :currentIndex="2"/>
      </el-header>
      <el-main>
        <div class="article">
          <el-form label-width="80px">
            <el-form-item label="Titile">
              <el-input v-model="title" placeholder="我是标题" />
            </el-form-item>
            <el-form-item>
              <v-md-editor v-model="text" height="75vh" class="editor"></v-md-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handlePublishClick">发布</el-button>
              <el-button type="primary">存为草稿</el-button>
            </el-form-item>
          </el-form>
          <div class="article__titile"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import { reactive, toRefs, computed } from 'vue'
import { post } from '../../utils/request'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Creation',
  components: { Navigation },
  setup () {
    const store = useStore()
    const router = useRouter()
    const article = reactive({
      title: '',
      text: '',
      creatorId: ''
    })
    if (parseInt(localStorage.isLogin) === 0) {
      alert('请先登录')
      router.push({ name: 'Login' })
    }
    article.creatorId = computed(() => store.state.currentUser.id)
    console.log(store.state.currentUser.id, 'uId----------->')
    const username = computed(() => store.state.currentUser.username)
    const handlePublishClick = async () => {
      const result = await post('/api/article', {
        title: article.title,
        content: article.text,
        creatorId: article.creatorId
      })
      if (result.data === true) {
        alert('发布成功')
        router.push({ path: '/user/' + username.value })
      }
    }
    const { title, text } = toRefs(article)
    return { text, title, handlePublishClick }
  }
}
</script>

<style lang="scss" scoped>
html {
  font-size: 16px;
}
</style>

<style>
.editor {
  font-size: 16px;
}
</style>
