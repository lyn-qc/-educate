// 设置 localStorage 项
export const setItem = (key: string, value: unknown) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error: Error) {
        console.error(`设置 localStorage 项时出错: ${error.message}`);
    }
};

// 获取 localStorage 项
export const getItem = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error: Error) {
        console.error(`获取 localStorage 项时出错: ${error.message}`);
        return null;
    }
};

// 删除 localStorage 项
export const removeItem = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error: Error) {
        console.error(`删除 localStorage 项时出错: ${error.message}`);
    }
};

// 清空 localStorage
export const clear = () => {
    try {
        localStorage.clear();
    } catch (error: Error) {
        console.error(`清空 localStorage 时出错: ${error.message}`);
    }
};    