import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar bg-base-100 shadow-md rounded-box m-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
          Spellbook
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className={`btn btn-ghost rounded-btn text-lg transition-colors duration-200 ${
                location.pathname === "/" ? "bg-base-200" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className={`btn btn-ghost rounded-btn text-lg transition-colors duration-200 ${
                location.pathname === "/favorites" ? "bg-base-200" : ""
              }`}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
