import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const userName = user?.email.substring(0, user.email.indexOf("@"));

  const handleLogoutClick = () => logout();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {userName && (
            <div>
              <span>{userName}</span>
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
          {!userName && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signUp">SignUp</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
