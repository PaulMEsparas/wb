import { useState } from "react";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isloading } = useSignUp();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, password);
    if (signUp) {
      setEmail("");
      setPassword("");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form className="signUp" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <div className="signUpPassword">
        <label>Password: </label>
        {password.length > 0 ? (
          <span className="material-symbols-outlined" onClick={togglePassword}>
            {passwordShown ? "visibility" : "visibility_off"}
          </span>
        ) : null}
        <input
          type={passwordShown ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <button disabled={isloading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
