import mitt, { type Emitter } from 'mitt'

export type EventMap = Record<string | symbol, unknown>

export interface TypedBus<E extends EventMap> {
    on<K extends keyof E>(type: K, handler: (event: E[K]) => void): void
    off<K extends keyof E>(type: K, handler: (event: E[K]) => void): void

    // ✅ 用函数重载来区分有无 payload 的情况
    emit<K extends keyof E>(type: K, payload: E[K]): void
    emit<K extends keyof E>(type: K): void

    once<K extends keyof E>(type: K, handler: (event: E[K]) => void): () => void
    waitFor<K extends keyof E>(type: K, abort?: AbortSignal): Promise<E[K]>
    clear(): void
    raw: Emitter<E>
}

export function createEventBus<E extends EventMap>(): TypedBus<E> {
    const raw = mitt<E>()

    const once = <K extends keyof E>(type: K, handler: (e: E[K]) => void) => {
        const wrapped = (e: E[K]) => {
            raw.off(type as any, wrapped as any)
            handler(e)
        }
        raw.on(type as any, wrapped as any)
        return () => raw.off(type as any, wrapped as any)
    }

    const waitFor = <K extends keyof E>(type: K, abort?: AbortSignal) =>
        new Promise<E[K]>((resolve, reject) => {
            const off = once(type, (e) => resolve(e))
            if (abort) {
                if (abort.aborted) {
                    off()
                    return reject(new DOMException('Aborted', 'AbortError'))
                }
                const onAbort = () => {
                    off()
                    abort.removeEventListener('abort', onAbort)
                    reject(new DOMException('Aborted', 'AbortError'))
                }
                abort.addEventListener('abort', onAbort, { once: true })
            }
        })

    const clear = () => {
        raw.all.clear()
    }

    const emit: any = (type: any, payload?: any) => {
        raw.emit(type, payload)
    }

    return {
        on: (t, h) => raw.on(t as any, h as any),
        off: (t, h) => raw.off(t as any, h as any),
        emit,
        once,
        waitFor,
        clear,
        raw
    }
}

export const eventBus = createEventBus()
