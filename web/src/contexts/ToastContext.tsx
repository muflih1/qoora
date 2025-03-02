// import { createContext, ReactNode, useReducer } from 'react';
// import { EventEmitter } from 'events';

// const emitter = new (class {
//   private _emitter: EventEmitter;

//   constructor() {
//     this._emitter = new EventEmitter();
//   }

//   emit(eventName: string, listener: () => void) {
//     this._emitter.emit(eventName, listener);
//   }

//   on(eventName: string, listener: () => void) {
//     this._emitter.on(eventName, listener);
//   }

//   off(eventName: string, listener: () => void) {
//     this._emitter.off(eventName, listener);
//   }
// })();

// const fallbackErrorMessage = 'Somthing went wrong. Please try again later.';

// const setToast = () => {};

// setToast.error = () => {};

// setToast.success = () => {};

// setToast.genericError = () => {};

// const Context = createContext({
//   getToast: () => {},
//   setToast,
// });

// type Toast = {
//   toastId: number;
//   content: string;
//   bg: string;
//   iconName: string;
//   dissmisable: boolean;
// };

// type State = {
//   toasts: Toast[];
// };

// type Action = { type: 'ADD_TOAST' } | { type: 'REMOVE_TOAST'; payload: number };

// const initialState: State = {
//   toasts: [],
// };

// function reducer(state: State, action: Action) {
//   switch (action.type) {
//     case 'ADD_TOAST': {
//       return state;
//     }
//     case 'REMOVE_TOAST': {
//       return state.toasts.find(toast => toast.toastId === action.payload)
//         ? {
//             toasts: state.toasts.filter(
//               toast => toast.toastId !== action.payload
//             ),
//           }
//         : state;
//     }
//     default: {
//       return state;
//     }
//   }
// }

// export function ToastMaster({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(reducer, initialState)

  
// }
