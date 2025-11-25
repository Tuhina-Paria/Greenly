import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setIsLoggedIn, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login"); // "login" or "register"
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleFormClick = (e) => e.stopPropagation();

  // Toggle handlers that also clear form inputs
  const toggleToLogin = () => {
    setState("login");
    setName("");
    setEmail("");
    setPassword("");
  };

  const toggleToRegister = () => {
    setState("register");
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = state === "register"
        ? { name, email, password }
        : { email, password };

      const { data } = await axios.post(`/api/user/${state}`, payload);

      if (data.success) {
        setUser(data.user);
        setIsLoggedIn(true);
        setShowUserLogin(false);
        navigate("/");
        toast.success(`${state === "login" ? "Logged in" : "Registered"} successfully!`);

        // Clear form fields after success
        setName("");
        setEmail("");
        setPassword("");
      } else {
        // If login fails because user does not exist, suggest signup
        if (state === "login" && data.message === "User does not exist") {
          toast.error("User not found. Please sign up.");
          setState("register");  // Switch to signup form
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 z-50"
    >
      <form
        onClick={handleFormClick}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-start px-8 py-8 w-80 sm:w-[340px] text-gray-700 rounded-2xl shadow-2xl border border-gray-100 bg-white"
      >
        <p className="text-2xl font-semibold m-auto mb-2">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full relative">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Full Name"
              className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full relative">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200"
            type="email"
            required
          />
        </div>

        <div className="w-full relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all duration-200"
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition-all text-white font-medium text-sm w-full py-2.5 rounded-lg shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>

        <p className="text-sm text-center w-full mt-2">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={toggleToLogin}
                className="text-primary cursor-pointer font-medium hover:underline"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={toggleToRegister}
                className="text-primary cursor-pointer font-medium hover:underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
