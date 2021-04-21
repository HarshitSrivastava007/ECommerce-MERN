import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_CLEAR_ITEMS} from '../Constents/CartConstent'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find((x) => x.product === item.product)                //if current item is already exist then get from state cartItems

            if(existItem)               //we chacking if its exist , else push it into cartItems [ ] with new item
            {
                return{
                    ...state,cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x),        //checking CurrentPRoduct Id with existed Product Id
                }
            }
            else
            {
                return {
                    ...state, cartItems: [...state.cartItems,item]
                }
            }
        
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }

        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload,
                }

        case CART_SAVE_PYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload,
                }
        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems:[],
            }
        default:
            return state
    }
}