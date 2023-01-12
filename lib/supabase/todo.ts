import { Todo } from "@lib/types";
import { supabase } from "./supabase";

export const getActiveTodos = async (user_id?: string) => {
  return await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user_id)
    .is("completed_at", null)
    .order("id", { ascending: false });
};

export const getCompletedTodos = async (user_id?: string) => {
  return await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user_id)
    .not("completed_at", "is", null)
    .order("id", { ascending: false });
};

export const createTodo = async (user_id: string, title: string) => {
  return await supabase
    .from("todos")
    .insert({ user_id, title })
    .select()
    .single();
};

export const updateTodo = async (id: number, title: string) => {
  return await supabase
    .from("todos")
    .update({ title })
    .eq("id", id)
    .select()
    .single();
};

export const completeTodo = async (id: number) => {
  return await supabase
    .from("todos")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
};

export const archiveTodo = async (id: number) => {
  return await supabase
    .from("todos")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
};
