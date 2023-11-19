import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.get("searchTerm") !== null &&
      setSearchTerm(urlParams.get("searchTerm"));
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === null) return;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <nav className="flex justify-around items-center py-3 bg-[var(--sec)] z-40">
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
          className="border-none outline-none py-2 px-3 w-36 sm:w-64 rounded-lg text-[16px]"
        />
        <button type="submit">
          <FaSearch className="absolute right-3 top-[0.7rem]" />
        </button>
      </form>
      <div className="flex gap-3 items-center">
        <div className="relative md:hidden cursor-pointer">
          <GiHamburgerMenu
            className="text-[22px]"
            onClick={() => setMenu(!menu)}
          />
          <div
            className={`${
              menu ? "bottom-[-7rem]" : "bottom-0"
            } flex flex-col gap-3 z-[-1] absolute right-0 bg-[--sec] p-3 rounded transition-all`}
          >
            <NavLink
              to="/"
              onClick={() => setMenu(false)}
              className={({ isActive }) =>
                isActive ? "text-[var(--text1)]" : "text-[var(--text2)]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenu(false)}
              className={({ isActive }) =>
                isActive ? "text-[var(--text1)]" : "text-[var(--text2)]"
              }
            >
              About
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "hidden md:inline text-[var(--text1)]"
              : "hidden md:inline text-[var(--text2)]"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "hidden md:inline text-[var(--text1)]"
              : "hidden md:inline text-[var(--text2)]"
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
