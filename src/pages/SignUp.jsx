import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";

import RegisterGif from "../assets/RegisterGif.gif";
import { useAuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { userRegister, loading } = useAuthContext();
  const axiosPublic = useAxiosPublic();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const formPin = form.pin.value;
    const nid = form.nid.value;
    const userType = form.userType.value;

    const pin = formPin + "@" + name;

    try {
      // User Registration
      const result = await userRegister(email, pin);
      console.log(result);

      // Save new user to db
      const userInfo = {
        name,
        email,
        phone,
        userType,
        pin,
        nid,
      };
      const res = await axiosPublic.post("/users", userInfo);
      if (res.data.insertedId) {
        toast.success(`Registration Successful as ${userType}!`);
        navigate("/");
      }
    } catch (error) {
        toast.error("Registration Failed! " + error?.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:max-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-around gap-10 bg-base-100 rounded-xl shadow-lg p-6 overflow-hidden">
        {/* Left Side - GIF */}
        <div className="flex flex-col justify-center items-center">
          <img
            src={RegisterGif}
            alt="Register"
            className="lg:max-h-[400px] w-auto object-contain"
          />
          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline btn-error mt-5 w-full hover:!text-white transform hover:scale-105 transition duration-300"
          >
            <FaHome size={18} /> Back to Home
          </button>
        </div>
        {/* right side */}
        <div className="w-full max-w-md bg-base-200 rounded-xl border-2 border-gray-700 shadow-md p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center ">
            Create Your Account
          </h2>
          <p className="text-sm text-center text-gray-500">
            Join us to enjoy all the features!
          </p>

          {/* Registration Form */}
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-success"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-success"
                  required
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-success"
                  required
                />
              </div>

              {/* User Type Dropdown */}
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium mb-1"
                >
                  User Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  className="select select-bordered w-full mt-1 focus:ring-2 focus:ring-success"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select User Type
                  </option>
                  <option value="User">User</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>

              {/* NID Number Input */}
              <div>
                <label className="block text-sm font-medium">NID Number</label>
                <input
                  type="number"
                  name="nid"
                  placeholder="Enter NID number"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-success"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium">Pin</label>
                <div className="relative">
                  <input
                    type={showPassword ? "number" : "password"}
                    name="pin"
                    maxLength={5}
                    minLength={5}
                    placeholder="Enter 5 digit pin"
                    className="input input-bordered w-full mt-1 focus:ring focus:ring-success"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 mt-1 right-3 flex items-center text-gray-500"
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
            </div>
            <div className="lg:flex items-center justify-between mt-6">
              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-success hover:!text-white btn-outline lg:flex-1 w-full"
              >
                {/* {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Register"
                )} */}
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-success font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
