import type { CartItem, Guitar } from '../types'
import Nav from './Nav'

type HeaderProps = {
  cart: CartItem[]
  removeFromCart: (id: Guitar['id']) => void
  increaseQuantity: (id: Guitar['id']) => void
  decreaseQuantity: (id: Guitar['id']) => void
  clearCart: () => void
  cartTotal: number
}
export default function Header({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  cartTotal
}:HeaderProps) {
  return (
    <header className='py-5 px-5 header'>
      <div className='container-xl'>
        <div className='row justify-content-center justify-content-md-between'>
          <div className='col-8 col-md-3'>
            <a href='index.html'>
              <img
                className='img-fluid'
                src='./img/logo.svg'
                alt='imagen logo'
              />
            </a>
          </div>
          <Nav
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
            cartTotal={cartTotal}
          />
        </div>
      </div>
    </header>
  )
}
