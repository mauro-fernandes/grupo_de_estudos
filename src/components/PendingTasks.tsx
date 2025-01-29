
type Props = {
  todoList: TodoItem[];
              };

const PendingTasks = (props: Props) => {
  console.log(props.todoList);
  const pending = props.todoList.filter((todo: TodoItem) => !todo.isCompleted).length;

  return (
    <div>
      { pending === 0 && <h4>🥳Parabéns, nenhuma pendência!🥳</h4> }
      { pending > 0 && <h4>Tarefas incompletas: {pending}</h4>
      }
    </div>
  );
};

export default PendingTasks;
