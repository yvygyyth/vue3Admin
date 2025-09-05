/**
 * 遍历 Map 并返回由回调函数结果组成的新数组
 * @param map 要遍历的 Map
 * @param callback 处理每个键值对的函数，返回值将作为新数组的元素
 * @returns 由回调函数返回值组成的数组
 */
export function traverseMap<K, V, R>(
    map: Map<K, V>,
    callback: (key: K, value: V) => R
): R[] {
    const result: R[] = [];
    
    map.forEach((value, key) => {
        result.push(callback(key, value));
    });
    
    return result;
}

/**
 * 将Map转换为{ label: string; value: K }格式的数组
 * @param map Map对象
 * @returns {label: V, value: K}结构的数组
 */
export function mapToLabelValueArray<K, V extends string>(
    map: Map<K, V>
): { label: V; value: K }[] {
    return traverseMap(map, (key, value) => ({
        label: value,
        value: key
    }));
}


/**
 * 将Map转换为{ text: string; value: K }格式的数组
 * @param map Map对象
 * @returns {text: V, value: K}结构的数组
 */
export function mapToTextValueArray<K, V extends string>(
    map: Map<K, V>
): { text: V; value: K }[] {
    return traverseMap(map, (key, value) => ({
        text: value,
        value: key
    }));
}