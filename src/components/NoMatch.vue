<template>
  <div class="noMatch">
    无数据
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('RootStore')

export default {
  name: 'noMatch',
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['themeColor']),
  },
  mounted() {},
  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="less" type="text/css">
.noMatch {
  .noMatchLeft {
    float: left;
    padding: 140px 100px 0 200px;
  }

  .noMatchRight {
    float: left;
    padding: 140px 0 0;

    h1 {
      margin-bottom: 24px;
      font-size: 72px;
      line-height: 72px;
      text-align: left;
      color: #434e59;
    }

    h2 {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
