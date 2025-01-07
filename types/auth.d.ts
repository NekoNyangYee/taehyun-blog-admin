export interface UserDataSession {
    id: string;
    name: string;
    email: string;
    profile: string;
    provider: "google" | "kakao";
}

export interface DataSession {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}