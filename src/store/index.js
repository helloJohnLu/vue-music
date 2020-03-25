import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions

  /*
  // state: 用于保存全局共享的数据
  state: {
    isFullScreen: false
  },
  // 获取 state 中的数据
  getters: {
    isFullScreen(state) {
      return state.isFullScreen;
    }
  },
  // 修改全局数据的方法
  mutations: {
    changeFullScreen(state, flag) {
      state.isFullScreen = flag;
    }
  },
  // 触发 mutations 中保存的方法
  actions: {
    setFullScreen({commit}, flag) {
      commit('changeFullScreen', flag);
    }
  },
  modules: {
  }
   */
})
