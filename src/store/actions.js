import { getCart } from "@/network/cart";

const actions = {
    updatedCart({commit}){
        getCart().then(res => {
            commit('addCart',{count:res.data.length||0})
        })
    }
}

export default actions;