import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] text-[16px] max-w-[500px] h-[80vh] flex flex-col justify-center items-center gap-5 m-auto"
    >
      <h3 className="font-bold text-[22px]">Sign Up</h3>
      <input
        type="text"
        name="username"
        placeholder="username"
        required
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
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
        Sign Up
      </button>
      <button
        type="button"
        className="w-[90%] p-3 rounded-md bg-[#b81b1b] hover:bg-[#b81b1b]/90 uppercase text-white"
      >
        Continue with google
      </button>
      <p>
        Have an account?{" "}
        <Link to="/signin" className="text-[#0055ff] mx-2">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
