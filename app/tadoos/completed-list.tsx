"use client";

import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import * as Data from "@lib/index";
import { Todo } from "@lib/types";
import { useTodoStore } from "./store";

export const CompletedList = () => {
  const user = useUser();
  const { historyTodos, setHistoryTodos } = useTodoStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const user_id = user?.id;
      const { data, error } = await Data.getCompletedTodos(user_id);
      if (error) throw error;
      setHistoryTodos(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="p-1 flex justify-between items-center">
        <h4 className="mb-0">History</h4>
        {loading ? <progress className="progress w-4"></progress> : null}
      </div>
      <div className="p-4">
        <ul>
          {historyTodos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="checkbox checkbox-xs"
                checked={todo.completed_at && !todo.archived ? true : false}
                disabled
              />
              <div className={`flex-1 ${todo.archived ? "line-through" : ""}`}>
                {todo.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
