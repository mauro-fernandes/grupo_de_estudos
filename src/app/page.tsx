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


export const API = "http://localhost:3333";




export default function App() {
  
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [loading, setloading] = useState(false);

  
  useEffect(() => {
    
    const loadData = async () => {
    setloading(true);
    const response = await fetch(API + "/todos")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error))
    .finally(() => console.log("finalizado"));

    setloading(false);
    setTodos(response);
    console.log(response);
  };
  loadData();
  }
  , []);

  if (todos === undefined) {
    return <p>Carregando...</p>
  }

  const addTodo = async (title: string, category: string) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 10000),
        title,
        category,
        isCompleted: false,
      },
    ];
    
    await fetch(API + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category }),
    });
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
        <Image
          className="logo"
          src="/check-list.png"
          alt="Picture of the author"
          width={100}
          height={100}
        />
        <h1>Pra Fazê !</h1>

        <h4>Meu 1º Front-End!</h4>
        <ToDoForm addTodo={addTodo} />
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

        <div className="todo-list">
          <h2>Lista de afazeres:</h2>
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
                removeTodo={removeTodo}
                completeTodo={completeTodo}
              />
            ))}
          {todos.length === 0 && (
            <div>
              <h4> Não há tarefas! </h4>
              <p>Crie..</p>
              <MyImage />
            </div>
          )}
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
