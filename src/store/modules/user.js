import { login } from '@/api/login'
import { getToken, setToken, removeToken, getUser, setUser, removeUser, } from '@/utils/auth'

const user = {
  state: {
    info: getUser(),
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.info = user
    }
  },

  actions: {
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            const data = response.data.resultData
            const token = data.token.token
            commit('SET_TOKEN', token)
            setToken(token)

            commit('SET_USER', data.user)
            setUser(data.user)
            resolve()
          }).catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    // 前端管理后台 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeUser()
        resolve()
      })
    }
  }
}

export default user
