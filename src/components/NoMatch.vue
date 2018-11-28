<template>
  <div class="noMatch">
    <el-button @click="backToHome">返回主页</el-button>
  </div>
</template>

<script>
export default {
  name: 'noMatch',
  data: function() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="less" type="text/css">
</style>
