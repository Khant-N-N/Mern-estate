import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../features/user";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDemo = () => {
    setFormData({
      email: "sad@gmail.com",
      password: "123456",
    });
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] text-[16px] max-w-[500px] h-[80vh] flex flex-col justify-center items-center gap-5 m-auto"
    >
      <h3 className="font-bold text-[22px]">Sign In</h3>
      <p className="text-red-500">{error && error}</p>
      <button
        onClick={handleDemo}
        className="p-3 bg-[#324054] hover:bg-[#324054]/90 text-white rounded"
      >
        Demo Account
      </button>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        required
        onChange={handleChange}
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        required
        onChange={handleChange}
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <button
        disabled={loading}
        type="submit"
        className="w-[90%] p-3 rounded-md bg-[#324054] hover:bg-[#324054]/90 uppercase text-white"
      >
        {loading ? "Loading..." : "Sign in"}
      </button>
      <button
        type="button"
        className="w-[90%] p-3 rounded-md bg-[#b81b1b] hover:bg-[#b81b1b]/90 uppercase text-white"
      >
        Continue with google
      </button>
      <p>
        Don&apos;t Have an account?{" "}
        <Link to="/signup" className="text-[#0055ff] mx-2">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
