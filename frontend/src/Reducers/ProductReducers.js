import { PRODUCT_LIST_REQUEST, 
         SUCCESS,
         FAIL,
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL,
         PRODUCT_DELETE_REQUEST,
         PRODUCT_DELETE_FAIL,
         PRODUCT_DELETE_SUCCESS,
         PRODUCT_CREATE_REQUEST,
         PRODUCT_CREATE_SUCCESS,
         PRODUCT_CREATE_FAIL,
         PRODUCT_CREATE_RESET,
         PRODUCT_UPDATE_REQUEST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAIL,
         PRODUCT_UPDATE_RESET,
         PRODUCT_TOP_REQUEST,
         PRODUCT_TOP_SUCCESS,
         PRODUCT_TOP_FAIL,
} from '../Constents/productConstent'

export const productListReducer = (state = { products: [] },action)=>{  //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return{ loading: true, products: [] }           //we want the compinent to know its. currently fetching data
        case SUCCESS:
            return{ loading: false,
                    products: action.payload.products,
                    pages: action.payload.pages,
                    page: action.payload.page, }            //we are going to fill products in the state with that payload.
        case FAIL:
            return{ loading: false, error: action.payload}  //sending error in payload
        default:
            return state 
    }

}


export const productDetailsReducer = (state = { product: {} },action)=>{  //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return{ loading: true, ...state }   //...spread  operater whatever in this there, we are just going to spread      //we want the compinent to know its. currently fetching data
        case PRODUCT_DETAILS_SUCCESS:
            return{ loading: false, product: action.payload } //we are going to fill products in the state with that payload.
        case PRODUCT_DETAILS_FAIL:
            return{ loading: false, error: action.payload}  //sending error in payload
        default:
            return state 
    }

}



export const productDeleteReducer = (state = {},action)=>{              //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return{ loading: true }                                      //we want the compinent to know its. currently fetching data
        case PRODUCT_DELETE_SUCCESS:
            return{ loading: false, success: true }                        //we are going to fill products in the state with that payload.
        case PRODUCT_DELETE_FAIL:
            return{ loading: false, error: action.payload}                  //sending error in payload
        default:
            return state 
    }
}



export const productCreateReducer = (state = {},action)=>{              //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case PRODUCT_CREATE_REQUEST:
            return{ loading: true }                                      //we want the compinent to know its. currently fetching data
        case PRODUCT_CREATE_SUCCESS:
            return{ loading: false, success: true, product: action.payload }                        //we are going to fill products in the state with that payload.
        case PRODUCT_CREATE_FAIL:
            return{ loading: false, error: action.payload}                  //sending error in payload
        case PRODUCT_CREATE_RESET:
            return {}    
        default:
            return state 
    }
}


export const productUpdateReducer = (state = { product: {} },action)=>{              //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case PRODUCT_UPDATE_REQUEST:
            return{ loading: true }                                      //we want the compinent to know its. currently fetching data
        case PRODUCT_UPDATE_SUCCESS:
            return{ loading: false, success: true, product: action.payload }                        //we are going to fill products in the state with that payload.
        case PRODUCT_UPDATE_FAIL:
            return{ loading: false, error: action.payload}                  //sending error in payload
        case PRODUCT_UPDATE_RESET:
            return { product: {} }    
        default:
            return state 
    }
}



export const productTopRatedReducer = (state = { products: []}, action)=>{              //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case PRODUCT_TOP_REQUEST:
            return{ loading: true, products: [] }                                      //we want the compinent to know its. currently fetching data
        case PRODUCT_TOP_SUCCESS:
            return{ loading: false, products: action.payload }                        //we are going to fill products in the state with that payload.
        case PRODUCT_TOP_FAIL:
            return{ loading: false, error: action.payload}                  //sending error in payload    
        default:
            return state 
    }
}

//we attaching this reducer to ReduserStore.