// in the reducer function, state is the state before update and action is what we are trying to do
//reducer function is as same as redux reducer function
const reducer = (state,action) =>{
    //remove all the list
    if(action.type === "CLEAR_CART"){
        //Note:we have other value as well in the initialState--bring all the state and change cart
        return({...state, cart:[]})
    }
    //remove single item (cartItem)
    if(action.type === "REMOVE"){
        return({
            ...state,
            cart: state.cart.filter((cartItem)=>{
                return(cartItem.id !== action.payload)
            })
        })
    }

    //reduce method reduces the number of values in an array--it receives two parameter and an accumulator (by default it is 0)
    if(action.type === 'GET_TOTALS'){
        //the below line must be let since we want to change it 
        let {total,amount} = state.cart.reduce((cartTotal, cartItem)=>{  //NOTE:cartTotal is the object of {total,amount}
            const{price,amount} = cartItem;  //this comes from data.js

            //find the total on the UI (bottom right)
            const itemTotal = price*amount
            cartTotal.total += itemTotal

            //this will add/substract amount to the top right navbar--initial amount is 3 since we have 3 items
            cartTotal.amount += amount  
            return cartTotal
        },{//total and amount are accumulators (first values)
            total: 0,
            amount:0
        })
        //fix the total number to two numbers after the .
        total = parseFloat(total.toFixed(2))   //parseFloat(string) converts to string and return a floating point number
        return{...state,total,amount}  
    }

    //for API:
    if(action.type === "LOADING"){
        return {...state, loading:true}
    }
    if(action.type === "DISPLAY_ITEMS"){
        return {...state, cart:action.payload, loading:false}   //because the cart is setting in action.payload in the "DISPLAY_ITEMS"--we add loading:false so it can show the carts
    }
    if(action.type === "TOGGLE_AMOUNT" ){
        let tempCart = state.cart.map((cartItem)=>{
            if(cartItem.id === action.payload.id){
                //check the type (increase /decrease)
                if(action.payload.type === "inc"){
                    return ({
                        // an cartItem increase and others are the same
                        ...cartItem,
                        amount: cartItem.amount+1
                    })
                }if(action.payload.type === "dec"){
                    return({
                        ...cartItem,
                        amount: cartItem.amount-1
                    })
                }
            }else{
                return cartItem
            }
        })   //in tempCart we check if the value is increasing or decreasing
        .filter((cartItem) =>cartItem.amount !== 0)   //it's not showing the items more than 0
        return{...state,cart:tempCart}
    }
    //throw an error so if some dispatch is not familiar it gives us an error-E.g. if we add dispatch({type:"RANDOM"}) in context.js then it gives us this type error 
    throw new Error("no matching action type") 
}

export default reducer