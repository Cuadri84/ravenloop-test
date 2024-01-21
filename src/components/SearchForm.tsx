import React, { useState } from "react";
import { searchChannels } from "../services/api";
import { BallTriangle } from "react-loader-spinner";

interface SearchFormProps {
  onSearchResult: (channels: any[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchResult }) => {
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const channels = await searchChannels(channelName);
      onSearchResult(channels);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      {loading ? (
        <div className="loader-container">
          <BallTriangle color="#00ff00" />
        </div>
      ) : (
        <>
          <h1 className="search-container__h1">Search Channel</h1>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-container__input"
            autoFocus
          />
          <button
            onClick={handleSearch}
            className="search-container__search-button"
            disabled={loading}
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
};

export default SearchForm;
