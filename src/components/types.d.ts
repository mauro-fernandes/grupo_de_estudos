type TodoProps = {
  id: number;
  title: string;
  category: string;
  isCompleted?: boolean;
};

type ToDoFormProps = {
  title: string;
  category: string;
  isCompleted: boolean;

};

type TodoListProps = {
  todos: Todo[];
};