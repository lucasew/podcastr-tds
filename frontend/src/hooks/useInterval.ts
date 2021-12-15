import { useEffect, useState } from "react";

export default function useInterval(ms: number) {
    const [idx, setIdx] = useState(0)
    function incr() {
        setIdx((i) => i + 1)
    }
    useEffect(() => {
        const interval = setInterval(incr, ms)
        return () => {
            clearInterval(interval)
        }
    }, [ms])
    return [idx, incr] as [number, () => void]
}