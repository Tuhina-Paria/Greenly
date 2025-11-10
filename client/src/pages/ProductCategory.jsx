import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import {categories,exploreCategories} from '../assets/assets.js';
import ProductCard from '../components/ProductCard.jsx';

const ProductCategory = () => {
    const {products}=useAppContext();
    const {category}=useParams();
    // const searchCategory=categories.find((item)=>item.path.toLowerCase()===category)
    // 🔹 Combine both category lists
  const allCategories = [...categories, ...exploreCategories];

  // 🔹 Find the selected category in both
  const searchCategory = allCategories.find(
    (item) => item.path.toLowerCase() === category
  );
    const normalizedCategory = category.toLowerCase();

const filteredProducts = products.filter(
  (product) => product.category.toLowerCase().replace(/\s/g, '-') === normalizedCategory
);




      return (
  <div className='mt-20'>
    {searchCategory && (
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
    )}
     {filteredProducts.length>0 ?(
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
        {filteredProducts.map((product)=>(
            <ProductCard key={product._id} product={product}/>
        ))}
    </div>
  ):(
    <div className='flex items-center justify-center h-[60vh]'>
<p className='text-2xl font-medium text-primary'>No Products Found in This Category.</p>
    </div>
  )}
  </div>
 
)

}

export default ProductCategory
