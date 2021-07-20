import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes:[]
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROUTES: (state: any, routes: Array<any>) => {
    console.log(111,routes)
    state.routes = routes
  },
  RESET_STATE: (state:any) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state:any, token:string) => {
    state.token = token
  },
  SET_NAME: (state:any, name:string) => {
    state.name = name
  },
  SET_AVATAR: (state:any, avatar:any) => {
    state.avatar = avatar
  }
}
interface Userinfo{
  username: string;
  password: string;
}
const actions = {
  // user login
  login({ commit }:any, userInfo:Userinfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }:any) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }:any) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve({message:'已退出登录'})
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }:any) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve({message:'token已移除'})
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
