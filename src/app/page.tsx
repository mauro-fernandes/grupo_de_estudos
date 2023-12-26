"use client";

import { useState } from "react";
import Todo from "../components/Todo";
import ToDoForm from "@/components/ToDoForm";
import Search from "@/components/Search";
import Image from "next/image";
import Filter from "@/components/Filter";

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Fazer café",
      category: "home",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Estudar React",
      category: "work",
      isCompleted: true,
    },
    {
      id: 3,
      title: "Estudar React Native",
      category: "work",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Estudar Node",
      category: "work",
      isCompleted: false,
    },

    {
      id: 5,
      title: "Estudar Typescript",
      category: "work",
      isCompleted: false,
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");

  const addTodo = (title: string, category: string) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        title,
        category,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setTodos(filteredTodos);
  };

  const completeTodo = (id: number) => {
    const newTodos = [...todos];
    newTodos.map((todo) =>
      todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo
    );
    setTodos(newTodos);
    console.log(todos);
  };

  return (
    <>
      <div className="app">
        <h1>Pra Fazê !</h1>
        <h4>Meu 1º Front-End!</h4>
        {/* <Image
          src="/grupo_de_estudos/src/img/check-list.png/"
          alt="Picture of the author"
          width={100}
          height={500}
        /> */}
        <ToDoForm addTodo={addTodo} />
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort}/>
        <div className="todo-list">
          <h2>Lista de afazeres:</h2>

          {todos.length ? (
            todos
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
                sort=== "Asc" 
                  ? a.title.localeCompare(b.title) 
                  : b.title.localeCompare(a.title))
              .map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  removeTodo={removeTodo}
                  completeTodo={completeTodo}
                />
              ))
          ) : (
            <div>
              <h4> Não há tarefas! </h4>
              <p>Crie..</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
