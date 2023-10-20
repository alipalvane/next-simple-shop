import Link from 'next/link'
import { useSelector } from 'react-redux'

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart)

  return (
    <header className='container m-auto p-4'>
      <nav className='flex justify-between items-center h-12 border-b-2 border-slate-500'>
        <Link href='/' className='text-lg'>
          Headphone Market
        </Link>
        <div className='border border-slate-500 px-2 py-1 rounded-lg bg-slate-900'>
          <span className='px-2'>
            ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
          </span>
          <Link href='/cart'>سبد خرید</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
