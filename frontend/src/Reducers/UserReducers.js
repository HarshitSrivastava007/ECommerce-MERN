import { USER_DETAILS_FAIL,
         USER_DETAILS_REQUEST, 
         USER_DETAILS_RESET, 
         USER_DETAILS_SUCCESS, 
         USER_LIST_FAIL, 
         USER_LIST_REQUEST, 
         USER_LIST_SUCCESS,
         USER_LIST_RESET, 
         USER_LOGIN_FAIL, 
         USER_LOGIN_REQUEST, 
         USER_LOGIN_SUCCESS, 
         USER_LOGOUT, 
         USER_REGISTER_FAIL, 
         USER_REGISTER_REQUEST, 
         USER_REGISTER_SUCCESS, 
         USER_UPDATE_PROFILE_FAIL, 
         USER_UPDATE_PROFILE_REQUEST, 
         USER_UPDATE_PROFILE_SUCCESS, 
         USER_DELETE_REQUEST,
         USER_DELETE_SUCCESS,
         USER_DELETE_FAIL,
         USER_UPDATE_REQUEST,
         USER_UPDATE_SUCCESS,
         USER_UPDATE_FAIL,
         USER_UPDATE_RESET} from "../Constents/UserConstent"

export const userLoginReducer = (state = { },action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return{ loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_LOGIN_SUCCESS:
            return{ loading: false, userInfo: action.payload }  //we are going to fill products in the state with that payload.
        case USER_LOGIN_FAIL:
            return{ loading: false, error: action.payload}      //sending error in payload
        case USER_LOGOUT:   
            return{}
        default:
            return state 
    }

}



export const userRegisterReducer = (state = { },action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return{ loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_REGISTER_SUCCESS:
            return{ loading: false, userInfo: action.payload }  //we are going to fill products in the state with that payload.
        case USER_REGISTER_FAIL:
            return{ loading: false, error: action.payload}      //sending error in payload
        case USER_LOGOUT:
            return{}
        default:
            return state 
    }

}



export const userDetailsReducer = (state = {user: {} },action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_DETAILS_REQUEST:
            return{...state, loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_DETAILS_SUCCESS:
            return{ loading: false, user: action.payload }              //we are going to fill products in the state with that payload.
        case USER_DETAILS_FAIL:
            return{ loading: false, error: action.payload}              //sending error in payload
        case USER_DETAILS_RESET:
            return{user:{}}
        default:
            return state 
    }

}



export const userUpdateProfileReducer = (state = {}, action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return{loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_UPDATE_PROFILE_SUCCESS:
            return{ loading: false, success: true, userInfo: action.payload }              //we are going to fill products in the state with that payload.
        case USER_UPDATE_PROFILE_FAIL:
            return{ loading: false, error: action.payload}              //sending error in payload
        default:
            return state 
    }
}




export const userListReducer = (state = { users: [] },action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_LIST_REQUEST:
            return{loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_LIST_SUCCESS:
            return{ loading: false, users: action.payload }              //we are going to fill products in the state with that payload.
        case USER_LIST_FAIL:
            return{ loading: false, error: action.payload}              //sending error in payload
        case USER_LIST_RESET:
            return{ users: []}            
        default:
            return state 
    }
}



export const userDeleteReducer = (state = {}, action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_DELETE_REQUEST:
            return{loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_DELETE_SUCCESS:
            return{ loading: false, success: true }              //we are going to fill products in the state with that payload.
        case USER_DELETE_FAIL:
            return{ loading: false, error: action.payload}              //sending error in payload           
        default:
            return state 
    }
}



export const userUpdateReducer = (state = {user: {} }, action)=>{         //productList reducer it will handles the listing of the products and also list product action
    switch (action.type){
        case USER_UPDATE_REQUEST:
            return{loading: true }                             //we want the compinent to know its. currently fetching data
        case USER_UPDATE_SUCCESS:
            return{ loading: false, success: true }              //we are going to fill products in the state with that payload.
        case USER_UPDATE_FAIL:
            return{ loading: false, error: action.payload}              //sending error in payload           
        case USER_UPDATE_RESET:
            return{ user: {} }
        default:
            return state 
    }
}