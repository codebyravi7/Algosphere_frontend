import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import logo from "../../../public/logo.png";
import loginImage from "../../../public/login1.png";
export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { loading, login } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
    navigate("/");
  };
  const handleDemo = async (e) => {
    e.preventDefault();
    await login({ email: "ravidreamer7@gmail.com", password: "123456" });
    navigate("/");
  };

  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-800 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Sidebar Section */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-r from-gray-800 to-gray-600 p-8 text-white md:w-1/3">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Login to Your Account</h4>
            <p className="text-sm">
              Welcome to our Portfolio Manager! Showcase yourself like never
              before.
            </p>
            <h4 className="text-lg font-semibold">Demo Account Enabled</h4>
            <p className="text-sm">
              Streamline your coding profiles, track progress, all in one place!
            </p>
          </div>
          {/* Placeholder Image */}
          <div className="mt-8">
            <img
              src={loginImage}
              alt="Placeholder"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Form Section */}
        <form
          className="bg-gray-50 dark:bg-gray-900 dark:text-white w-full md:w-2/3 p-8 md:px-16"
          onSubmit={handleSubmit}
        >
          <div className="mb-8 flex space-x-4 justify-center">
            <img src={logo} alt="BeLieve" className="h-8 w-auto" />
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className=" text-sm mb-2 block">email</label>
              <div className="relative">
                <input
                  name="email"
                  type="text"
                  required
                  className=" w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter email"
                  value={inputs.email}
                  onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className=" text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8">
            <button
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600
    ${loading ? "bg-gray-500 cursor-wait" : "bg-gray-800 hover:bg-gray-900"}`}
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Log in to your Account"}
            </button>
          </div>

          <div className="mt-4">
            <button
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600
    ${loading ? "bg-gray-500 cursor-wait" : "bg-green-600 hover:bg-green-900"}`}
              onClick={handleDemo}
            >
              {loading ? "Loading..." : "Use Demo Account"}
            </button>
          </div>

          <p className="text-gray-600 text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-600 font-semibold hover:underline"
            >
              Signup here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
