import { supabase } from "@components/lib/supabaseClient";
import { UserDataSession, DataSession } from "@components/types/auth";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

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


export const checkAdmin = async (userDataSession: UserDataSession): Promise<boolean> => {
    try {
        // Supabase 쿼리 실행
        const { data: isAdminData, error } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", userDataSession.id);

        // 에러가 발생하면 로그 출력
        if (error) {
            console.error("관리자 체크 쿼리 에러:", error.message);
            throw new Error("관리자 체크 쿼리 실패");
        }

        // 로그 출력 (쿼리 결과)
        console.log("isAdminData 결과:", isAdminData);

        // 데이터가 없거나 잘못된 경우 처리
        if (!isAdminData || isAdminData.length === 0) {
            console.error("유저 데이터가 존재하지 않음 또는 잘못된 쿼리.");
            await supabase.auth.signOut();
            redirect("/auth/login");
            return false;
        }

        // 관리자 여부 확인
        if (isAdminData[0].is_admin) {
            console.log("관리자 권한 있음");
            return true;
        } else {
            console.error("관리자 권한 없음");
            await supabase.auth.signOut();
            redirect("/auth/login");
            return false;
        }
    } catch (err) {
        // 예외 처리 및 디버깅 로그
        console.error("checkAdmin 예외 발생:", err);
        await supabase.auth.signOut();
        redirect("/auth/login");
        return false;
    }
};
