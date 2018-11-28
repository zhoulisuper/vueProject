import loader from './polyfill'

loader.then(() => {
  import(/* webpackChunkName: "main" */ './index')
})
