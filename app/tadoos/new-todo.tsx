// new todo input

import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import * as Data from "@lib/index";
import { useLabelStore, useTodoStore } from "./store";
import { useFresh } from "@lib/hooks/useFresh";

export const NewTodo = () => {
  const user = useUser();
  const [newTodo, setNewTodo] = useState<string>("");
  const [labelId, setLabelId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const { activeTodos, setActiveTodos } = useTodoStore();
  const { labels, setLabels } = useLabelStore();

  useFresh(async () => {
    try {
      setLoading(true);
      const user_id = user!.id;

      const { data, error } = await Data.getUserLabels(user_id);
      if (error) throw error;
      setLabels(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  });

  const createTodo = async (title: string) => {
    try {
      setLoading(true);
      const user_id = user!.id;
      const { data, error } = await Data.createTodo({
        user_id,
        title,
        label_id: labelId ? Number(labelId) : undefined,
      });
      if (error) throw error;
      setActiveTodos([data, ...activeTodos]);
      setNewTodo("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.trim();
    if (e.key === "Enter" && text) {
      createTodo(text);
    }
  };

  const handleNewTodoClick = () => {
    const text = newTodo.trim();
    if (text) {
      createTodo(text);
    }
  };

  return (
    <div className="pt-4 w-full flex item-center space-x-2">
      <div className="input-group input-group-xs">
        <input
          className="input input-xs w-full max-w-xs"
          placeholder="New todo"
          value={newTodo}
          onChange={handleNewTodoChange}
          onKeyDown={handleNewTodoKeyDown}
        />
        <select
          className="select select-xs"
          value={labelId}
          onChange={(e) => setLabelId(e.target.value)}
        >
          <option disabled selected>
            Label
          </option>
          {labels.map((label) => (
            <option key={label.id} value={label.id}>
              {label.text}
            </option>
          ))}
        </select>
      </div>
      <button
        className={`btn btn-primary btn-xs ${loading ? "loading" : ""}`}
        onClick={handleNewTodoClick}
      >
        {loading ? "" : "Add"}
      </button>
    </div>
  );
};
