"use client";

import * as Data from "@lib/index";
import { Todo } from "@lib/types";
import { Auth } from "@supabase/ui";
import { useEffect, useState } from "react";

export const TodoList = () => {
  const { user } = Auth.useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number>(0);
  const [editingText, setEditingText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const user_id = user?.id;
      const { data, error } = await Data.getActiveTodos(user_id);
      if (error) throw error;
      setTodos(data);
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
      setTodos([...todos, data]);
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
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditing(false);
      setEditingId(0);
      setEditingText("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      const { error } = await Data.deleteTodo(id);
      if (error) throw error;
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
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
    setEditing(true);
    setEditingId(id);
    setEditingText(text);
  };

  const handleDeleteClick = (id: number) => {
    deleteTodo(id);
  };

  const handleNewTodoClick = () => {
    const text = newTodo.trim();
    if (text) {
      createTodo(text);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="p-4">
        <h1>Tadoos</h1>
        <div className="flex items-center">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            placeholder="New todo"
            value={newTodo}
            onChange={handleNewTodoChange}
            onKeyDown={handleNewTodoKeyDown}
          />
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNewTodoClick}
          >
            Create
          </button>
        </div>
      </div>
      <div className="p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center">
                {editing && editingId === todo.id ? (
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={editingText}
                    onChange={handleEditingTextChange}
                    onKeyDown={handleEditingKeyDown}
                    onBlur={handleEditingBlur}
                  />
                ) : (
                  <div className="flex-1">{todo.title}</div>
                )}
                <button
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditingClick(todo.id, todo.title || "")}
                >
                  Edit
                </button>
                <button
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteClick(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
