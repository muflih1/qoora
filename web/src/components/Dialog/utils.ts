import { useMemo } from "react";

type PossibleRef<T> = React.Ref<T | null>

function mergeRefs<T>(...refs: Array<PossibleRef<T>>) {
  return (instance: T) => {
    const cleanupFuncs: Array<() => void> = []

    refs.forEach((ref) => {
      if (ref == null) return;

      if (typeof ref === "function") {
        const cleanup = ref(instance)
        cleanupFuncs.push(
          typeof cleanup === 'function' ? cleanup : () => ref(null)
        )
      } else if (typeof ref === 'object' && 'current' in ref) {
        (ref as React.RefObject<T>).current = instance
        cleanupFuncs.push(() => (ref as React.RefObject<T>).current = null)
      } else {
        console.error(
          `mergeRefs cannot handle refs of type boolean, number, or string. Received ref: ${String(
            ref
          )} of type ${typeof ref}`
        );
      }
    })

    return () => {
      cleanupFuncs.forEach(func => func())
    }
  }
}

export function useMergeRefs<T>(...refs: Array<PossibleRef<T>>) {
  return useMemo(() => mergeRefs(...refs), [refs])
}