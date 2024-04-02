import { useEffect, useState, useMemo } from 'react'
import type { CartItem, Guitar } from '../types'
const MAX_ITEMS = 5

export default function useCart() {
  const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [cart, setCart] = useState<CartItem[]>(initialCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item: Guitar) {
    const isExist = cart.findIndex((guitar) => guitar.id === item.id)
    if (isExist >= 0) {
      const cloneCart = [...cart]
      cloneCart[isExist].quantity++
      setCart(cloneCart)
    } else {
      const newItem:CartItem = {...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }
  function removeFromCart(id: Guitar['id']) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id))
  }
  function increaseQuantity(id: Guitar['id']) {
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity <= MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }
  function decreaseQuantity(id: Guitar['id']) {
    const updateCart = cart.map((guitar) => {
      if (guitar.id === id && guitar.quantity > 1) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }
  function clearCart() {
    setCart([])
  }
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  )
  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal
  }
}
