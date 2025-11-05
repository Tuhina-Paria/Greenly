import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className='mt-20 flex flex-col items-center text-center'>
      <h2 className="text-2xl sm:text-3xl font-bold text-green-700">
        All Products
      </h2>
      <div className="w-20 sm:w-24 h-1 bg-green-500 mt-2 rounded-full"></div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter(product => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        ) : (
          <p className="text-gray-500 text-lg mt-6">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
