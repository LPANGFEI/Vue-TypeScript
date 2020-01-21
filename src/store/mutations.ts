import { MutationTree } from 'vuex';
// import { SET_USER } from './mutation-types'
import * as types from './mutation-types'

const mutations: MutationTree<any> = {
    [types.SET_USER](state: any, user: any): void {
        state.user = user;
    },
    [types.SET_ROUTES](state: any, routes: any): void {
        state.routes = routes;
    }
}

export default mutations;
