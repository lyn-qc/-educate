import { atom, useAtom } from 'jotai'
import { getItem, setItem } from '@/utils/localStorageWrapper'

// localStorage 键名
const CONVERSATION_ID_KEY = 'selected_conversation_id';
const SWITCH_FLAG_KEY = 'inference_mode'; // 添加推理模式的localStorage键名

// 从localStorage获取初始开关状态，如果没有则为false
const getInitialSwitchFlag = () => {
    if (typeof window !== 'undefined') {
        const savedFlag = getItem(SWITCH_FLAG_KEY);
        return savedFlag === 'true'; // 转换为布尔值
    }
    return false;
};

// 控制滑块开关，从localStorage初始化
const switchFlag = atom(getInitialSwitchFlag());
// 控制是否显示欢迎组件
const initalFlag = atom(true);

// 从 localStorage 获取初始会话 ID，如果没有则为空字符串
const getInitialConversationId = () => {
    // 客户端环境下才能访问 localStorage
    if (typeof window !== 'undefined') {
        const savedId = getItem(CONVERSATION_ID_KEY);
        return savedId || "";
    }
    return "";
};

// 点击侧边栏后的ID，空字符串表示未选择
const siderbarData = atom(getInitialConversationId());

// 使用自定义 hook，带持久化功能
export const useSwitchModel = () => {
    const [flag, setFlag] = useAtom(switchFlag);
    
    // 自定义设置函数，在设置atom的同时更新localStorage
    const setFlagWithStorage = (newFlag: boolean) => {
        setFlag(newFlag);
        if (typeof window !== 'undefined') {
            setItem(SWITCH_FLAG_KEY, String(newFlag));
        }
    };
    
    return [flag, setFlagWithStorage] as const;
};

export const useInitalFlag = () => {
    return useAtom(initalFlag);
}

export const useSiderbarData = () => {
    const [id, setId] = useAtom(siderbarData);
    
    // 自定义设置函数，在设置 atom 的同时更新 localStorage
    const setIdWithStorage = (newId: string) => {
        setId(newId);
        if (typeof window !== 'undefined') {
            setItem(CONVERSATION_ID_KEY, newId);
            console.log("会话 ID 已保存到 localStorage:", newId);
        }
    };
    
    return [id, setIdWithStorage] as const;
}