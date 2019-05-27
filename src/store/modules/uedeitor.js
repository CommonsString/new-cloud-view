
import { saveContent, upfile } from '@/api/uedeitor'



const uedeitor = {
    state: {
      content : '',
      title: '',
      permission: '',
      row: '',
      secondRow: '',
      inportContent:''
    },

    mutations: {
      SET_INPORT: (state, inportContent) => {
        state.inportContent = inportContent
      },
      SET_CONTENT: (state, content) => {
        state.content = content
      },
      SET_TITLE: (state, title) => {
        state.title = title
      },
      SET_PERMISSION: (state, permission) => {
        state.permission = permission
      },
      SET_ROW: (state, row) => {
        state.row = row
      },
      SET_SECONDROW: (state, row) => {
        state.row = row
      }    
    }, 
    actions: {

       // mmaintable
        PassValue({ commit }, data) {
          return new Promise((resolve, reject) => {			
            commit('SET_ROW', data)
            resolve()
          }) 
        },
        // 自动采集
        // mmaintable
        saveEditDate({ commit }, data) {
          return new Promise((resolve, reject) => {			
            commit('SET_ROW', data)
            resolve()
          }) 
        },       
        // 自动采集
        saveDate({ commit }, data) {
          return new Promise((resolve, reject) => {			
            commit('SET_INPORT', data)
            resolve()
          }) 
        },
        MaintableToSelect({ commit }, data) {
          return new Promise((resolve, reject) => {			
            commit('SET_ROW', data)
            resolve()
          }) 
        },          
        // saveContent--Ueditoe
        SaveContent({ commit }, msgObj) {
            return new Promise((resolve, reject) => {			
              saveContent(msgObj).then(res => {
                // 状态修改
                commit('SET_ROW', msgObj)
                resolve()
              }).catch(error => {
                reject(error)
              }) 
            }) 
          },      
          // 首页, 获取10条记录
          GitMsgLimitTen({ commit }) {
            const title = msgObj.title
            const role = msgObj.role
            const content = msgObj.msg                 
            return new Promise((resolve, reject) => {			
              gitMsgLimitTen().then(res => {
                // 状态修改
                // 禁用编辑框
                resolve()
              }).catch(error => {
                reject(error)
              }) 
            }) 
          }, 

    }


}
export default uedeitor