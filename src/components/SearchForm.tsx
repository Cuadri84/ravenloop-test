import React, { useState } from "react";
import { searchChannels } from "../services/api";

interface SearchFormProps {
  onSearchResult: (channels: any[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchResult }) => {
  const [channelName, setChannelName] = useState("");

  const handleSearch = async () => {
    try {
      const channels = await searchChannels(channelName);
      onSearchResult(channels);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-container__h1">Search Channel</h1>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-container__input"
      />
      <button
        onClick={handleSearch}
        className="search-container__search-button"
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchForm;
