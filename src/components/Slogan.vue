<template>
  <el-col :span="12" class="left">
    <div class="wrapperLeft">
      <h1 class="wrapperLeft__slogan">专为极客设计的记录空间</h1>
      <p class="wrapperLeft__desc">
        Crowdin is a cloud-based solution that streamlines localization
        management for your team. It's the perfect place to effectively manage
        all of your multilingual content.
      </p>
      <router-link :to="{ name: 'Home' }" class="wrapperLeft__toHome">
        <span class="wrapperLeft__toHome__icon">
          <el-icon size="10px"><d-arrow-right /></el-icon>
        </span>
        进入极客世界
      </router-link>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'Slogan'
}
</script>

<style lang='scss' scoped>
.left {
  // 定位居中
  position: relative;
  height: 100%;
  background: #2e3340;
}
.wrapperLeft {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  width: 500px;
  //border: 1px solid black;
  margin: 0;
  &__slogan {
    font-size: 40px;
    color: #fff;
    margin-top: 150px;
  }
  &__desc {
    font-size: 20px;
    color: #fff;
  }
  &__toHome {
    position: absolute;
    //border: 1px solid white;
    color: #fff;
    text-decoration: none;
    height: 30px;
    line-height: 30px;
    &__icon {
      margin-right: 5px;
    }
  }
  &__toHome:hover {
    text-decoration: underline;
  }
}
</style>
