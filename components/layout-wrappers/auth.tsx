"use client";

import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../../lib/supabase/supabase";

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
  const user = useUser();
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
        />
      </div>
    );
  }

  return <>{children}</>;
};
