import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SearchForm from "../components/SearchForm";
import VideoList from "../components/VideoList";
import Dashboard from "../components/Dashboard";
import { getVideosByChannelId } from "../services/api";

const HomePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSearchResult = async (channels: any[]) => {
    if (channels.length > 0) {
      try {
        const videos = await getVideosByChannelId(channels[0].id.channelId);
        setSearchResult(videos);
      } catch (error) {
        console.error("Error al obtener videos del canal:", error);
      }
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
