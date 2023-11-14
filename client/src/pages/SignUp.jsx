import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      } else {
        alert("Account Created Successfully");
        setLoading(false);
        navigate("/signin");
      }
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] text-[16px] max-w-[500px] h-[80vh] flex flex-col justify-center items-center gap-5 m-auto"
    >
      <h3 className="font-bold text-[22px]">Sign Up</h3>
      <p>{error && error}</p>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleChange}
        required
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-[90%] p-3 rounded-md border-none outline-none"
      />
      <button
        disabled={loading}
        type="submit"
        className="w-[90%] p-3 rounded-md bg-[#324054] hover:bg-[#324054]/90 uppercase text-white"
      >
        {loading ? "Loading" : "Sign Up"}
      </button>
      <OAuth />
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
