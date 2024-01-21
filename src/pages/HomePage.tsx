import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SearchForm from "../components/SearchForm";
import VideoList from "../components/VideoList";
import Dashboard from "../components/Dashboard";
import { getVideosByChannelId } from "../services/api";

const HomePage: React.FC = () => {
  // Component states
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption] = useState<string>("dateDesc");
  const [hasSearched, setHasSearched] = useState(false); // New state
  const resultsPerPage = 6;

  // Login handler
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Pagination click handler
  const handlePaginationClick = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Search result handler
  const handleSearchResult = async (channels: any[]) => {
    if (channels.length > 0) {
      try {
        const videos = await getVideosByChannelId(channels[0].id.channelId);
        setSearchResult(videos);
        setCurrentPage(1);
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching videos from channel:", error);
      }
    }
  };

  // Paginated results
  const paginatedResults = searchResult.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div
      className={`home-container ${
        !hasSearched ? "home-container__center" : "home-container__top"
      }`}
    >
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <SearchForm onSearchResult={handleSearchResult} />{" "}
          {hasSearched && (
            <>
              <Dashboard videos={paginatedResults} />
              <VideoList videos={paginatedResults} />
              <div className="home-container__pagination">
                <button
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => handlePaginationClick(currentPage - 1)}
                >
                  PREVIOUS
                </button>

                <button
                  className="pagination-button"
                  disabled={currentPage * resultsPerPage >= searchResult.length}
                  onClick={() => handlePaginationClick(currentPage + 1)}
                >
                  NEXT
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
