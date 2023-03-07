<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <Navigation :currentIndex="0" />
      </el-header>
      <el-container>
        <el-container>
          <div class="center">
            <div class="banner">
              <el-carousel height="180px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
              </el-carousel>
            </div>
            <div class="flow">
              <div class="flow__titile">New Article</div>
              <ArticleList :userId="userId" />
            </div>
          </div>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import ArticleList from '@/components/ArticleList'

export default {
  name: 'Home',
  components: { Navigation, ArticleList },
  setup () {
    const userId = 0
    return { userId }
  }
}
</script>

<style lang='scss' scoped>
.aside {
  padding: 0;
  border: 1px solid black;
}
.center {
  width: 70%;
  margin: 0 auto;
}
.banner {
  position: absolute;
  top: 100px;
  margin: 0 auto;
  border: 1px black solid;
  width: 70%;
}
.flow {
  position: absolute;
  margin: 0 auto;
  top: 300px;
  width: 70%;
  height: 1000px;
  //border: 1px solid black;
  &__titile {
    font-size: 24px;
    padding: 20px 20px 0 20px;
  }

}
</style>
