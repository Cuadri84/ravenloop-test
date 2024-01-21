import React, { useState } from "react";
import ravenImage from "../assets/raven.png";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //Here verifies the CEO password
    if (password === "raven") {
      onLogin();
    } else {
      alert("Acceso no autorizado");
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

        <button onClick={handleLogin} className="login-container__login-box">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
