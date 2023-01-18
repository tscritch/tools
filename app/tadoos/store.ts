// zustand store for todos
// active todos and history todos are stored separately

"use client";
import { Label, Todo } from "@lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TodoStore {
  activeTodos: Todo[];
  historyTodos: Todo[];
  setActiveTodos: (todos: Todo[]) => void;
  setHistoryTodos: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        activeTodos: [],
        historyTodos: [],
        setActiveTodos: (todos: Todo[]) => set({ activeTodos: todos }),
        setHistoryTodos: (todos: Todo[]) => set({ historyTodos: todos }),
      }),
      {
        name: "todo-store",
      }
    )
  )
);

interface LabelStore {
  labels: Label[];
  setLabels: (labels: Label[]) => void;
}

export const useLabelStore = create<LabelStore>()(
  devtools(
    persist(
      (set) => ({
        labels: [],
        setLabels: (labels: Label[]) => set({ labels }),
      }),
      {
        name: "label-store",
      }
    )
  )
);
