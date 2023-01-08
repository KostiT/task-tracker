<template>

  <div class="container">
    <img alt="Vue logo" src="./assets/logo.png">

    <div class="space-x mb-4">
        <router-link class="button button-outline" to="/">Tasks</router-link>
        <router-link class="button button-outline" to="/tasks/create">New Task</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>
<style>
.space-x {
  display: flex;
  gap: .5rem;
}
.mb-4 {
  margin-bottom: 2rem;
}
</style>
