import React, { useEffect } from 'react'
import { Session } from '@supabase/supabase-js';
import { 
  userExists,
  updateUser,
  insertNewUser,
} from 'utils/auth';
import { supabase } from 'utils/supabase';
import { useUserStore } from 'state/stores/userStore';
import { useRouter } from 'next/navigation';

const AuthCallback = () => {
  const router = useRouter()

  useEffect(() => {
    const checkAndUpdateUser = async (session: Session | null) => {
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

        if (!user) {
          console.log("User not found, inserting new user...");
          const { data, error: insertError } = await insertNewUser(session);

          if (insertError) {
            console.error("Error adding user:", insertError.message);
            return;
          }

          checkUser = data;
        } else {
          console.log("User found, updating user...");
          const { user: updatedUser, error: updateError } =
            await updateUser(session);

          if (updateError) {
            console.error("Error updating user:", updateError.message);
            return;
          }
          checkUser = updatedUser?.length ? updatedUser[0] : null;
        }

        if (!checkUser) {
          console.error("User is null after database operations.");
          return;
        }

        useUserStore.getState().setUser(checkUser);
        router.push('/dashboard'); // or wherever you want to redirect after login
      } catch (error: any) {
        console.error("Unexpected error:", error);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAndUpdateUser(session);
    });
  }, [router]);

  return (
    <div>Loading...</div>
  ); // You might want to add a proper loading state here
};

export default AuthCallback;