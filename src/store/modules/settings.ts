const defaultSettings = require('@/settings.ts')

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

/* const mutations = {
  CHANGE_SETTING: (state:any, data:any) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({commit}:any, data:any) {
    commit('CHANGE_SETTING', data)
  }
} */

export default {
  namespaced: true,
  state,
}
