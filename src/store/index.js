import { createStore } from 'vuex'

const setLocalCurrentUser = (state) => {
  const { currentUser } = state
  const currentUserString = JSON.stringify(currentUser)
  localStorage.currentUser = currentUserString
}

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.currentUser)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    currentUser: getCurrentUser()
  },
  mutations: {
    updateCurrentUser (state, payload) {
      const { currentUser } = payload
      state.currentUser = currentUser
      setLocalCurrentUser(state)
    },
    clearCurrentUser (state) {
      state.currentUser = ''
      setLocalCurrentUser(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
