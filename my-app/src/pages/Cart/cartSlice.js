const { createSlice } = require('@reduxjs/toolkit')


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
        },

    }
)

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions
export default reducer;