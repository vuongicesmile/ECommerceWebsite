const { createSlice } = require('@reduxjs/toolkit')

//only redux
// b1 : reducer : nhận vào 2 tham số ( 1 là state , 2 là action)
// b2  truyền reducer vào store
//b3 : để dispatch 1 action thì store.dispatch(type,payload)

// redux toolkit
// giúp mình setup redux sẵn chỉ lấy sử dụng
// flow làm việc của redux
// view => actions => dispatcher => reducer => state => view
//redux toolkit
// configureStore  : 
//- có sẵn redux devtools
// có sẵn redux-thunk để thực hiệN async actions
//=> configureStore
// set up tại store.js

//-------------- createReducer
// khi không sử dụng redux-toolkit thì phải switch case để xác định action type


// function counterReducer(state = 0,action) {
//     switch(action.type) {
//         case : 'increment':
//             return state + action.payload
//         ..
//     }
// }

// khi sử dụng thì gọi createReducer(giá trị khởi tạo, obj)

// const counterReducer = createReducer(0 , 
//     { increment  : (state, acition) => state + action.payload)})


//----- crateActions
// nếu làm bth thì sẽ truyền type , payload để gọi action
//const INCREASE = 'counter/increment';
//function increament(a) {
//     return {
//         type : 'increment',
//         payload : a
//     }
// }
//const action = increament(3) 

// có redux toolkit
//const increament = createAction('counter/increament')
//const action = increament(3);

//* lứu ý : action với reducer luôn đi chung với nhau
// khi mà reducer handle dựa theo action gửi lên 
//=> ra đời createSlice

// tổng hợp reducer và action

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: {
            showMiniCart: false,
            cartItems: [
                // mong muon cua minh
                // {
                //     id : 1,
                //     product : {},
                //     quantity : 1
                // }
                // action : add to cart 

            ],
        },
        reducers: {
            showMiniCart: (state, action) => {
                state.showMiniCart = true
            },
            hideMiniCart: (state, action) => {
                state.showMiniCart = false
            },
            addToCart: (state, action) => {

                // newItem = { id , product, quantity}
                const newItem = action.payload;
                console.log('newItem', newItem);
                console.log('state', state);
                const index = state.cartItems.findIndex(item => item.id === newItem.id)
                if (index >= 0) {
                    // increase quantity
                    state.cartItems[index].quantity += newItem.quantity

                } else {
                    // add to cart
                    state.cartItems.push(newItem);
                }
            },
            // số lượng của item trong giỏ hàng bao nhiêu
            setQuantity: (state, action) => {
                // cần truyền id và quantity
                const { id, quantity } = action.payload;
                // check if product is available in cart
                const index = state.cartItems.findIndex(x => x.id === id);
                if (index >= 0) {
                    // có trong giỏ hàng
                    // cập nhật quantity tại vị trị index
                    state.cartItems[index].quantity = quantity;
                }


            },
            // xóa sản phẩm ra khỏi giỏ hàng
            removeFromCart: (state, action) => {
                //action có payload :
                // remove thì truyền id của của sản phẩm
                const idNeedToRemove = action.payload;
                // hàm filter trả về mảng mới , gắn vào trực tiếp luôn
                state.cartItems = state.cartItems.filter(item => item.id !== idNeedToRemove)
            },
        }
    }
)

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions
export default reducer;