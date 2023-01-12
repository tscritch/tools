"use client";

import React from "react";
import { Todo } from "@lib/types";

interface Props {
  todo: Todo;
}

export const TodoItem = React.memo(({ todo }: Props) => {
  const isActive = todo.completed_at ? false : true;

  return (
    <li key={todo.id} className="flex items-center space-x-1">
      <input
        type="checkbox"
        className="checkbox checkbox-xs"
        checked={isActive}
        disabled={!isActive}
        // onClick={() => completeTodo(todo.id)}
      />
      <input
        className="input input-xs flex-1"
        // value={editingId === todo.id ? editingText : todo.title || ""}
        // onChange={handleEditingTextChange}
        // onKeyDown={handleEditingKeyDown}
        // onBlur={handleEditingBlur}
        // onFocus={() => handleEditingClick(todo.id, todo.title || "")}
      />
      <button
      // onClick={() => handleDeleteClick(todo.id)}
      >
        Delete
      </button>
    </li>
  );
});
