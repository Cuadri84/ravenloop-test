import React, { useState } from "react";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //Here verifies the CEO password
    if (password === "1234") {
      onLogin();
    } else {
      alert("Acceso no autorizado");
    }
  };

  return (
    <div className="login-container">
      <div className="login-container__box">
        <h1 className="login-container__sign-in-text">CEO</h1>
        <h1 className="login-container__sign-in-text">Sign In</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
