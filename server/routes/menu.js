const express = require('express')

const router = express.Router()
const { resultData } = require('../common/utils')

router.get('/menu/getMenuData', (req, res) => {
  res.type('json')
  const ret = {}

  const data = [
    {
      resId: 37,
      resType: 5,
      name: 'Menu1_1',
      fullName: '首页',
      icon: null,
      url: '',
      remark: 'Menu1_1',
      children: [
        {
          resId: 67,
          resType: 2,
          name: 'Home',
          fullName: '首页',
          icon: 'el-icon-picture',
          url: '/Home',
          remark: 'Home',
          children: null,
        },
        {
          resId: 63,
          resType: 5,
          name: 'Menu1_2',
          fullName: '首页1——1',
          icon: 'el-icon-tickets',
          url: '',
          remark: 'Menu1_2',
          children: [
            {
              resId: 67,
              resType: 2,
              name: 'User',
              fullName: '用户管理',
              icon: null,
              url: '/User',
              remark: 'User',
              children: null,
            },
            {
              resId: 68,
              resType: 2,
              name: 'Chart',
              fullName: '图表',
              icon: null,
              url: '/Chart',
              remark: 'Chart',
              children: null,
            },
            {
              resId: 70,
              resType: 2,
              name: 'NotFound',
              fullName: '无匹配路由页面',
              icon: null,
              url: '/NotFound',
              remark: 'NotFound',
              children: null,
            },
          ],
        },
      ],
    },
    {
      resId: 34,
      resType: 5,
      name: 'Menu2_1',
      fullName: '模块二',
      icon: null,
      url: '',
      remark: 'Menu2_1',
      children: [
        {
          resId: 38,
          resType: 5,
          name: 'About',
          fullName: '模块2--1',
          icon: 'el-icon-bell',
          url: '/About',
          remark: 'About',
        },
      ],
    },
  ]
  Object.assign(ret, resultData, {
    data,
  })
  res.send(ret)
})

module.exports = router
