import { Auth } from "@supabase/ui";
import { supabase } from "../../lib/initSupabase";
import "./../style.css";

interface Props {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: Props) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      {children}
    </Auth.UserContextProvider>
  );
}
