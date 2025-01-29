import { useState } from "react";

export type AddTodoFormProps = {
  addTodo: (title: string, category: string) => void;
}

const ToDoForm = ({ addTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !category) {
      return;
    }

    addTodo(title, category);

    setTitle("");
    setCategory("");
  };

  return (
    <>
      <div className="todo-form">
        <h2>Adicionar tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="digite aqui a tarefa..."
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="hobby">Hobby</option>
            <option value="personal">Personal</option>
          </select>
          <button className="" type="submit" value="Adicionar">
              Criar Tarefa
            </button>
          <div>
            
          </div>
        </form>
      </div>
    </>
  );
};

export default ToDoForm;
