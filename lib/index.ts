import * as SB_Todo from "./supabase/todo";
import * as SB_Label from "./supabase/labels";

export const getActiveTodos = async (user_id?: string) => {
  return await SB_Todo.getActiveTodos(user_id);
};

export const getCompletedTodos = async (user_id?: string) => {
  return await SB_Todo.getCompletedTodos(user_id);
};

interface CreateTodo {
  user_id: string;
  title: string;
}
export const createTodo = async (todo: CreateTodo) => {
  return await SB_Todo.createTodo(todo.user_id, todo.title);
};

interface UpdateTodo {
  id: number;
  title: string;
}

export const updateTodo = async (todo: UpdateTodo) => {
  return await SB_Todo.updateTodo(todo.id, todo.title);
};

export const completeTodo = async (todo_id: number) => {
  return await SB_Todo.completeTodo(todo_id);
};

export const archiveTodo = async (todo_id: number) => {
  return await SB_Todo.archiveTodo(todo_id);
};

// labels
export const getUserLabels = async (user_id?: string) => {
  return await SB_Label.getUserLabels(user_id);
};

interface CreateLabel {
  user_id: string;
  title: string;
}
export const createLabel = async (label: CreateLabel) => {
  return await SB_Label.createLabel(label.user_id, label.title);
};

interface UpdateLabel {
  id: number;
  title: string;
}
export const updateLabel = async (label: UpdateLabel) => {
  return await SB_Label.updateLabel(label.id, label.title);
};
