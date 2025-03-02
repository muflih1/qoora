import { useMemo } from "react";

type PossibleRef<T> = React.Ref<null | T> | undefined;

export function useMergeRefs<T>(...refs: Array<PossibleRef<T>>) {
  return useMemo(() => mergeRefs(...refs), [refs]);
}

function mergeRefs<T>(...refs: Array<PossibleRef<T>>) {
  return (node: T | null) => {
    const cleanupsFnc: Array<() => void> = [];

    refs.forEach(ref => {
      if (ref == null) return;

      if (typeof ref === 'function') {
        const cleanup = ref(node);
        cleanupsFnc.push(
          typeof cleanup === 'function' ? cleanup : () => ref(null)
        );
      } else if (typeof ref === 'object' && 'current' in ref) {
        (ref as React.RefObject<T | null>).current = node;
        cleanupsFnc.push(() => {
          ref.current = null;
        });
      } else {
        console.error(
          `mergeRefs cannot handle refs of type boolean, number, or string. Received ref: ${String(
            ref
          )} of type ${typeof ref}`
        );
      }
    });

    return () => {
      cleanupsFnc.forEach(fn => fn());
    };
  };
}

export function promiseDone<T>(
  promise: Promise<T>,
  onSuccess?: (val: T) => void,
  onError?: (err: unknown) => void
): void {
  const handlePromise = onSuccess || onError ? promise.then(onSuccess, onError) : promise

  handlePromise.then(null, err => {
    console.error("Unhandled promise error:", err)
  })
}