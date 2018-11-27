<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click='onConfirm'>按钮</button>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import axios from '../tool/axios'

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    onConfirm() {
      axios.get('user/lists').then(data => {
        console.log(data)
      })
    },
  },
}
</script>
