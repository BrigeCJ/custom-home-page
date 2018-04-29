import {
  CURRENT_SIDEBAR_NAV_INDEX
} from '../mutation-types'

const state = {
  sidebar: {
    navIndex: 0
  }
}

const mutations = {
  [CURRENT_SIDEBAR_NAV_INDEX] (state, index) {
    state.sidebar.navIndex = index
  }
}

export default {
  state,
  mutations
}
