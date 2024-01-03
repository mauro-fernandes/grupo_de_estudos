export type ToDoProps = {
  todo: Todo;
  removeTodo: (id: number) => void;
  completeTodo : (id: number) => void;
  editTodo: (id: number) => void;
};

const Todo = ({ todo, editTodo, removeTodo, completeTodo }: ToDoProps) => {
  
  return (
    <>
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        <div className="text">
          <h4>{todo.title}</h4>
          <p></p>
          <div className="category">
            <p>({todo.category})</p>
          </div>
        </div>
        <div className="button">
          <button className="edit" onClick={() => editTodo(todo.id)}>editar</button>
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
