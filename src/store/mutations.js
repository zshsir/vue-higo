
const mutations = {
    setIsLogin(state,payload){
        state.user.isLogin = payload;
    },

    //添加购物车
    addCart(state,payload){
        state.cartCount = payload.count
    }
}


export default mutations;