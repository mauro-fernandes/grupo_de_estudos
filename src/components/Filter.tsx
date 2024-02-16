import React from "react";

export type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
  setSort: (sort: string) => void;
  todos: any;
  setTodos: (todos: any) => any;
  handleRemoveTodo: (id: number) => void;
};

const Filter = ({
  filter,
  setFilter,
  setSort,
  handleRemoveTodo,
  setTodos,
  todos,
}: FilterProps) => {
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
      {/* <RemoveAllCompleted value={setFilter}/> */}
      <button
        className="remove"
        onClick={async () => {
          console.log("excluindo somente as tarefas completas!");
          const newTodos = todos ? [...todos] : [];
          const nonCompletedTodos = newTodos.filter(
            (todo: any) => !todo.isCompleted
          );
          console.log("nonCompleted: " + nonCompletedTodos);
          // await
          // setTodos(nonCompletedTodos);
          const completedTodos = newTodos.filter(
            (todo: any) => todo.isCompleted
          );
          console.log("completed: " + completedTodos);

          async function deleteAllCompleted(completedTodos: any) {
            completedTodos.forEach(async (todo: any) => await handleRemoveTodo(todo.id));
            console.log(completedTodos);
            
          }
          // await setTodos();
          deleteAllCompleted(completedTodos).then(() => setTodos(nonCompletedTodos));
        }}
      >
        Excluir tarefas completas
      </button>
    </div>
  );
};

export default Filter;
