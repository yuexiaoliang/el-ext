<template>
  <div class="nav-bar">
    <router-link class="nav-bar__item" :to="{ name: 'Home' }">Home</router-link>
    <router-link class="nav-bar__item" :to="{ name: 'TableMerge' }">TableMerge</router-link>
  </div>
  <router-view></router-view>
</template>

<style lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 20px 0;

  &__item {
    margin: 0 10px;
  }
}
</style>
