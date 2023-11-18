import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams && setSearchTerm(urlParams.get("searchTerm"));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const search = async () => {
    try {
      const response = await fetch(`/api/listing/getlist/`);
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="flex justify-around items-center py-3 bg-[var(--sec)]">
      <Link to="/" className="text-[var(--text1)]">
        Logo
      </Link>
      <form onSubmit={handleSubmit} className="relative">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          name="searchbox"
          placeholder="search"
          className="border-none outline-none py-2 px-3 w-24 sm:w-64 rounded-lg text-[16px]"
        />
        <button type="submit">
          <FaSearch className="absolute right-3 top-[0.7rem]" />
        </button>
      </form>
      <div className="flex gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[var(--text1)]" : "text-[var(--text2)]"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-[var(--text1)]" : "text-[var(--text2)]"
          }
        >
          About
        </NavLink>
        {currentUser ? (
          <Link to="/account">
            <img
              src={currentUser.avatar}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </Link>
        ) : (
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "text-[var(--text1)]" : "text-[var(--text2)]"
            }
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
