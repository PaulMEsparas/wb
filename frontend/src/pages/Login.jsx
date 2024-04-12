import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <div>
        <label>Email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>
      <div className="loginPassword">
        <label>Password: </label>
        {/* {password && passwordShown ? (
          <span class="material-symbols-outlined" onClick={togglePassword}>
            visibility_off
          </span>
        ) : (
          <span class="material-symbols-outlined" onClick={togglePassword}>
            visibility
          </span>
        )} */}
        {password.length > 0 ? (
          <span className="material-symbols-outlined" onClick={togglePassword}>
            {passwordShown ? "visibility" : "visibility_off"}
          </span>
        ) : null}

        <input
          type={passwordShown ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="inputPassword"
          required
        />
      </div>

      <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LogIn;
