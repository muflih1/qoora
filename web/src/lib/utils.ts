import { DateTime } from "luxon";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";

export function useUnsafeRef<T>(value: null | T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({ current: value }), [])
}

export function useIsMountRef() {
  const stateRef = useRef(false)

  useLayoutEffect(() => {
    stateRef.current = true

    return () => {
      stateRef.current = false
    }
  }, [])

  return stateRef
}

export function asyncFetch() { }

export function useStable<T>(factory: () => T): T {
  const stateRef = useRef<{ value: T } | null>(null)
  if (stateRef.current === null) {
    const value = factory()
    stateRef.current = {
      value
    }
    return value
  }

  return stateRef.current.value
}

type DebounceOptions = {
  leading?: boolean;
  wait: number;
};

type DebouncedFunction<T extends (...args: unknown[]) => void> = {
  (...args: Parameters<T>): void;
  isPending: () => boolean;
  reset: () => void;
};

export function debounce<T extends (...args: unknown[]) => void>(
  callback: T,
  options: DebounceOptions
): DebouncedFunction<T> {
  const { leading = false, wait } = options;
  let isFirstCall = true;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function debouncedFunction(...args: Parameters<T>): void {
    let resetFunction: () => void;

    if (leading) {
      resetFunction = function () {
        isFirstCall = true;
        timeoutId = null;
      };

      if (!isFirstCall) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(resetFunction, wait);
        return;
      }

      isFirstCall = false;
      callback(...args);
    } else {
      debouncedFunction.reset();
      resetFunction = function () {
        timeoutId = null;
        callback(...args);
      };
    }

    timeoutId = setTimeout(resetFunction, wait);
  }

  debouncedFunction.isPending = function (): boolean {
    return timeoutId !== null;
  };

  debouncedFunction.reset = function (): void {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
    isFirstCall = true;
  };

  return debouncedFunction;
}


export function useDebounced<T extends (...args: unknown[]) => void>(callback: T, { leading, wait }: DebounceOptions) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const debouncedFunction = useStable(() => debounce((...args: Parameters<T>) => callbackRef.current(...args), { leading, wait }))

  useEffect(() => {
    return () => {
      debouncedFunction.reset()
    }
  })

  return debouncedFunction
}

export function usePrevious<Value>(currentValue: Value) {
  const previousValue = useRef<Value>(null)

  useEffect(() => {
    previousValue.current = currentValue
  })

  return previousValue.current
}

export function useDynamicCallback<T extends (...args: unknown[]) => void>(callback: T) {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args: Parameters<T>) => callbackRef.current(...args), [])
}

export function formatDate(date: string) {
  const now = DateTime.now();
  const inputDate = DateTime.fromISO(date);

  const diffInSeconds = now.diff(inputDate, 'seconds').seconds;
  const diffInMinutes = now.diff(inputDate, 'minutes').minutes;
  const diffInHours = now.diff(inputDate, 'hours').hours;
  const diffInDays = Math.floor(now.diff(inputDate, 'days').days);

  if (diffInSeconds < 60) {
    return `Just now`;
  }

  if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)}m`;
  }

  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`;
  }

  if (diffInDays === 1) {
    return `Yesterday at ${inputDate.toFormat('hh:mm a')}`;
  }

  if (now.year === inputDate.year) {
    return inputDate.toFormat('MMM d') + ' at ' + inputDate.toFormat('h:mm a');
  }

  return inputDate.toFormat('yyyy MMMM d, yyyy') + ' at ' + inputDate.toFormat('hh:mm a');
}