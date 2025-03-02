import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import HiddenSubtreeContext, {
  HiddenSubtreeState,
} from './HiddenSubtreeContext';
import HiddenSubtreePassiveContext from './HiddenSubtreePassiveContext';

function useUnsafeRef<Value>(value: Value) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ({ current: value }), []);
}

function areStateEqual(prev: HiddenSubtreeState, next: HiddenSubtreeState) {
  return prev.backgrounded === next.backgrounded && prev.hidden === next.hidden;
}

function mergeStates(
  parentState: HiddenSubtreeState,
  childState: HiddenSubtreeState
) {
  const backgrounded = parentState.backgrounded || childState.backgrounded;
  const hidden = parentState.hidden || childState.hidden;

  return {
    backgrounded,
    hidden,
    hiddenOrBackgrounded: backgrounded || hidden,
    hiddenOrBackgrounded_FIXME: backgrounded || hidden,
  };
}

export default function HiddenSubtreeContextProvider({
  children,
  ignoreParent = false,
  isBackgrounded = false,
  isHidden = false,
}: {
  children: React.ReactNode;
  ignoreParent?: boolean;
  isBackgrounded?: boolean;
  isHidden?: boolean;
}) {
  const parentState = useContext(HiddenSubtreeContext);
  const passiveContext = useContext(HiddenSubtreePassiveContext);

  const state = useMemo(
    () => ({
      backgrounded: isBackgrounded,
      hidden: isHidden,
      hiddenOrBackgrounded: isBackgrounded || isHidden,
      hiddenOrBackgrounded_FIXME: isBackgrounded || isHidden,
    }),
    [isBackgrounded, isHidden]
  );

  const stateRef = useUnsafeRef(state);
  const previousStateRef = useRef<HiddenSubtreeState | null>(null);
  const subscribersRef = useRef<Array<(state: HiddenSubtreeState) => void>>([]);

  const notifySubscribers = useCallback(() => {
    const currentState = ignoreParent
      ? stateRef.current
      : mergeStates(stateRef.current, passiveContext.getCurrentState());

    if (
      !previousStateRef.current ||
      !areStateEqual(currentState, previousStateRef.current)
    ) {
      previousStateRef.current = currentState;
      subscribersRef.current.forEach(subscriber => subscriber(currentState));
    }
  }, [ignoreParent, passiveContext, stateRef]);

  useLayoutEffect(() => {
    stateRef.current = state;
    notifySubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, notifySubscribers]);

  useEffect(() => {
    if (!ignoreParent) {
      const subscription = passiveContext.subscribeToChanges(notifySubscribers);
      return () => subscription.remove();
    }
  }, [ignoreParent, notifySubscribers, passiveContext]);

  const passiveContextValue = useMemo(
    () => ({
      getCurrentState: () =>
        ignoreParent
          ? stateRef.current
          : passiveContext
          ? mergeStates(stateRef.current, passiveContext.getCurrentState())
          : stateRef.current,
      subscribeToChanges: (callback: (state: HiddenSubtreeState) => void) => {
        subscribersRef.current.push(callback);
        return {
          remove: () => {
            subscribersRef.current = subscribersRef.current.filter(
              sub => sub !== callback
            );
          },
        };
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ignoreParent, passiveContext]
  );

  const providerState = ignoreParent ? state : mergeStates(state, parentState);

  const contextValue = useMemo(
    () => ({
      ...providerState,
      hiddenOrBackgrounded: providerState.backgrounded || providerState.hidden,
      hiddenOrBackgrounded_FIXME:
        providerState.backgrounded || providerState.hidden,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [providerState.backgrounded, providerState.hidden]
  );

  return (
    <HiddenSubtreeContext.Provider value={contextValue}>
      <HiddenSubtreePassiveContext.Provider value={passiveContextValue}>
        {children}
      </HiddenSubtreePassiveContext.Provider>
    </HiddenSubtreeContext.Provider>
  );
}
