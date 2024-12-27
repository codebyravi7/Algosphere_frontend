import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../../public/logo.png";
import registerImage from "../../../public/login1.png"; // Assuming a registration image

export default function Register() {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useAuthContext();
  const [isAccepted, setIsAccepted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (gender) => {
    setInputs((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAccepted) {
      await signup(inputs);
    } else {
      alert("Please accept the terms and conditions");
    }
  };

  return (
    <div className="pt-20 bg-gray-50 dark:bg-gray-800 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Sidebar Section */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-r from-gray-800 to-gray-600 p-8 text-white md:w-1/3">
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Create Your Account</h4>
            <p className="text-sm">
              Welcome to our Portfolio Manager! Start managing your coding
              profiles and showcase your skills effectively.
            </p>
            <h4 className="text-lg font-semibold">Join Us Today</h4>
            <p className="text-sm">
              Track your progress and streamline your development journey all in
              one place!
            </p>
          </div>
          <div className="mt-8">
            <img
              src={registerImage}
              alt="Register"
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
            {[
              {
                label: "Name",
                name: "fullName",
                type: "text",
                placeholder: "Enter your name",
              },
              {
                label: "Email",
                name: "email",
                type: "text",
                placeholder: "Enter your email",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Enter your password",
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm your password",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="text-sm mb-2 block">{label}</label>
                <div className="relative">
                  <input
                    name={name}
                    type={type}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={placeholder}
                    value={inputs[name]}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ))}

            {/* Gender Selection */}
            <div className="flex">
              {[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ].map(({ label, value }) => (
                <div className="form-control mr-10" key={value}>
                  <label
                    className={`label gap-2 cursor-pointer ${
                      inputs.gender === value ? "selected" : ""
                    }`}
                  >
                    <span className="label-text mr-2">{label}</span>
                    <input
                      type="checkbox"
                      className="checkbox border-slate-900"
                      checked={inputs.gender === value}
                      onChange={() => handleCheckboxChange(value)}
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={isAccepted}
                onChange={() => setIsAccepted(!isAccepted)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I accept the{" "}
                <Link to="/terms" className="text-blue-600 font-semibold">
                  terms and conditions
                </Link>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-600
              ${
                loading
                  ? "bg-gray-500 cursor-wait"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {loading ? "Loading..." : "Create your Account"}
            </button>
          </div>

          <p className="text-gray-600 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in here.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
