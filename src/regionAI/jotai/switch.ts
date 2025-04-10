import { atom, useAtom } from 'jotai'

// 控制滑块开关
const switchFlag = atom(false);
// 控制是否显示欢迎组件
const initalFlag = atom(true);


export const useSwitchModel = () => {
    return useAtom(switchFlag)
}

export const useInitalFlag = () => {
    return useAtom(initalFlag)
}