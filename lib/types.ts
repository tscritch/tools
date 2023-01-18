import { Database } from "@lib/database.types";

export type Table_Todos = Database["public"]["Tables"]["todos"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
export type Label = Database["public"]["Tables"]["labels"]["Row"];
