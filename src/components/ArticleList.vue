<template>
  <div class="list">
    <div class="list__item" v-for="item in artilceList" :key="item.id">
      <router-link class="list__item__titile" :to="`/article/${item.id}`" >
        {{item.title}}
      </router-link>
      <p class="list__item__content">
        {{item.content}}
      </p>
      <div class="list__item__info">
        <div class="list__item__info__common">
          <span class="list__item__info__icon iconfont">&#xea9c;</span>
          <span class="list__item__info__tx">{{item.likeCount}}</span>
        </div>
        <div class="list__item__info__common">
          <span class="list__item__info__icon iconfont">&#xe7df;</span>
          <span class="list__item__info__tx">{{item.collectCount}}</span>
        </div>
        <div class="list__item__info__common">
          <span class="list__item__info__icon iconfont">&#xe7e0;</span>
          <span class="list__item__info__tx">{{item.commentCount}}</span>
        </div>
        <div class="list__item__info__common">
          <a href="" class="list__item__info__name">
            <span>作者：一名</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../utils/request'

const useArticleListEffect = (userId) => {
  const artilceList = ref([])
  const getArticleList = async () => {
    const result = await get('/api/article', {
      userId: userId
    })
    if (result.code === 200) {
      artilceList.value = result.data
    }
  }
  return { artilceList, getArticleList }
}

export default {
  name: 'ArticleList',
  props: ['userId'],
  setup (props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const userId = props.userId
    const { artilceList, getArticleList } = useArticleListEffect(userId)
    getArticleList()
    return { artilceList }
  }
}
</script>

<style lang='scss' scoped>
.list {
  margin-top: 10px;
  //border: 1px solid black;
  &__item {
    position: relative;
    height: 160px;
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    border-top: 1px solid #ecf5ff;
    &__titile {
      color: #222226;
      font-size: 18px;
      text-decoration: none;
    }
    &__titile:hover {
      text-decoration: underline;
    }
    &__content {
      margin: 5px 0;
      font-size: 14px;
      height: 55px;
      overflow: hidden;
      color: #434a50;
      //border: 1px solid black;
    }
    &__info {
      //border: 1px solid black;
      position: absolute;
      display: flex;
      bottom: 10px;
      height: 30px;
      &__common {
        margin: 0 16px 0 0;
        display: flex;
      }
      &__icon {
        text-align: center;
        line-height: 30px;
        font-size: 20px;
      }
      &__tx {
        text-align: center;
        display: inline-block;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
      }
      &__name {
        display: inline-block;
        //border: 1px solid black;
        font-size: 14px;
        height: 26px;
        line-height: 26px;
        color: #0969da;
      }
    }
  }
  &__item:hover {
    box-shadow: 0 0 15px #c8c9cc;
  }
}
</style>
