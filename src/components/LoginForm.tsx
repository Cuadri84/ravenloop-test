import React, { useState } from "react";
import ravenImage from "../assets/raven.png";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  // State for password input and error handling
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handler for login button click
  const handleLogin = () => {
    if (password === "raven") {
      onLogin();
    } else {
      setError("Unauthorized Access");

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  // Handler for Enter key press in the password input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-container__box">
        {/* Raven image */}
        <img src={ravenImage} alt="raven" className="login-container__raven" />

        {/* Sign-in text */}
        <h1 className="login-container__sign-in-text">Sign In</h1>

        {/* Password input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="login-container__input"
        />

        {/* Error container */}
        <div className="login-container__error-container">
          {error && <p className="login-container__error">{error}</p>}
        </div>

        {/* Login button */}
        <button onClick={handleLogin} className="login-container__login-box">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
