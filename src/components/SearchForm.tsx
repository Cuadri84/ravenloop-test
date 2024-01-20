import React, { useState } from "react";
import { searchChannelsAndVideos } from "../services/api";

interface SearchFormProps {
  onSearchResult: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchResult }) => {
  const [channelName, setChannelName] = useState("");

  const handleSearch = async () => {
    try {
      const { videos } = await searchChannelsAndVideos(channelName);
      onSearchResult(videos);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return (
    <div>
      <label>Nombre del Canal:</label>
      <input
        type="text"
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchForm;
