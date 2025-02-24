import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";

import LoginGif from "../assets/LoginGif.gif";
import { useAuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";


const Login = () => {
  const navigate = useNavigate();
  const { userLogin, loading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await userLogin(email, password);
      navigate("/");
      toast.success("Login Successful");
      
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="lg:max-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-around gap-10 bg-base-100 rounded-xl shadow-lg p-8 overflow-hidden">
        <div className="flex flex-col justify-center items-center">
          <img
            src={LoginGif}
            alt="Login"
            className="lg:max-h-[400px] w-auto object-contain"
          />
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline btn-error mt-5 w-full transform hover:scale-105 transition duration-300 hover:!text-white"
          >
            <FaHome size={18} /> Back to Home
          </button>
        </div>

        <div className="w-full max-w-md bg-base-200 border border-gray-500 rounded-xl shadow-md p-6 flex flex-col justify-around">
          <h2 className="text-3xl font-bold text-center">
            Welcome to
            <div>
              <span className="text-success">BD</span>
              <span className="text-error">_Pay</span>
            </div>
          </h2>

          <p className="text-sm text-center">Please login to your account.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email or Mobile
              </label>
              <input
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full mt-1"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-outline hover:!text-white w-full mt-6"
            >
                {/* Login */}
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* <div className="divider text-sm text-gray-400">OR</div>
          <SocialLogin /> */}

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-success font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
