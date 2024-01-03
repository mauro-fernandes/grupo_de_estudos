import React from "react";
export type SearchProps = {
  search: string;
  setSearch: (search: string) => void;
};

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="digite para pesquisar..."
      />
    </>
  );
};

export default Search;
