import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SearchForm from "../components/SearchForm";
import VideoList from "../components/VideoList";
import Dashboard from "../components/Dashboard";

const HomePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <SearchForm />
          <VideoList />
          <Dashboard />
        </>
      )}
    </div>
  );
};

export default HomePage;
