import { supabase } from "@components/lib/supabaseClient";
import { UserDataSession } from "@components/types/auth";
import dayjs from "dayjs";

interface UserData {
    id: string;
    is_admin: boolean;
    nickname: string;
    last_login: string;
    profile_image: string;
    created_at?: string;
}

export const newAddAdmin = async <T extends UserDataSession>(userDataSession: T): Promise<void> => {
    try {
        const nowInKorea: string = dayjs().format();

        // 1. 기존 사용자 데이터 조회
        const { data: existingData, error: fetchError } = await supabase
            .from("profiles")
            .select("is_admin, created_at")
            .eq("id", userDataSession.id)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") { // "PGRST116"은 데이터 없음 오류
            console.error("기존 데이터 조회 에러:", fetchError.message);
            return;
        }

        // 2. `is_admin` 상태 유지, 새 사용자는 기본값 false
        const isAdmin = existingData?.is_admin ?? false;

        // 3. 데이터 삽입 또는 업데이트
        const payload: Partial<UserData> = {
            id: userDataSession.id,
            nickname: userDataSession.name,
            profile_image: userDataSession.profile,
            is_admin: isAdmin, // 기존 상태 유지
            last_login: nowInKorea, // 로그인 시간 업데이트
        };

        // 최초 사용자라면 `created_at` 필드 추가
        if (!existingData) {
            payload["created_at"] = nowInKorea;
        }

        const { error: upsertError } = await supabase
            .from("profiles")
            .upsert(payload, { onConflict: "id" }); // 기존 데이터가 있으면 업데이트

        if (upsertError) {
            console.error("데이터 삽입/업데이트 중 에러:", upsertError.message);
        } else {
            console.log("프로필 데이터 추가/업데이트 성공:", payload);
        }
    } catch (err) {
        console.error("newAddAdmin 함수 실행 중 에러:", err);
    }
};