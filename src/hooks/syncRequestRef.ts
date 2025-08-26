import { customRef, reactive, type Ref, type Reactive } from "vue";
import useLoading from "./loading";

const UNINIT = Symbol("uninitialized");

export type SyncRequestRef<T> = Reactive<{
    value: Ref<T>;
    loading: Ref<boolean>;
    refresh: () => void;
}>;

/**
 * 将非空对象转换为响应式对象，非对象则直接返回
 * @param value 任意值
 * @returns 处理后的值
 */
const toReactive = <T>(value: T): T => {
    if (typeof value === "object" && value !== null) {
        return reactive(value) as T;
    }
    return value;
};
export const syncRequestRef = <T>(
    fun: () => T,
    defaultValue: T,
): SyncRequestRef<T> => {
    // 创建加载状态
    const { loading, setLoading } = useLoading(true);
    let result: T | typeof UNINIT = UNINIT;

    let triggerFunc: () => void = () => {};

    // 创建基础 Ref
    const baseRef = customRef<T>((track, trigger) => {
        triggerFunc = () => trigger();
        return {
            get() {
                track();
                if (result === UNINIT) {
                    try {
                        result = fun();
                        console.log(result)
                        return toReactive(result);
                    } catch (e: unknown) {
                        if (e instanceof Promise) {
                            e.then(() => {
                                trigger();
                            })
                                .catch(() => {
                                    result = defaultValue
                                })
                                .finally(() => {
                                    setLoading(false);
                                });
                        }
                        return defaultValue;
                    }
                } else {
                    setLoading(false);
                    return toReactive(result);
                }
            },
            set(newValue: T) {
                result = newValue;
                trigger();
            },
        };
    });

    const refresh = () => {
        setLoading(true);
        result = UNINIT;
        triggerFunc();
    };

    // 合并 loading 属性
    return reactive({
        value: baseRef,
        loading: loading,
        refresh,
    });
};

export const asyncRequestRef = <T>(
    fun: () => Promise<T>,
    defaultValue: T,
): SyncRequestRef<T> => {
    const { loading, setLoading } = useLoading(true);

    let result: T | typeof UNINIT = UNINIT;
    let triggerFunc: () => void = () => {};

    const baseRef = customRef<T>((track, trigger) => {
        triggerFunc = () => trigger();
        return {
            get() {
                track();

                if (result === UNINIT) {
                    fun()
                        .then((data) => {
                            result = data;
                            trigger();
                        })
                        .catch(() => {
                            result = defaultValue
                        })
                        .finally(() => {
                            setLoading(false);
                        });

                    return defaultValue;
                } else {
                    return toReactive(result);
                }
            },
            set(newValue: T) {
                result = newValue;
                trigger();
            },
        };
    });

    const refresh = () => {
        setLoading(true);
        result = UNINIT;
        triggerFunc();
    };

    return reactive({
        value: baseRef,
        loading,
        refresh,
    });
};
