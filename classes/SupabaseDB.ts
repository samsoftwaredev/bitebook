import { AuthResponse, createClient } from '@supabase/supabase-js';

import { NAV_APP_LINKS, NAV_MAIN_LINKS } from '@/constants/nav';
import type { Database } from '@/interfaces/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

class SupabaseDB {
  constructor() {}
  get() {
    return supabase;
  }
  getProfiles = () => {
    return supabase.from('profiles');
  };
  updatePassword = async (newPassword: string) => {
    return await supabase.auth.updateUser({ password: newPassword });
  };
  resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + NAV_MAIN_LINKS.updatePassword.link,
    });
  };
  logOut = async () => await supabase.auth.signOut();
  logIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };
  signUp = async (userInput: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    genderMale: boolean;
  }): Promise<AuthResponse> => {
    const redirectTo =
      window.location.origin + NAV_APP_LINKS.app.link + '?newUser=true';
    return await supabase.auth.signUp({
      email: userInput.email,
      password: userInput.password,
      options: {
        data: {
          display_name: `${userInput.firstName} ${userInput.lastName}`,
        },
        emailRedirectTo: redirectTo,
      },
    });
  };
}

const db = new SupabaseDB();

export { db, supabase };
