export type TransformerOrValue<T> = T | ((old: T) => T)
export type SetStateFn<T> = (v: TransformerOrValue<T>) => any
export type UseStateFn<I,O> = (v: I) => [O, SetStateFn<O>] 

export function withLocalStorage<I, O>(fn: UseStateFn<I, O>, key: string): UseStateFn<I, O> {
    return function withLocalStorageState(initial: I): [O, SetStateFn<O>] {
        const [state, setState] = fn(deserialize(initial))
        function deserialize(fallback: I) {
            try {
                const item = window.localStorage.getItem(key)
                return item ? JSON.parse(item) : fallback
            } catch(error) {
                console.error(error)
                return fallback
            }
        }

        function serialize(newValue: TransformerOrValue<O>) {
            try {
                const newProcessed = 
                    newValue instanceof Function 
                    ? newValue(state) 
                    : newValue
                window.localStorage.setItem(key, JSON.stringify(newProcessed))
                return setState(newProcessed)                
            } catch (error) {
                console.error(error)
            }
        }
        return [state, serialize]
    }
}