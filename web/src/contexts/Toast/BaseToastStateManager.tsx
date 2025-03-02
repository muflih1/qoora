// import { useContext, createContext } from 'react';
// import {
//   unstable_scheduleCallback as scheduleCallback,
//   unstable_NormalPriority as NormalPriority,
// } from 'scheduler';

// function once(callback: () => void) {
//   let called = false;
//   return () => {
//     if (!called) {
//       callback();
//       called = true;
//     }
//   };
// }

// function removeFromArray(arr, item) {
//   const index = arr.indexOf(item);
//   if (index > -1) {
//     arr.splice(index, 1);
//   }
// }

// export type Toast = {
//   id: string;
//   value: string;
//   duration: number | null;
//   expired: boolean;
//   shown: boolean;
//   timer: ReturnType<typeof setTimeout> | null;
// };

// export type ToastManagerOptions = {
//   callbackScheduler: (callback: () => void) => void;
//   maxQueuedToasts: number;
//   minimumDurationMs: number;
// };

// type Actions =
//   | { type: 'PUSH'; node: Toast }
//   | { type: 'SHOWN'; id: string }
//   | { type: 'EXPIRE'; id: string }
//   | { type: 'HIDDEN'; id: string }
//   | { type: 'DELETE'; id: string }
//   | { type: 'REPLACE'; id: string; value: string }
//   | { type: 'STOP_TIMER'; id: string }
//   | { type: 'RESET_TIMER'; id: string };

// type Listener = () => void;

// type ViewHandler = {
//   handler: (state: { [key: string]: Toast }) => void;
//   priority: number;
// };

// const emptyState = {};

// class ToasterStateManager {
//   private static _instance: ToasterStateManager;
//   private _id: number;
//   private _state: Map<string, Toast>;
//   private _listeners: Array<Listener>;
//   private _viewHandlers: Array<ViewHandler>;
//   private _currentView: ViewHandler | null;
//   private _callbackScheduler: (callback: () => void) => void;
//   private _maxQueuedToasts: number;
//   private _minimumDurationMs: number;

//   constructor({
//     callbackScheduler,
//     maxQueuedToasts,
//     minimumDurationMs,
//   }: ToastManagerOptions) {
//     this._id = 0;
//     this._state = new Map();
//     this._listeners = [];
//     this._viewHandlers = [];
//     this._currentView = null;
//     this._callbackScheduler = callbackScheduler;
//     this._maxQueuedToasts = maxQueuedToasts;
//     this._minimumDurationMs = minimumDurationMs;
//   }

//   setMinimumDurationMs(duration: number) {
//     this._minimumDurationMs = duration;
//   }

//   push(value: string, duration: number) {
//     const id = `toast-${this._id++}`;
//     const toast = {
//       id,
//       value,
//       duration,
//       expired: false,
//       shown: false,
//       timer: null,
//     };
//     this._reducer({ type: 'PUSH', node: toast });
//     return id;
//   }

//   replace(id: string, value: string) {
//     this._reducer({
//       type: 'REPLACE',
//       id,
//       value,
//     });
//   }

//   shown(id: string) {
//     this._reducer({
//       type: 'SHOWN',
//       id,
//     });
//   }

//   delete(id: string) {
//     this._reducer({
//       type: 'DELETE',
//       id,
//     });
//   }

//   expire(id: string) {
//     this._reducer({
//       type: 'EXPIRE',
//       id,
//     });
//   }

//   hidden(id: string) {
//     this._reducer({
//       type: 'HIDDEN',
//       id,
//     });
//   }

//   stopTimer(id: string) {
//     this._reducer({
//       type: 'STOP_TIMER',
//       id,
//     });
//   }

//   resetTimer(id: string) {
//     this._reducer({
//       type: 'RESET_TIMER',
//       id,
//     });
//   }

//   getState() {
//     return Object.fromEntries(this._state);
//   }

//   getEmptyState() {
//     return emptyState;
//   }

//   addListener(callback: Listener) {
//     this._listeners.push(callback);
//     return {
//       remove: once(() => {
//         removeFromArray(this._listeners, callback);
//       }),
//     };
//   }

//   private _replaceCurrentView(view: ViewHandler) {
//     if (!this._currentView || view.priority > this._currentView.priority) {
//       this._currentView = view;
//     }
//   }

//   registerView(
//     handler: (state: { [key: string]: Toast }) => void,
//     priority = 1
//   ) {
//     const view = { handler, priority };
//     this._viewHandlers.push(view);
//     this._replaceCurrentView(view);
//     this._scheduleCallbacks();
//     return {
//       remove: once(() => {
//         removeFromArray(this._viewHandlers, view);
//         if (this._currentView === view) {
//           this._currentView = null;
//           this._viewHandlers.forEach(v => this._replaceCurrentView(v));
//         }
//       }),
//     };
//   }

//   private _reducer(action: Actions) {
//     const previousState = this._state;

//     switch (action.type) {
//       case 'PUSH': {
//         const node = action.node;
//         this._state = new Map([...this._state, [node.id, node]]);
//         if (this._maxQueuedToasts !== 0) {
//           const queuedToasts = Array.from(this._state.values()).filter(
//             toast => !toast.shown && !toast.expired
//           );
//           if (queuedToasts.length > this._maxQueuedToasts) {
//             const oldToast = queuedToasts[0];
//             this.delete(oldToast.id);
//           }
//         }
//         break;
//       }
//       case 'SHOWN': {
//         if (this._state.has(action.id) && !this._getToast(action.id)) {
//           const updatedToast = { ...this._getToast(action.id), shown: true };
//           this._state = new Map([
//             ...this._state,
//             [action.id, this._startTimer(updatedToast)],
//           ]);
//         }
//         break;
//       }
//       case 'EXPIRE': {
//         if (this._state.has(action.id)) {
//           const updatedToast = { ...this._getToast(action.id), expired: true };
//           this._state = new Map([
//             ...this._state,
//             [action.id, this._clearTimer(updatedToast)],
//           ]);
//           this._setTimer(updatedToast);
//         }
//         break;
//       }
//       case 'HIDDEN': {
//         if (this._state.has(action.id)) {
//           const toast = this._getToast(action.id);
//           if (toast.shown || toast.expired) {
//             this._state = new Map(this._state);
//             this._state.delete(action.id);
//             this._clearTimer(toast);
//           }
//         }
//         break;
//       }
//       case 'DELETE': {
//         if (this._state.has(action.id)) {
//           const toast = this._getToast(action.id);
//           this._state = new Map(this._state);
//           this._state.delete(action.id);
//           this._clearTimer(toast);
//         }
//         break;
//       }
//       case 'REPLACE': {
//         if (this._state.has(action.id)) {
//           const toast = this._getToast(action.id);
//           this._state = new Map([
//             ...this._state,
//             [toast.id, { ...toast, value: action.value }],
//           ]);
//         }
//         break;
//       }
//       case 'STOP_TIMER': {
//         if (
//           this._state.has(action.id) &&
//           this._hasTimer(this._getToast(action.id))
//         ) {
//           const newToast = { ...this._getToast(action.id) };
//           this._state = new Map([
//             ...this._state,
//             [action.id, this._clearTimer(newToast)],
//           ]);
//         }
//         break;
//       }
//       case 'RESET_TIMER': {
//         if (
//           this._state.has(action.id) &&
//           !this._hasTimer(this._getToast(action.id))
//         ) {
//           const updatedToast = { ...this._getToast(action.id) };
//           this._state = new Map([
//             ...this._state,
//             [action.id, this._startTimer(updatedToast)],
//           ]);
//         }
//         break;
//       }
//       default:
//         break;
//     }

//     if (previousState !== this._state) {
//       this._scheduleCallbacks();
//     }
//   }

//   private _scheduleCallbacks() {
//     this._listeners.forEach(callback => {
//       this._callbackScheduler(() => callback());
//     });

//     this._viewHandlers.forEach(view => {
//       this._callbackScheduler(() => {
//         view.handler(
//           view === this._currentView ? this.getState() : this.getEmptyState()
//         );
//       });
//     });
//   }

//   private _hasTimer(toast: Toast) {
//     return toast.timer !== null;
//   }

//   private _clearTimer(toast: Toast) {
//     if (toast.timer != null) {
//       clearTimeout(toast.timer);
//       toast.timer = null;
//     }
//     return toast;
//   }

//   private _setTimer(toast: Toast) {
//     this._clearTimer(toast);
//     const toastId = toast.id;
//     setTimeout(() => {
//       this.delete(toastId);
//     }, 1e3);
//   }

//   private _startTimer(toast: Toast) {
//     if (toast.duration !== null && toast.timer == null) {
//       let duration = toast.duration;
//       if (
//         this._minimumDurationMs != null &&
//         duration != null &&
//         this._minimumDurationMs > duration
//       ) {
//         duration = this._minimumDurationMs;
//       }
//       toast.timer = setTimeout(() => {
//         this.expire(toast.id);
//       }, duration);
//     }
//     return toast;
//   }

//   private _getToast(id: string) {
//     const toast = this._state.get(id);
//     if (toast == null) {
//       throw new Error('Toast with given identifier was not found.');
//     }
//     return toast;
//   }

//   static getInstance(config: ToastManagerOptions) {
//     if (this._instance == null) {
//       this._instance = new ToasterStateManager(config);
//     }
//     return this._instance;
//   }
// }

// function scheduleNormalPriCallback(callback: () => void) {
//   scheduleCallback(NormalPriority, callback);
// }

// export const BaseToasetrStateManager = {
//   getInstance: () =>
//     ToasterStateManager.getInstance({
//       callbackScheduler: scheduleNormalPriCallback,
//       maxQueuedToasts: 2,
//       minimumDurationMs: 2750,
//     })
// };

// export const BaseToasterStateManagerContext = createContext<ToasterStateManager>(BaseToasetrStateManager.getInstance())

// export function useToasterStateManager() {
//   return useContext(BaseToasterStateManagerContext)
// }