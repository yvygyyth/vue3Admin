import type { DependencyKey, InjectorFn } from './keys';

class AsyncDependencyHub {
    private injectors = new Map<DependencyKey, InjectorFn<any>>();
    private pendingResolvers = new Map<
        DependencyKey,
        Array<(fn: InjectorFn<any>) => void>
    >();

    /**
     * 注册一个依赖方法
     */
    register<K extends DependencyKey>(key: K, fn: InjectorFn<K>) {
        this.injectors.set(key, fn);

        const resolvers = this.pendingResolvers.get(key);
        if (resolvers) {
            resolvers.forEach(resolve => resolve(fn));
            this.pendingResolvers.delete(key);
        }
    }

    /**
     * 获取一个依赖方法（如果未注册，会挂起）
     */
    async get<K extends DependencyKey>(key: K): Promise<InjectorFn<K>> {
        const existing = this.injectors.get(key);
        if (existing) return existing as InjectorFn<K>;

        return new Promise(resolve => {
            if (!this.pendingResolvers.has(key)) {
                this.pendingResolvers.set(key, []);
            }
            this.pendingResolvers.get(key)!.push(resolve);
        });
    }

    /**
     * 是否已经注册
     */
    isReady<K extends DependencyKey>(key: K): boolean {
        return this.injectors.has(key);
    }
}

export const DependencyHub = new AsyncDependencyHub();

export * from './keys'
