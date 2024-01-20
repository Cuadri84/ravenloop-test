import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SearchForm from "../components/SearchForm";
import VideoList from "../components/VideoList";
import Dashboard from "../components/Dashboard";
import { getVideosByChannelId } from "../services/api";

const HomePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("dateDesc");
  const resultsPerPage = 5;

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSearchResult = async (channels: any[]) => {
    if (channels.length > 0) {
      try {
        const videos = await getVideosByChannelId(channels[0].id.channelId);
        setSearchResult(videos);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error al obtener videos del canal:", error);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  const paginatedResults = searchResult.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <div>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <SearchForm onSearchResult={handleSearchResult} />
          <VideoList videos={paginatedResults} />
          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Anterior
            </button>
            <span>Página {currentPage}</span>
            <button
              disabled={currentPage * resultsPerPage >= searchResult.length}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Siguiente
            </button>
          </div>

          <div>
            <label>Ordenar por:</label>
            <select onChange={(e) => handleSortChange(e.target.value)}>
              <option value="dateDesc">Fecha Descendente</option>
              <option value="dateAsc">Fecha Ascendente</option>
              <option value="moreViews">Más Vistas</option>
              <option value="lessViews">Menos Vistas</option>
            </select>
          </div>
          <Dashboard />
        </>
      )}
    </div>
  );
};

export default HomePage;
