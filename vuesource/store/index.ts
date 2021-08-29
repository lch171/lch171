import { Staff } from '@/common/Entity/User/Staff'
import { createStore, Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    staff: Staff
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state () {
    return {
      staff: Staff
    }
  },
  mutations: {
    setloginstate (state: any, msg: Staff) {
      state.staff = msg
      window.sessionStorage.setItem('vuex', JSON.stringify(state))
      console.log(state.loginstate)
    }
  },
  actions: {
  },
  getters: {
    getloginstate (state: any) {
      state.staff = JSON.parse(window.sessionStorage.getItem('vuex') || '[]').staff
    },
    setBlock (state: any) {
      window.sessionStorage.clear()
    }
  },
  modules: {
  }
})
