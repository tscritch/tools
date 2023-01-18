import { supabase } from "./supabase";

export const getUserLabels = async (user_id?: string) => {
  return await supabase
    .from("labels")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: false });
};

export const createLabel = async (user_id: string, title: string) => {
  return await supabase
    .from("labels")
    .insert({ user_id, title })
    .select()
    .single();
};

export const updateLabel = async (id: number, title: string) => {
  return await supabase
    .from("labels")
    .update({ title })
    .eq("id", id)
    .select()
    .single();
};
