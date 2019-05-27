




const typeRead = {

    state :{
        typeId: '',
        readId: ''
    },
    mutations: {
        SET_TYPEID: (state, typeId) => {
            state.typeId = typeId
          },
        SET_READID: (state, readId) => {
        state.readId = readId
        }  
    },
    actions: {
        // type
        standByTpyeId({ commit }, data) {
            return new Promise((resolve, reject) => {			
              commit('SET_TYPEID', data)
              resolve()
            }) 
          },
        standByReadId({ commit }, data) {
        return new Promise((resolve, reject) => {			
            commit('SET_READID', data)
            resolve()
        }) 
        }
    }
}

export default typeRead