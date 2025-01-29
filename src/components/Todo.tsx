import { DeleteOutlined } from "@mui/icons-material";

export type ToDoProps = {
  todoItem: TodoItem;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  editTodo: (id: number) => void;
  setTodos: (todos: any) => any;
  todoList?: TodoItem[];
};

const Todo = ({
  todoItem,
  editTodo,
  removeTodo,
  completeTodo,
  setTodos,
  todoList,
}: ToDoProps) => {
  return (
    <>
      <div className="todo">
        <div
          className="text"
          style={{ textDecoration: todoItem.isCompleted ? "line-through" : "" }}
        >
          <h4>{todoItem.title}</h4>
          <p></p>
          <div className="category">
            <p>({todoItem.category})</p>
          </div>
        </div>
        <div className="button" style={{ display: "flex" }}>
          <button className="edit" onClick={() => editTodo(todoItem.id)}>
            editar
          </button>
          <button className="complete" onClick={() => completeTodo(todoItem.id)}>
            concluído
          </button>
          <button
            className="remove"
            onClick={() => {
              removeTodo(todoItem.id);
              const filteredTodos = todoList ? todoList.filter((t: any) => t.id !== todoItem.id) : [];
              console.log("removendo tarefa: " + todoItem.id);
              setTodos(filteredTodos);
            }}
          >
            <DeleteOutlined fontSize="medium" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
