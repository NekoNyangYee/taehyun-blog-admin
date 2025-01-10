"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@components/lib/supabaseClient";
import { Session } from "@supabase/supabase-js"; // Supabase 타입 임포트

interface SessionContextProps {
  session: Session | null; // 정확한 타입으로 변경
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextProps>({
  session: null,
  isLoading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null); // 타입 지정
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();

    // 세션 상태 변경 감지
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}