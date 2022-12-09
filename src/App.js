import React from 'react'
import { useGlobalContext } from './context'

// components
import Navbar from './Navbar'
import CartContainer from './CartContainer'

function App() {
  const{loading} = useGlobalContext()
  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  //once we receive the data we have the lines below
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
