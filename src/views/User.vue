<template>
  <div class="user">
    <el-card>
      <div slot="header"
        class="clearfix">
        <span style="line-height:18px;">查询</span>
      </div>
      <QueryForm @onSubmit="onSubmit"
        :showForm="showForm" />
    </el-card>
    <el-card style="margin-top:5px;">
      <el-table border
        stripe
        v-loading="loading"
        :data="lists.dataSource"
        style="width:100%;">
        <el-table-column prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column prop="sex"
          label="性别">
        </el-table-column>
      </el-table>
      <Pagination store="UserStore/fetchLists"
        :storeLists="lists" />
    </el-card>
  </div>
</template>

<script>
import QueryForm from 'components/QueryForm'
import Pagination from 'components/Pagination'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'user',
  data: function() {
    return {
      showForm: {
        name: true,
        sex: true,
        date: true,
        age: true,
      },
      loading: false,
    }
  },
  components: {
    QueryForm,
    Pagination,
  },
  computed: {
    ...mapState('UserStore', ['lists']),
  },
  methods: {
    onSubmit(value) {
      this.fetchLists(value)
    },
    /**
     * 映射vuex  将this.fetchLists映射为this.$store.dispatch('UserStore/fetchLists')
     */
    ...mapActions('UserStore', ['fetchLists']),
  },
  mounted() {
    const { query } = this.$route
    this.onSubmit(query)
  },
}
</script>
