import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Guitar from './components/Guitar'
import { db } from './db/data'
import useCart from './hooks/useCart'

function App() {
  const [data] = useState(db)
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal
  } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        cartTotal={cartTotal}
      />
      <main className='container-xl mt-5'>
        <h2 className='text-center'>Nuestra Colección</h2>
        <div className='row mt-5'>
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
