import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      setError(null);
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      data.success === false ? setError(data.message) : navigate("/");
    } catch (error) {
      setError(error.message);
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
