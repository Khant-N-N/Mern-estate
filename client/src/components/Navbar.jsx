import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="flex justify-around items-center py-3 bg-[var(--sec)]">
      <Link to="/" className="text-[var(--text1)]">
        Logo
      </Link>
      <div>
        <input
          type="text"
          name="searchbox"
          placeholder="search"
          className="border-none outline-none py-2 px-3 w-24 sm:w-64 rounded-lg text-[16px]"
        />
      </div>
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
