// import { createContext, useContext, useReducer } from 'react';

// const StepperStateContext = createContext(null);
// const StepperDispatchContext = createContext(null);

// const initialState = { step: 0, flowData: {} };

// const reduder = (state, action) => {
//   switch (action.type) {
//     case 'NEXT_STEP':
//       return { ...state, step: state.step + 1 };
//     case 'PREV_STEP':
//       return { ...state, step: state.step - 1 };
//     case 'SET_DATA':
//       return {
//         ...state,
//         flowData: {
//           ...state.flowData,
//           [action.payload.field]: action.payload.value,
//         },
//       };
//     default:
//       return state;
//   }
// };

// export default function StepperProvider({ children, initialFlowData }) {
//   const [state, dispatch] = useReducer(reduder, {
//     ...initialState,
//     flowData: initialFlowData,
//   });

//   return (
//     <StepperStateContext.Provider value={state}>
//       <StepperDispatchContext.Provider value={dispatch}>
//         {children}
//       </StepperDispatchContext.Provider>
//     </StepperStateContext.Provider>
//   );
// }

// export function useStepperState() {
//   return useContext(StepperStateContext)
// }

// export function useStepperDispatch() {
//   return useContext(StepperDispatchContext)
// }