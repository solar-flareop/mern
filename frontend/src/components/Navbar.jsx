import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  const { user } = useAuthContext();
  return (
    <header>
      <div className="container">
        <Link to="/">Workout Buddy</Link>
      </div>
      <nav>
        {user ? (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
