"use client";

import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import ToDoForm from "@/components/ToDoForm";
import Search from "@/components/Search";
import Image from "next/image";
import Filter from "@/components/Filter";
import MyImage from "@/components/MyImageCompnt";
import MyHooks from "@/components/MyHooks";
import List from "@/components/List";
import RenderCond from "@/components/RenderCond";
import MyFragment from "@/components/MyFragment";
import MyContainer from "@/components/MyContainer";
import Logo from "@/components/Logo";

export const API = "http://localhost:3333";

export default function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const loadData = async () => {
      const response = await fetch(API + "/todos")
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log(error))
        .finally(() => console.log("Sempre executa"));

      setTodos(response);
      setloading(false);
    };
    loadData();
  }, []);

  const handleAddTodo = async (title: string, category: string) => {
    const todo = {
      id: todos.length + 1,
      title,
      category,
      isCompleted: false,
    };

    const newTodos = [...todos, todo];

    await fetch(API + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos(newTodos);
  };

  const handleRemoveTodo = async (id: number) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });
    setTodos(filteredTodos);
  };

  const handleCompleteTodo = async (id: number) => {
    const newTodos = [...todos];
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
    setTodos(newTodos);
  };

  const handleEditTodo = async (id: number) => {
    const newTodos = [...todos];
    newTodos.map(async (todo) => {
      if (todo.id === id) {
        todo.title = todo.title;
        todo.category = todo.category;
        await fetch(API + "/todos/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, title: todo.title, category: todo.category }),
        });
      } else todo = todo;
    });
    setTodos(newTodos);
  };

  if (loading || !todos || !todos.length) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="app">
        <Logo />
        <h1>Pra Fazê !</h1>
        <h4>Meu 1º Front-End!</h4>
        <ToDoForm addTodo={handleAddTodo} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

        <div className="todo-list">
          <h2>
            Lista de afazeres:
            <Search search={search} setSearch={setSearch} />
          </h2>

          {todos.length == 0 && (
            <div>
              <h4> Não há tarefas! </h4>
              <p>Crie..</p>
              <MyImage />
            </div>
          )}
          {todos
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
                todo={todo}
                removeTodo={handleRemoveTodo}
                completeTodo={handleCompleteTodo}
                editTodo={ handleEditTodo}
              />
            ))}
        </div>
        <MyHooks />
        <List />
        <RenderCond x={5} y={10} />
        <MyFragment />
        <MyContainer>
          <h3>Este é o filho do Container!</h3>
        </MyContainer>
      </div>
      <Image src="/check-list.png" alt="" width={300} height={300} />
    </>
  );
}
