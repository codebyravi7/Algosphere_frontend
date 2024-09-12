import useLogin from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./login.css";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <Link
          to={"/register"}
          className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
        >
          Not Registered Yet?
        </Link>
        <button
          className="btn btn-block btn-sm mt-2 border border-slate-700"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
