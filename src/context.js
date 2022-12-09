import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()


const AppProvider = ({ children }) => {
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  //since we use fetch for API we need useEffect with empty [] since we want to receive data one time
  useEffect(()=>{
    fetchData()
  },[])

  const toggleAmount = (id,type) =>{  //type means what we are doing (increase or decrease)
    dispatch({type:"TOGGLE_AMOUNT",payload:{id,type}})  //in this function payload is an object
  }

  //define initialState of the state
  const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount:0  //the top right amount on the UI
  }

  const [state,dispatch] = useReducer(reducer, initialState)
  //remove all the items
  const clearCart = () =>{
    dispatch({type:"CLEAR_CART"})
  }

  //remove each item--we need id to remove each item--we need to pass id to some name, we chose playload for name
  const remove = (id) =>{
    dispatch({type:"REMOVE", payload:id})
  }

  //cart in state is constantly change
  useEffect(()=>{
    dispatch({type:'GET_TOTALS'})
  },[state.cart])
      
  return (
    <AppContext.Provider
    // ... is used because we should transfer all the object properties too
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
