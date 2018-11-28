<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button @click='onConfirm'>按钮</el-button>
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
