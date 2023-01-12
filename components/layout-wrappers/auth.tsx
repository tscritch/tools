"use client";

import { Auth } from "@supabase/auth-ui-react";
import { useUser, SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../../lib/supabase/supabase";

interface Props {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: Props) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <AuthLogin>{children}</AuthLogin>
    </SessionContextProvider>
  );
}

export const AuthLogin = ({ children }: Props) => {
  const user = useUser();

  if (!user) {
    return (
      <div className="px-6 flex items-center justify-center h-full w-[calc(100%-3rem)]">
        <Auth
          supabaseClient={supabase}
          onlyThirdPartyProviders
          providers={["github"]}
          view={"sign_in"}
          socialLayout="horizontal"
        />
      </div>
    );
  }

  return <>{children}</>;
};
