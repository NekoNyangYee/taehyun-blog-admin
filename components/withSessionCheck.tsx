"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@components/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface WithUserProps {
    user: {
        id: string;
        email: string;
    };
}

const withSessionCheck = (WrappedComponent: React.ComponentType<WithUserProps>) => {
    return () => {
        const [session, setSession] = useState<Session | null>(null);
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const getSession = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
                setLoading(false);
            };

            getSession();

            const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
            });

            return () => {
                authListener.subscription.unsubscribe();
            };
        }, []);

        useEffect(() => {
            setTimeout(() => {
                if (!loading && (!session || !session.user || !session.user.email)) {
                    alert('로그인이 필요합니다.');
                    router.push('/');
                }
            }, 200);
        }, [loading, session]);

        if (loading) {
            return null;
        }

        if (!session || !session.user || !session.user.email) {
            return null;
        }

        const user = {
            id: session.user.id,
            email: session.user.email as string,
        };

        return <WrappedComponent user={user} />;
    };
};

export default withSessionCheck;
