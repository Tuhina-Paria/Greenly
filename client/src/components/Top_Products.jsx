import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const Top_Products = () => {
  const {products}=useAppContext();
  return (
   <div className="mt-16 text-center px-4">
  <h2 className="text-3xl font-extrabold text-green-700 mb-6 tracking-wide">
    Top Products
  </h2>
  <div className="w-24 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>

  <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
    {products.slice(0, 10).map((p, index) => (
      <ProductCard key={index} product={p} />
    ))}
  </div>
</div>

  )
}

export default Top_Products
