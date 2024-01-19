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
    <div>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
