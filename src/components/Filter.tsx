import React from "react";

export type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  setSort: (sort: string) => void;
};

const Filter = ({filter, setFilter, setSort}: FilterProps) => {
  return (
    <div className="filter">
      <h2>Filtrar</h2>
      <div className="filter-options">
        <div>
          
          <h4>Status:</h4>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">Todos</option>
            <option value="Completed">Completos</option>
            <option value="Incomplete">Incompletos</option>
          </select>
        </div>
        <div>
          <h4>Ordem alfabética:</h4>
            <button onClick={() => setSort("Asc")}>{"(->)"} Asc</button>
            <button onClick={() => setSort("Desc")}>{"(<-)"}Desc</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
