import { supabase } from "@components/lib/supabaseClient";
import { redirect } from "next/navigation";
import { useAuthStore } from "./store/authStore";

export default async function Home() {
  const setSession = useAuthStore((state) => state.storeSession);

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  } else {
    setSession(session);
  }

  return (
    <>
      <h1>ddddddd</h1>
    </>
  );
}
