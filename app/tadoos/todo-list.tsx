"use client";

import { useUser } from "@supabase/auth-helpers-react";

import * as Data from "@lib/index";
import { useEffect, useState } from "react";
import { delay } from "@lib/helpers";
import { useTodoStore } from "./store";

export const TodoList = () => {
  const user = useUser();
  const { activeTodos, historyTodos, setActiveTodos, setHistoryTodos } =
    useTodoStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingId, setEditingId] = useState<number>(0);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    fetchTodos();

    // refresh when tab is visible
    const visibilitychange = () => {
      if (!document.hidden) {
        fetchTodos();
      }
    };

    document.addEventListener("visibilitychange", visibilitychange);

    return () => {
      document.removeEventListener("visibilitychange", visibilitychange);
    };
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const user_id = user?.id;
      const { data, error } = await Data.getActiveTodos(user_id);
      if (error) throw error;
      setActiveTodos(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (title: string) => {
    try {
      setLoading(true);
      const user_id = user!.id;
      const { data, error } = await Data.createTodo({ user_id, title });
      if (error) throw error;
      setActiveTodos([data, ...activeTodos]);
      setNewTodo("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number, title: string) => {
    try {
      setLoading(true);
      const { error } = await Data.updateTodo({ id, title });
      if (error) throw error;
      const updatedTodos = activeTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      });
      setActiveTodos(updatedTodos);
      setEditingId(0);
      setEditingText("");
      setLoading(false);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const completeTodo = async (id: number) => {
    await delay(100);
    try {
      setLoading(true);
      const { error } = await Data.completeTodo(id);
      if (error) throw error;
      const todo = activeTodos.find((t) => t.id === id);
      if (!todo) throw new Error(`Todo not found: ${id}`);
      todo.completed_at = new Date().toISOString();
      setHistoryTodos([todo, ...historyTodos]);
      const filteredTodos = activeTodos.filter((todo) => todo.id !== id);
      setActiveTodos(filteredTodos);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const archiveTodo = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await Data.archiveTodo(id);
      if (error) throw error;
      const todo = activeTodos.find((t) => t.id === id);
      if (!todo) throw new Error(`archiveTodo: Todo not found: ${id}`);
      const newTodo = { ...todo };
      newTodo.completed_at = new Date().toISOString();
      newTodo.archived = true;
      setHistoryTodos([newTodo, ...historyTodos]);
      const filteredTodos = activeTodos.filter((t) => t.id !== id);
      setActiveTodos(filteredTodos);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleEditingTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.trim();
    if (e.key === "Enter" && text) {
      createTodo(text);
    }
  };

  const handleEditingKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.trim();
    if (e.key === "Enter" && text) {
      updateTodo(editingId, text);
    }
  };

  const handleEditingBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.trim();
    if (text) {
      updateTodo(editingId, text);
    }
  };

  const handleEditingClick = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleArchiveClick = (id: number) => {
    archiveTodo(id);
  };

  const handleNewTodoClick = () => {
    const text = newTodo.trim();
    if (text) {
      createTodo(text);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="p-1">
        <div className="w-full flex justify-between items-center">
          <h4>Active</h4>
          {loading ? <progress className="progress w-4"></progress> : null}
        </div>
        <div className="pt-4 w-full flex item-center space-x-2">
          <div className="w-6"></div>
          <input
            className="input input-xs w-full max-w-xs"
            placeholder="New todo"
            value={newTodo}
            onChange={handleNewTodoChange}
            onKeyDown={handleNewTodoKeyDown}
          />
          <button
            className="btn btn-primary btn-xs"
            onClick={handleNewTodoClick}
          >
            Add
          </button>
        </div>
      </div>
      <div className="py-2 px-4">
        <ul>
          {activeTodos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-1">
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                onClick={() => completeTodo(todo.id)}
              />
              <input
                className="input input-xs flex-1"
                value={editingId === todo.id ? editingText : todo.title || ""}
                onChange={handleEditingTextChange}
                onKeyDown={handleEditingKeyDown}
                onBlur={handleEditingBlur}
                onFocus={() => handleEditingClick(todo.id, todo.title || "")}
              />
              <button onClick={() => handleArchiveClick(todo.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
