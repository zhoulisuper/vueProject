<template>
  <div class="queryForm">
    <el-form ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules">
      <el-row>
        <el-col :span="6"
          v-if="showForm.name">
          <el-form-item label='姓名'
            prop="name">
            <el-input placeholder='请输入姓名'
              v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
          v-if="showForm.age">
          <el-form-item label="年龄"
            prop="age">
            <el-input placeholder="请输入年龄"
              v-model="ruleForm.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
          v-if="showForm.sex">
          <el-form-item label="性别"
            prop="sex">
            <el-select filterable
              v-model="ruleForm.sex"
              placeholder="请选择性别">
              <el-option label="男"
                value="1"></el-option>
              <el-option label="女"
                value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6"
          v-if="showForm.date">
          <el-form-item label="日期"
            required>
            <el-form-item prop="date">
              <el-date-picker type="date"
                placeholder="请选择日期"
                v-model="ruleForm.date"
                style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex"
        class="row-bg"
        justify="end">
        <el-form-item>
          <el-button type="primary"
            @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import timeFormat from 'tool/timeFormat'
import { mapMutations } from 'vuex'
export default {
  name: 'queryForm',
  data: function() {
    return {
      ruleForm: {
        name: '',
        sex: '',
        date: '',
        age: '',
      },
    }
  },
  props: {
    showForm: Object,
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: '请输入3-5个字符',
            trigger: 'blur',
          },
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
          },
        ],
        date: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
        age: [
          {
            required: true,
            message: ' 请输入年龄',
            trigger: 'blur',
          },
        ],
      }
    },
  },
  mounted() {
    const { query } = this.$route
    this.ruleForm = query
  },
  methods: {
    ...mapMutations('RootStore', ['setQueryFrom']),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Object.keys(this.ruleForm).forEach(item => {
            if (this.ruleForm[item] instanceof Date) {
              this.ruleForm[item] = timeFormat(this.ruleForm[item])
            }
          })
          const { query } = this.$route
          let new_query = {
            x: '',
          }
          let params = {
            ...query,
            ...this.ruleForm,
            ...new_query,
            pageSize: query.pageSize ? query.pageSize : 10,
            pageNo: query.pageNo ? query.pageNo : 1,
          }
          this.$router.push({ query: {} })
          let location = {
            query: params,
          }
          this.$router.push(location)
          this.setQueryFrom(params)
          this.$emit('onSubmit', params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.setQueryFrom(this.ruleForm)
    },
  },
}
</script>

<style scoped lang="less" type="text/css">
</style>
