// store => state được lưu trữ trên store
// khi muốn thay đổi state trên store thì chúng ta thực hiện dispatch action

// dípatch , getState

const initialState = 0;

function reducer() {

    if (action.type === 'INCREMENT') {
        return state += action.payload;
    } else if (action.type === 'DECREMENT') {
        return state -= action.payload;
    }
    // => đưa thành reducer

}

function createStore(reducer, initialState) {
    let state = initialState;
    let listener = [];
    const dispatch = function (action) {
        //logic here -- thay đổi state theo action
        state = reducer(state, action);
        // khi state thay đổi -> render lại view
        // functuon nào đấy để kích hoạt render vỉew
        //=> observer pattenrn
        for (let i = 0; i < listener.length; i++) {
            listener[i]();
        }
    }

    const subscribe = function (listener) {
        listener.push(listener)
    }

    const getState = function () {
        return state;
    }
    return {
        dispatch,
        getState,
        subscribe
    }
}
const store = createStore(reducer, initialState);
// ở trong component lấy state trên store và render lại
// console.log(store.getState());

// buộc app re render
store.subscribe(function () {
    console.log('store changed');
})

store.dispatch({
    type: 'INCREMENT',
    payload: 3
})