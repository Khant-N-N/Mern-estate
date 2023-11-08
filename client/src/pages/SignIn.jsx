import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] text-[16px] max-w-[500px] h-[80vh] flex flex-col justify-center items-center gap-5 m-auto"
    >
      <h3 className="font-bold text-[22px]">Sign In</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <button
        type="submit"
        className="w-[90%] p-3 rounded-md bg-[#324054] hover:bg-[#324054]/90 uppercase text-white"
      >
        Sign in
      </button>
      <button
        type="button"
        className="w-[90%] p-3 rounded-md bg-[#b81b1b] hover:bg-[#b81b1b]/90 uppercase text-white"
      >
        Continue with google
      </button>
      <p>
        Don't Have an account?{" "}
        <Link to="/signup" className="text-[#0055ff] mx-2">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
