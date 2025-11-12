import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, currency, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const product = products.find((item) => String(item._id) === String(id));

 useEffect(() => {
  if (product) {
    let productsCopy = products.slice();
    productsCopy = productsCopy.filter(
      (item) => item.category === product.category
    );
    setRelatedProducts(productsCopy.slice(0, 5)); // or remove slice if you want all
  }
}, [product, products]);



  return (
    product && (
      <div className="pt-24 md:pt-20">

        {/* 💫 Product Section */}
        <div className="flex flex-col md:flex-row gap-8 mt-8">

          {/* 🖼 Product Image + Breadcrumbs */}
          <div className="flex flex-col items-center w-full md:w-1/2">
            
            {/* 🧭 Breadcrumbs (moved here) */}
            <p className="text-gray-700 text-sm mb-4 self-start md:self-center">
              <Link to="/">Home</Link> /
              <Link to="/products"> Products</Link> /
              <Link to={`/products/${product.category.toLowerCase()}`}>
                {product.category}
              </Link>{" "}
              /
              <span className="text-primary font-medium">{product.name}</span>
            </p>

            {/* Product Image */}
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-60 h-60 object-contain rounded-lg shadow-sm border border-gray-200"
            />
          </div>

          {/* 📝 Product Info */}
          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-2xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="star"
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-4">
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500/70">
                (inclusive of all taxes)
              </span>
            </div>

            <p className="text-base font-medium mt-4">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/*...related produc*/}

        <div className="flex flex-col items-center mt-20">
   <div className="flex flex-col items-center w-max">
  <p className="text-3xl font-medium">Related Products</p>
  <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>

</div>
<div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
  {relatedProducts.map((product, index) => (
  <ProductCard key={index} product={product} />
))}

</div>
<button onClick={()=>{navigate('/products');scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 py-2.5 my-16 border rounded text-primary hover:bg-primary/50 transition ">See More</button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
