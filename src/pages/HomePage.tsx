import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SearchForm from "../components/SearchForm";
import VideoList from "../components/VideoList";
import Dashboard from "../components/Dashboard";
import { searchChannelsAndVideos } from "../services/api"; // Ajusta la importación

const HomePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSearchResult = async (query: string) => {
    try {
      const { videos } = await searchChannelsAndVideos(query);
      setSearchResult(videos);
    } catch (error) {
      console.error("Error al obtener canales y videos:", error);
    }
  };

  return (
    <div>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <SearchForm onSearchResult={handleSearchResult} />
          <VideoList videos={searchResult} />
          <Dashboard />
        </>
      )}
    </div>
  );
};

export default HomePage;
