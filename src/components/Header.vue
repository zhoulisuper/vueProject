<template>
  <div class="header">
    <div class="header-logo">
      <div class="collapse-btn"
        @click="collapseChage">
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">{{name}}</div>
    </div>
    <div class="menu">
      <el-menu :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item v-for="item in headerMenu"
          :key="item.name"
          :index="String(item.name)">{{item.fullName}}</el-menu-item>
      </el-menu>
    </div>
    <div class="user-info">
      <el-dropdown trigger="click"
        @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import getSiderByHeaderIndex from 'tool/getSiderByHeaderIndex'
import { getHeaderKeyByRouter } from 'tool/getHeaderIndexByRouter'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      name: 'linxin',
      siderMenu: [],
    }
  },
  components: {},
  mounted() {
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
  },
  computed: {
    ...mapState('HeaderStore', ['activeIndex', 'headerMenu']),
    ...mapState('RootStore', ['themeColor']),
    ...mapState('SiderStore', ['collapse']),
    username() {
      let username = localStorage.getItem('ms_username')
      return username ? username : this.name
    },
  },
  methods: {
    ...mapMutations('HeaderStore', ['setActiveIndex']),
    ...mapMutations('SiderStore', ['setItems', 'setCollapse']),
    handleCommand(command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username')
        this.$router.push('/login')
      }
    },
    collapseChage() {
      this.setCollapse(!this.collapse)
    },
    handleSelect(key, keyPath) {
      this.siderMenu = getSiderByHeaderIndex(this.$store.state.HeaderStore.headerMenu, key)
      this.setItems(this.siderMenu)
      if (this.siderMenu[0] && this.siderMenu[0].children) {
        this.$router.push(this.siderMenu[0].children[0].name)
      } else {
        this.$router.push(this.siderMenu[0].name)
      }
    },
  },
}
</script>
<style lang="less" scoped type="text/css">
.header {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  min-width: 800px;
  height: 60px;
  font-size: 22px;
  line-height: 60px;

  .header-logo {
    float: left;
    width: 200px;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
  }

  .logo {
    float: left;
    text-align: left;
  }

  .menu {
    float: left;
  }

  .themePicker {
    float: right;
    padding-top: 8px;
  }

  .language {
    float: right;
    font-size: 16px;
    line-height: 60px;

    .el-dropdown-link {
      position: relative;
      display: inline-block;
      width: 110px;
      vertical-align: middle;
      cursor: pointer;
    }

    .el-icon-arrow-down {
      font-size: 14px;
    }

    .international-icon {
      font-size: 20px;
      vertical-align: -5px !important;
      cursor: pointer;
    }
  }

  .user-info {
    float: right;
    font-size: 16px;
    line-height: 60px;

    .el-dropdown-link {
      position: relative;
      display: inline-block;
      width: 100px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
    }

    .user-logo {
      position: absolute;
      top: 15px;
      left: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
}

.languageImage {
  width: 30px;
  height: 25px;
  vertical-align: middle;
}

.languageImageTop {
  width: 30px;
  height: 25px;
  vertical-align: middle;
}
</style>
