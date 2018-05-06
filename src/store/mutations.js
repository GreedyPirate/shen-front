import * as types from './mutation-type'

export const mutations = {
  [types.SET_LOGINUSER]({state,user}){
    state.loginUser = user;
  }
}
