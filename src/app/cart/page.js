'use client'

import { useDispatch, useSelector } from 'react-redux'

import { removeFromCart } from '@/redux/slices/cartSlice'

function CartPage() {
  const dispatch = useDispatch()

  const { cartItems, totalPrice } = useSelector((state) => state.cart)

  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id))
  }

  return (
    <div className='container m-auto p-6 w-1/2 rounded-lg'>
      <h1 className='mb-4 text-xl text-center'>سبد خرید</h1>
      <div className='flex justify-center bg-slate-900'>
        <div className='my-10 mx-8'>
          <div className='p-6 text-xl bg-slate-800 rounded-lg'>
            مجموع قیمت: {totalPrice} تومان
          </div>
        </div>
        <div>
          <table className='min-w-full mx-4 rtl bg-slate-800 text-slate-300 rounded-lg'>
            <tbody className='p-2'>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className='p-5'>{item.title}</td>
                  <td className='p-5 text-right'>{item.price} تومان</td>
                  <td className='p-5 text-center'>
                    <button
                      className='border border-slate-500 px-2 py-1 rounded-lg bg-slate-900'
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CartPage
