import React from "react";

type Props = {
  todos: any
              };

const PendingTasks = (props: Props) => {
  console.log(props.todos);
  const pending = props.todos.filter((todo: any) => !todo.isCompleted).length;

  return (
    <div>
      { pending === 0 && <h4>🥳Parabéns, nenhuma pendência!🥳</h4> }
      { pending > 0 && <h4>Tarefas incompletas: {pending}</h4>
      }
    </div>
  );
};

export default PendingTasks;
