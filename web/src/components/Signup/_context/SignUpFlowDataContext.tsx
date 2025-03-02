import { createContext, useContext, useMemo, useReducer } from 'react';

const SignUpFlowDataStateContext = createContext(null);
const SignUpFlowDataDispatchContext = createContext(null);

const initialState = {
  name: '',
  email: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'ON_EMAIL_CHANGE':
      return { ...state, email: action.value };
    case 'ON_NAME_CHANGE':
      return { ...state, name: action.value };
    default:
      return state;
  }
}

export default function SignUpFlowDataStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextStateValue = useMemo(() => state, [state]);

  return (
    <SignUpFlowDataStateContext.Provider value={contextStateValue}>
      <SignUpFlowDataDispatchContext.Provider value={dispatch}>
        {children}
      </SignUpFlowDataDispatchContext.Provider>
    </SignUpFlowDataStateContext.Provider>
  );
}

export function useSignUpFlowDataState() {
  return useContext(SignUpFlowDataStateContext);
}

export function useSignUpFlowDataDispatch() {
  return useContext(SignUpFlowDataDispatchContext)
}