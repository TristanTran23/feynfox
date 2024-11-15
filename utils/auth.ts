import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { useUserStore } from "../state/stores/userStore";

export const insertNewUser = async (session: Session) => {
  const { data, error } = await supabase.from("users").insert([
    {
      id: session.user.id,
      created_at: new Date(),
      email: session.user.email,
    },
    ])
    .select("*")
    .single();

  return { data, error };
};

export const signInUserWithToken = async (token: string) => {
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: token,
  });

  return { data, error };
};

export const userExists = async (userId: string) => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);
  
  const user = users?.length ? users[0] : null;

  return { user, error };
};

export const updateUser = async (session: Session) => {
  const { data, error } = await supabase
    .from("users")
    .update({ email: session.user.email })
    .eq("id", session.user.id)
    .select("*");

  return { user: data, error };
};

export const checkAndUpdateUser = async (session: Session | null) => {
  if (!session) {
    return;
  }
  let checkUser: any;
  console.log("Checking and updating user...");
  try {
    console.log(session.user.id);
    const { user, error } = await userExists(session.user.id);

    if (error) {
      console.error("Error checking user:", error.message);
      return;
    }

    checkUser = user;

    console.log("Fetched user:", user);

    if (!user) {
      console.log("User not found, inserting new user...");

      const { data , error: insertError } = await insertNewUser(session);

      if (insertError) {
        console.error("Error adding user:", insertError.message);
        return;
      }

      checkUser = data;
      console.log("Inserted new user:", user);
    } else {
      console.log("User found, updating user...");
      const { user: updatedUser, error: updateError } =
        await updateUser(session);

      if (updateError) {
        console.error("Error updating user:", updateError.message);
        return;
      }
      checkUser = updatedUser?.length ? updatedUser[0] : null;
      console.log("Updated user:", checkUser);
    }

    if (!checkUser) {
      console.error("User is null after database operations.");
      return;
    }

    console.log("User data set in store:", checkUser);
    useUserStore.getState().setUser(checkUser);
  } catch (error: any) {
    console.error("Unexpected error:", error);
  }
};
