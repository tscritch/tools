import { supabase } from "./supabase";

export const getUserLabels = async (user_id?: string) => {
  return await supabase
    .from("labels")
    .select("*")
    .eq("user_id", user_id)
    .order("id", { ascending: false });
};

export const createLabel = async (user_id: string, text: string) => {
  return await supabase
    .from("labels")
    .insert({ user_id, text })
    .select()
    .single();
};

export const updateLabel = async (id: number, text: string) => {
  return await supabase
    .from("labels")
    .update({ text })
    .eq("id", id)
    .select()
    .single();
};
