import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../utils/AppContextProvider";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", { username, password });

      loginState(response.data.user, response.data.token);

      const role = response.data.user.role;

      alert(`${role} logged in successfully`);

      if (role === "host" || role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/locations");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to login.");
    }
  };

  return (
    <div className="pr-4">
      <Navbar />
      <form onSubmit={handleLogin} className="text-center text-xs w-75 mx-auto">
        <h1 className="text-2xl mt-20">Login</h1>
        <div className="flex items-start gap-1 flex-col w-full mt-13">
          <label className="text-blue-700 hover:cursor-pointer">Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="rounded border p-2 w-full"
          />
        </div>
        <div className="flex items-start gap-1 flex-col w-full mt-10">
          <label className="text-blue-700 hover:cursor-pointer">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="rounded border p-2 w-full"
          />
        </div>
        <p className="mt-10 text-blue-700 hover:cursor-pointer">
          Forgot Password?
        </p>
        <button
          type="submit"
          className="mt-5 p-2 rounded text-white bg-blue-600 w-45 hover:cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
