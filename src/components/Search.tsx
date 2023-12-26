

const Search = ({ search, setSearch }: any) => {
  return (
    <div className="search">
      <h2>Pesquisar:</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="digite para pesquisar..."
      />
    </div>
  );
};

export default Search;
