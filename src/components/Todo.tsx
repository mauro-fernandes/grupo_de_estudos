

const Todo = ({ todo, removeTodo, completeTodo }: any) => {
  return (
    <>
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        <div className="text"
        
        >
          <p>{todo.title}</p>
          <div className="category">
            <p>({todo.category})</p>
          </div>
        </div>
        <div className="button">
          <button className="complete" onClick={() => completeTodo(todo.id)}>
            concluído
          </button>
          <button className="remove" onClick={() => removeTodo(todo.id)}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
