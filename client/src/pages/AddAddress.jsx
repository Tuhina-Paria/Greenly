import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AddAddress = () => {
  const { navigate } = useAppContext();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const saveAddress = () => {
    const empty = Object.values(address).some((v) => v.trim() === "");
    if (empty) {
      alert("All fields are required!");
      return;
    }
    console.log("New Address Saved:", address);
    navigate("/cart");
  };

  const fields = [
    { name: "fullName", placeholder: "Full Name" },
    { name: "phone", placeholder: "Phone Number" },
    { name: "street", placeholder: "House No, Area, Street" },
    { name: "city", placeholder: "City" },
    { name: "state", placeholder: "State" },
    { name: "country", placeholder: "Country" },
    { name: "pincode", placeholder: "Pincode" },
  ];

  return (
    <div className="max-w-sm mx-auto mt-22 p-4 rounded-xl shadow-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100">
      <h2 className="text-lg font-semibold text-green-800 mb-4 text-center">
        Add New Address
      </h2>

      <div className="space-y-2">
        {fields.map(({ name, placeholder }) => (
          <input
            key={name}
            type="text"
            name={name}
            placeholder={placeholder}
            value={address[name]}
            onChange={handleChange}
            className="w-full border border-green-300 px-3 py-1.5 rounded-md bg-white/90 text-sm outline-none shadow-sm focus:ring-2 focus:ring-green-500"
          />
        ))}
      </div>

      <div className="flex justify-between mt-5 gap-3">
        <button
          onClick={saveAddress}
          className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 hover:shadow-md transition-all duration-200"
        >
          Save Address
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="flex-1 border border-green-600 text-green-600 py-2 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
