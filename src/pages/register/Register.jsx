import "./register.css";
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

export default function Register() {
  	const [inputs, setInputs] = useState({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
      setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await signup(inputs);
    };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>FullName</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your fullName..."
          value={inputs.fullName}
          onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        />
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <label>Confirm Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Confirm your password..."
          value={inputs.confirmPassword}
          onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
        />
        <GenderCheckbox
          onCheckboxChange={handleCheckboxChange}
          selectedGender={inputs.gender}
        />
        <Link
          to={"/login"}
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          href="#"
        >
          Already have an account?
        </Link>
        <button
          className="btn btn-block btn-sm mt-2 border border-slate-700"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
}
