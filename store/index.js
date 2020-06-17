import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		// 发布对战信息
		role:{
			role_name:''
		}
    },
    mutations: {
		updaterole(state,data){
			state.role=data
		}
    }
})

export default store
