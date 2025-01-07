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
            console.error("기존 데이터 조회 에러:", fetchError.message);
        }

        // `is_admin` 값 유지 (기존 데이터가 있으면 유지, 없으면 기본값 false)
        const isAdmin = existingData?.is_admin ?? false;

        // 데이터 삽입 또는 업데이트
        const { error } = await supabase.from("profiles").upsert(
            {
                id: userDataSession.id, // 유저 ID
                is_admin: isAdmin, // 기존 값을 유지하거나 기본값 false
                nickname: userDataSession.name, // 유저 이름
                last_login: nowInKorea, // 마지막 로그인 시간
                profile_image: userDataSession.profile, // 프로필 이미지
                created_at: nowInKorea, // 생성 시간
            },
            { onConflict: "id" } // `id`가 이미 있으면 업데이트
        );

        if (error) {
            console.error("newAddAdmin 삽입/업데이트 에러:", error.message);
        }
    } catch (err) {
        console.error("newAddAdmin 예외 발생:", err);
    }
};