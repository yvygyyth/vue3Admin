// ✅ keys.ts
export const Keys = {
    getToken: 'getToken',
} as const;
  
export type DependencyKey = keyof typeof Keys;
  
export type Injectors = {
    getToken: () => string;
};

export type InjectorFn<K extends DependencyKey> = Injectors[K];

