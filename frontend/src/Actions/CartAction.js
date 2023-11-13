import axios from 'axios'   //when we add an items to the cart, we want to make a request to API Products and then, the ID to get the fields to get the data for that particular product to add to our cart
import  { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PYMENT_METHOD } from '../Constents/CartConstent'

export const addToCart = (id, quantity) => async (dispatch, getState)=> {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload:{                                   //all this data we want to display in our Cart and save it to LocalStorage
            product:data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))        //getState for getting our Entire state Tree    //we can only save Strings in LocalStorage                                                                                               //it will give us JSON javaScript object thats why we use JSON.Stringify 
}



export const removeFromCart = (id) =>(dispatch, getState)=>{                        //reset our localStorage
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



export const saveShippingAddress = (data) =>(dispatch)=>{                        //reset our localStorage
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}



export const savePaymentMethod = (data) =>(dispatch)=>{                        //reset our localStorage
    dispatch({
        type: CART_SAVE_PYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))                 //saving in LocalStorage
}