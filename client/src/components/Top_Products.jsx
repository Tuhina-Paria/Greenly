import React from 'react'
import Productcard from './ProductCard'

const Top_Products = () => {
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Our Top Products</p>
      <div>
<Productcard/>
      </div>
    </div>
  )
}

export default Top_Products
