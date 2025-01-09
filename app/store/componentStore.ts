import { create } from "zustand";

interface ComponentStoreProps {
    activeButtonIndex: number | null;
    updateActiveButtonIndex: (buttonIndex: number | null) => void;
}

// Zustand 상태 저장소 정의
export const useComponentStore = create<ComponentStoreProps>((set) => ({
    activeButtonIndex: null, // 초기 상태
    updateActiveButtonIndex: (index) =>
        set(() => ({
            activeButtonIndex: index, // 새로운 인덱스로 상태 업데이트
        })),
}));