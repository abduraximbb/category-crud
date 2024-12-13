import { request } from "@/api";
import React from "react";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/token-slice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let user = Object.fromEntries(formData);

    request.post("/auth/signup-admin", user).then((res) => {
      dispatch(signIn(res.data.access_token));
      navigate("/admin");
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-blue-700 flex items-center justify-center text-gray-100">
      <div className="bg-gray-800 text-gray-100 p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
          Create an Account
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Sign up to access the admin dashboard.
        </p>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              name="name"
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
          </div>
          <div>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition duration-200 font-bold"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
