"use client";

import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import * as Data from "@lib/index";
import { Todo } from "@lib/types";
import { Checkbox } from "@components/checkbox";
import { Input } from "@components/input";
import { Button } from "@components/button";

export const CompletedList = () => {
  const user = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
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
      setTodos(data);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="p-1">
        <h4 className="mb-0">History</h4>
      </div>
      <div className="p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center">
                <Checkbox checked={true} />
                <div className="flex-1">{todo.title}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
