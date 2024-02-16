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
  const [todos, setTodos] = useState<Todo[] | null | undefined>(null);
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
          setTodos(null);
        })
        .finally(() => console.log("finally fetch todos"));

      setTodos(response);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddTodo = async (title: string, category: string) => {
    const todo = {
      id: todos ? todos.length + 1 : 1,
      title,
      category,
      isCompleted: false,
    };

    const newTodos = todos ? [...todos, todo] : [todo];
    await fetch(API + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setFilter("All");
    setSearch("");
    setTodos(newTodos);
  };

  const handleRemoveTodo = async (id: number) => {
    const newTodos = todos ? [...todos] : [];
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
    const newTodos = todos ? [...todos] : [];
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

  // TODO: Editar tarefa
  const handleEditTodo = async (id: number) => {
    const newTodos = todos ? [...todos] : [];
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
    setTodos(newTodos);
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

  if (todos === undefined) {
    return (
      <p style={{ textAlign: "center" }}>
        <ApiFail />
      </p>
    );
  }

  return (
    <>
      {!loading && todos && (
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
            todos={todos}
            setTodos={setTodos}
            handleRemoveTodo={handleRemoveTodo}
          />
          <div className="todo-list">
            <Search search={search} setSearch={setSearch} />
            <div className="todo-panel">
              <h2>Lista de afazeres:</h2>
              <div>
                <PendingTasks todos={todos} />
              </div>
            </div>

            {todos?.length === 0 && (
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
                  setTodos={setTodos}
                  todos={todos}
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
