type Todo = {
  id: number;
  title: string;
  category: string;
  isCompleted?: boolean;

};

type ToDoForm = {
  title?: string;
  category?: string;
  isCompleted?: boolean;
  };

type TodoList = {
  todos: Todo[];
};
