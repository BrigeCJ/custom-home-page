/**
 *  Create by lqs on 2018/03/20
 *  应用状态管理
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import view from './modules/view'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    view
  }
})
