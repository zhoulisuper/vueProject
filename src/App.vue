<template>
  <div id="app"
    :class="$store.state.SiderStore.collapse?'collapseY':'collapseN'">
    <headerVue :activeIndex2="activeIndex2"></headerVue>
    <siderVue></siderVue>
    <transition :name="transitionName">
      <router-view class="Router" />
    </transition>
  </div>
</template>
<script>
import headerVue from './components/Header.vue'
import siderVue from './components/Sider.vue'
import getSiderByHeaderIndex from 'tool/getSiderByHeaderIndex'
import { getHeaderKeyByRouter } from 'tool/getHeaderIndexByRouter'
import { mapMutations } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      transitionName: 'slide-left',
      activeIndex2: '',
    }
  },
  components: {
    headerVue,
    siderVue,
  },
  methods: {
    ...mapMutations('HeaderStore', ['setActiveIndex']),
    ...mapMutations('SiderStore', ['setItems']),
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      const { HeaderStore } = this.$store.state
      if (location.pathname === '/') {
        this.$router.push(
          HeaderStore.headerMenu[0].children[0].name
            ? HeaderStore.headerMenu[0].children[0].name
            : HeaderStore.headerMenu[0].children[0].children[0].name,
        )
        this.setActiveIndex(
          getHeaderKeyByRouter(
            HeaderStore.headerMenu,
            HeaderStore.headerMenu[0].children[0].name
              ? HeaderStore.headerMenu[0].children[0].name
              : HeaderStore.headerMenu[0].children[0].children[0].name,
          ),
        )
      } else {
        this.setActiveIndex(
          getHeaderKeyByRouter(HeaderStore.headerMenu, location.pathname.replace('/', '')),
        )
      }
      let siderMenu = getSiderByHeaderIndex(
        HeaderStore.headerMenu,
        getHeaderKeyByRouter(HeaderStore.headerMenu, location.pathname.replace('/', '')),
      )
      this.setItems(siderMenu)
    },
  },
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  transition: 0.8s;
}

.collapseY .Router {
  position: absolute;
  box-sizing: border-box;
  width: calc(100% - 64px);
  min-width: 1100px;
  padding: 10px 20px;
  top: 60px;
}

.collapseN .Router {
  position: absolute;
  box-sizing: border-box;
  width: calc(100% - 200px);
  min-width: 1100px;
  padding: 10px 20px;
  top: 60px;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  transition: all 500ms;
  will-change: transform;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.collapseY {
  padding: 0 0 0 64px;
}

.collapseN {
  padding: 0 0 0 200px;
}
</style>
