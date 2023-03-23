import React, { useState } from "react";

function SearchBox() {
  const [search, setSearch] = useState("");

  return (
    <div className="SearchComp">
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBox;
