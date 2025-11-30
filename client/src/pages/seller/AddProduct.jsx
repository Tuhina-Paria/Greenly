import React, { useState } from "react";
import { categories, exploreCategories, assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { axios } = useAppContext();

  // Merge categories and exploreCategories without duplicates by 'path'
  const mergedCategories = [...categories];
  exploreCategories.forEach((exploreCat) => {
    if (!mergedCategories.some((cat) => cat.path === exploreCat.path)) {
      mergedCategories.push(exploreCat);
    }
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading before request

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          formData.append("images", files[i]);
        }
      }

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form fields
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false); // Stop loading after request
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between ">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        {/* Upload Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 ">
            {Array(4)
              .fill("")
              .map((_, index) => (
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
                    className="max-w-24 cursor-pointer border rounded border-gray-500/40"
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
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
            required
          >
            <option value="">Select Category</option>
            {mergedCategories.map((item, index) => (
              <option key={index} value={item.path}>
                {item.text || item.path}
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
              min={0}
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
              min={0}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
