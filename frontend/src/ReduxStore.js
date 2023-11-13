import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productTopRatedReducer } from './Reducers/ProductReducers'
import { cartReducer} from './Reducers/CartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './Reducers/UserReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from './Reducers/OrderReducers'

const reducer = combineReducers({               
    productList: productListReducer,                 //maping productListReducer(REDUCER) inside store
    productDetails: productDetailsReducer,           //maping productDetailsReducer(REDUCER) inside store
    productDelete: productDeleteReducer,           //maping productDetailsReducer(REDUCER) inside store
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer, 
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    
    
    
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse       //we passed String data inside localStorage , So we passed as a (Parse) to get data from local Storage      
(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse       //we passed String data inside localStorage , So we passed as a (Parse) to get userInfo from local Storage      
(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse       //we passed String data inside localStorage , So we passed as a (Parse) to get shippingAddress Info from local Storage      
(localStorage.getItem('shippingAddress')) : {}


const initialState = {                                                          // if we want something to be loaded when redux store loads , initialy we put it in here
    cart: { cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage, 
          },
    userLogin:{ userInfo: userInfoFromStorage },
}                                               
                                                

const middleware = [thunk]
const store = createStore(                   // we dont want to add this, thats why we install devtools extentions    exmpl:=>     (+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)     


export default store;