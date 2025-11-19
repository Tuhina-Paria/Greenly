import React, { useState } from "react";
import { categories, assets } from "../../assets/assets.js";


const AddProduct = () => {
  const [files, setFiles] = useState([]);          
  const [name, setName] = useState("");            
  const [price, setPrice] = useState("");          
  const [offerPrice, setOfferPrice] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [category, setCategory] = useState("");     
  const [loading, setLoading] = useState(false);    

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Example: show data
    console.log({
      name,
      price,
      offerPrice,
      description,
      category,
      files,
    });

    setLoading(false);
  };   // <-- FIXED: Function properly closed

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between ">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        
        {/* Upload Images */}
        <div >
          <p className="text-base font-medium ">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 ">
            {Array(4).fill("").map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  hidden
                  id={`image${index}`}
                  accept="image/*"
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />

                <img
                  className="max-w-24 cursor-pointer border rounded  border-gray-500/40"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="upload_area"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Product Name</label>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">Product Description</label>
          <textarea
            rows={4}
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          ></textarea>
        </div>

        {/* Category */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.path}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium">Product Price</label>
            <input
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium">Offer Price</label>
            <input
              type="number"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};   

export default AddProduct;   
