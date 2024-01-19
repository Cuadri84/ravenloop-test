import React, { useState } from "react";

const SearchForm: React.FC = () => {
  const [channelName, setChannelName] = useState("");

  const handleSearch = () => {
    console.log(channelName);
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
