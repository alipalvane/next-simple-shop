import Image from 'next/image'
import Link from 'next/link'

import AddToCart from './AddTocart'

function ProductItem({ product }) {
  return (
    <div className='rounded-lg bg-slate-900 m-5'>
      <Image
        src={product.image}
        width={400}
        height={400}
        className='rounded-t-lg object-cover w-full'
      />
      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.id}`}>
          <h2 className='text-lg'>{product.title}</h2>
        </Link>
        <p className='mt-2 rtl text-slate-300'>{product.price} تومان</p>
        <AddToCart product={product} />
      </div>
    </div>
  )
}

export default ProductItem
