// Create a new React component/page EditAddress.jsx:

// Grab the address id from URL params.

// Fetch that address from backend /api/address/get or have a /api/address/:id endpoint.

// Show form with fields (street, city, state, country, pincode).

// On submit, send data to /api/address/update endpoint.

// On success, redirect back to cart or address list.


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const EditAddress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data } = await axios.post("/api/address/get");
        if (data.success) {
          const address = data.addresses.find((a) => a._id === id);
          if (address) {
            setFormData({
              street: address.street,
              city: address.city,
              state: address.state,
              country: address.country,
              pincode: address.pincode,
            });
          } else {
            toast.error("Address not found");
            navigate("/cart");
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchAddress();
  }, [id, axios, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/address/update", {
        addressId: id,
        ...formData,
      });

      if (data.success) {
        toast.success("Address updated successfully");
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-12 mt-20">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
          Edit Address
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="w-1/2 mr-2 px-4 py-3 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 ml-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
