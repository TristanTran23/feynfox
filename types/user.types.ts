import { Session } from "@supabase/supabase-js";

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;

  session: Session | null;
  setSession: (session: Session | null) => void;
};

export type User = {
    id: string | null;
    email: string | null;
    created_at: Date | null;
  };