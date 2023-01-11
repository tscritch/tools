"use client";

import { Auth } from "@supabase/ui";
import { useState } from "react";
import { supabase } from "../../lib/initSupabase";

interface Props {
  children: React.ReactNode;
}

export function AuthWrapper({ children }: Props) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <AuthLogin>{children}</AuthLogin>
    </Auth.UserContextProvider>
  );
}

export const AuthLogin = ({ children }: Props) => {
  const { user, session } = Auth.useUser();
  const [authView, setAuthView] = useState<any>("sign_in");

  if (!user) {
    return (
      <div className="px-6 flex items-center justify-center h-full w-[calc(100%-3rem)]">
        <Auth
          supabaseClient={supabase}
          onlyThirdPartyProviders
          providers={["github"]}
          view={authView}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </div>
    );
  }

  return <>{children}</>;
};
