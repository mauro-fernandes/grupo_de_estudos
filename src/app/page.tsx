"use client";

import Filter from "@/components/Filter";
import Logo from "@/components/Logo";
import MyImage from "@/components/MyImageCompnt";
import PendingTasks from "@/components/PendingTasks";
import Search from "@/components/Search";
import ToDoForm from "@/components/ToDoForm";
import ApiFail from "@/components/apiFail";
import Image from "next/image";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";

export const API = "http://localhost:3333";

export default function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const response = await fetch(API + "/todos")
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
          console.log(error);
          setTodoList([]);
        })
        .finally(() => console.log("finally fetch todos"));

      setTodoList(response);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddTodo = async (title: string, category: string) => {
    const todoItem = {
      id: todoList ? todoList.length + 1 : 1,
      title,
      category,
      isCompleted: false,
    };

    const updatedTodoList = todoList ? [...todoList, todoItem] : [todoItem];
    await fetch(API + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    });
    setFilter("All");
    setSearch("");
    setTodoList(updatedTodoList);
  };

  const handleRemoveTodo = async (id: number) => {
    const newTodos = todoList ? [...todoList] : [];
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    return filteredTodos;
    // setTodos(filteredTodos);
  };

  const handleCompleteTodo = async (id: number) => {
    const newTodos = todoList ? [...todoList] : [];
    newTodos.map(async (todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
        await fetch(API + "/todos/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, isCompleted: todo.isCompleted }),
        });
      } else todo = todo;
    });
    setTodoList(newTodos);
  };

  // TODO: Editar tarefa
  const handleEditTodo = async (id: number) => {
    const newTodos = todoList ? [...todoList] : [];
    newTodos.map(async (todo) => {
      if (todo.id === id) {
        todo.title = todo.title;
        todo.category = todo.category;
        await fetch(API + "/todos/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title: todo.title,
            category: todo.category,
          }),
        });
      } else todo = todo;
    });
    setTodoList(newTodos);
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center" }}>
        <Image
          src="/check-list.png"
          alt=""
          width={300}
          height={300}
          priority={true}
        />
        <br />
        Carregando...
      </p>
    );
  }

  if (todoList === undefined) {
    return (
      <p style={{ textAlign: "center" }}>
        <ApiFail />
      </p>
    );
  }

  return (
    <>
      {!loading && todoList && (
        <div className="p-10 app">
          <h1>
            <Logo /> Pra Fazê !
          </h1>
          <h5 style={{ textAlign: "right" }}>( Meu 1º Front-End ! )</h5>
          <ToDoForm addTodo={handleAddTodo} />
          <Filter
            filter={filter}
            setFilter={setFilter}
            setSort={setSort}
            todos={todoList}
            setTodos={setTodoList}
            handleRemoveTodo={handleRemoveTodo}
          />
          <div className="todo-list">
            <Search search={search} setSearch={setSearch} />
            <div className="todo-panel">
              <h2>Lista de afazeres:</h2>
              <div>
                <PendingTasks todoList={todoList} />
              </div>
            </div>

            {todoList?.length === 0 && (
              <div>
                <h4> Não há tarefas! </h4>
                <p>Crie..</p>
                <MyImage />
              </div>
            )}
            {todoList
              .filter((todo) => {
                if (filter === "All") {
                  return todo;
                } else if (filter === "Completed") {
                  return todo.isCompleted;
                } else if (filter === "Incomplete") {
                  return !todo.isCompleted;
                }
              })
              .filter((todo) =>
                todo.title.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) =>
                sort === "Asc"
                  ? a.title.localeCompare(b.title)
                  : b.title.localeCompare(a.title)
              )
              .map((todo) => (
                <Todo
                  key={todo.id}
                  todoItem={todo}
                  removeTodo={handleRemoveTodo}
                  setTodos={setTodoList}
                  todoList={todoList}
                  completeTodo={handleCompleteTodo}
                  editTodo={() => console.log("editando")}
                />
              ))}
          </div>
          {/* <MyHooks />
          <List />
          <RenderCond x={5} y={10} className="box" />
          <MyFragment divtype={"box"} />
          <MyContainer>
            <h3>Este é o filho do Container!</h3>
              </MyContainer>*/}
        </div>
      )}
    </>
  );
}
