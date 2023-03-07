<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <Navigation />
      </el-header>
      <el-main>
        <div class="article">
          <div class="article__title">{{ title }}</div>
          <v-md-preview :text="content"></v-md-preview>
          <div class="article__footer">
            <div class="article__footer__item">
              <span class="article__footer__icon iconfont" @click="handleLikeClick">&#xea9c;</span>
              <span class="article__footer__text">{{ likeCount }}</span>
            </div>
            <div class="article__footer__item">
              <span class="article__footer__icon iconfont">&#xe7df;</span>
              <span class="article__footer__text">{{ collectCount }}</span>
            </div>
            <div class="article__footer__item">
              <span class="article__footer__icon iconfont">&#xe7e0;</span>
              <span class="article__footer__text">{{ commentCount }}</span>
            </div>
            <div class="article__footer__item">
              <a href="" class="article__footer__name">
                <span>作者：曹大屌</span>
              </a>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import Navigation from '@/components/Navigation'

const useArtilceEffect = () => {
  const router = useRoute()
  const aid = router.params.aid
  const article = reactive({
    id: '',
    title: '',
    content: '',
    likeCount: '',
    collectCount: '',
    commentCount: ''
  })
  const getArticle = async () => {
    try {
      const result = await get('/api/article/' + aid)
      if (result.code === 200) {
        article.id = result.data.id
        article.title = result.data.title
        article.content = result.data.content
        article.likeCount = result.data.likeCount
        article.collectCount = result.data.collectCount
        article.commentCount = result.data.commentCount
      }
    } catch (error) {
      alert('出了点问题')
    }
  }
  const { id, title, content, likeCount, collectCount, commentCount } = toRefs(article)
  return { id, title, content, likeCount, collectCount, commentCount, getArticle }
}

export default {
  name: 'Article',
  components: { Navigation },
  setup () {
    const { id, title, content, likeCount, collectCount, commentCount, getArticle } = useArtilceEffect()
    getArticle()
    const handleLikeClick = async () => {
      const result = await get('/api/article/like', {
        aId: id.value
      })
      if (result?.code === 200) {
        likeCount.value += 1
      }
    }
    return { id, title, content, likeCount, collectCount, commentCount, handleLikeClick }
  }
}
</script>

<style lang='scss' scoped>
.article {
  width: 60%;
  margin: 0 auto;
  //border: 1px black solid;
  &__title {
    margin-left: 40px;
    font-size: 1.8rem;
    font-weight: bold;
  }
  &__footer {
    display: flex;
    margin: 0 40px;
    height: 50px;
    //border: 1px black solid;
    &__item {
      position: relative;
      flex: 1;
      width: 60px;
      margin: 0 10px;
      //border: 1px black solid;
    }
    &__icon {
      line-height: 50px;
      font-size: 30px;
      color: red;
    }
    &__icon:hover {
      cursor: pointer;
    }
    &__text {
      display: inline-block;
      position: absolute;
      top: 0;
      line-height: 48px;
      font-size: 20px;
      //border: 1px black solid;
    }
    &__name {
      line-height: 50px;
      font-size: 1rem;
    }
  }
}
</style>
