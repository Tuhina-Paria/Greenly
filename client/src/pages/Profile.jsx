import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, axios, setUser } = useAppContext();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Load user details when user updates
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPreviewImage(user.image || null);
    }
  }, [user]);

  // Update Profile Handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      if (image) formData.append("image", image);

      const { data } = await axios.put("/api/user/update-profile", formData);

      if (data.success) {
        toast.success("Profile updated!");
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 mt-18">
      <div className="w-full max-w-xl">

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-10">
          My Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="relative">

              <img
                src={previewImage || assets.profile_icon}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-md bg-white"
              />

              <label className="absolute bottom-1 right-1 bg-green-600 text-white text-xs cursor-pointer px-3 py-1 rounded-full shadow">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block font-semibold text-green-800 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 
              focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-green-800 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 
              focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>

         

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg bg-green-600 
            hover:bg-green-700 transition shadow-md ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
