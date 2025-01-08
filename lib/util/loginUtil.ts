import { supabase } from "@components/lib/supabaseClient";
import { UserDataSession } from "@components/types/auth";
import dayjs from "dayjs";

export const newAddAdmin = async <T extends UserDataSession>(userDataSession: T): Promise<void> => {
    try {
        const nowInKorea: string = dayjs().format();

        // 기존 데이터 조회
        const { data: existingData, error: fetchError } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", userDataSession.id)
            .single();

        if (fetchError) {
            console.log("기존 데이터 조회 에러:", fetchError.message);
        }

        // `is_admin` 값 유지 (기존 데이터가 있으면 유지, 없으면 기본값 false)
        const isAdmin = existingData?.is_admin ?? false;

        // 데이터 삽입 또는 업데이트
        const { error } = await supabase.from("profiles").upsert(
            {
                id: userDataSession.id,
                is_admin: isAdmin,
                nickname: userDataSession.name,
                last_login: nowInKorea,
                profile_image: userDataSession.profile,
                created_at: nowInKorea,
            },
            { onConflict: "id" } // `id`가 이미 있으면 업데이트
        );

        if (error) {
            console.log("newAddAdmin 삽입/업데이트 에러:", error.message);
        }
    } catch (err) {
        console.log("newAddAdmin 예외 발생:", err);
    }
};