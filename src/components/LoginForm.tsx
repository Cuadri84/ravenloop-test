import React, { useState } from "react";
import ravenImage from "../assets/raven.png";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-container__box">
        <img src={ravenImage} alt="raven" className="login-container__raven" />
        <h1 className="login-container__sign-in-text">Sign In</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="login-container__input"
        />

        <div className="login-container__error-container">
          {error && <p className="login-container__error">{error}</p>}
        </div>

        <button onClick={handleLogin} className="login-container__login-box">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
