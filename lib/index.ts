import * as SB_Todo from "./supabase/todo";

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
