import React, { useState } from "react";
import { searchChannels } from "../services/api";
import { BallTriangle } from "react-loader-spinner";

interface SearchFormProps {
  onSearchResult: (channels: any[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchResult }) => {
  // State for channel name input and loading state
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler for search button click
  const handleSearch = async () => {
    try {
      setLoading(true);

      // Call API to search channels
      const channels = await searchChannels(channelName);
      onSearchResult(channels);
    } catch (error) {
      console.error("Error in search:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handler for Enter key press in the channel name input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      {loading ? (
        // Loading spinner
        <div className="loader-container">
          <BallTriangle color="#00ff00" />
        </div>
      ) : (
        // Search form
        <>
          <h1 className="search-container__h1">Search Channel</h1>

          {/* Channel name input */}
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-container__input"
            autoFocus
          />

          {/* Search button */}
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
