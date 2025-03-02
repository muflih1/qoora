// import { useCallback, useEffect, useMemo } from 'react';
// import BaseMultiPageViewContext from './_contexts/BaseMultiPageViewContext';
// import { useDebounced, useDynamicCallback } from '../../lib/utils';
// import WebView from '../WebView';
// import HiddenSubtreeContextProvider from '../../contexts/HiddenSubtree/HiddenSubtreeProvider';

// export default function BaseBaseMultiStepContainer({
//   children,
//   pageComponents,
//   pageCursor,
//   setPopPageState,
//   setPushPageState,
//   // align,
//   // fitContentWidth = false,
//   // expanding = false,
//   onPageChange = () => {},
// }) {
//   const debouncedPushPage = useDebounced(setPushPageState, {
//     leading: true,
//     wait: 350,
//   });

//   const handlePopPage = useCallback(
//     (pageComponent, options?: { index?: number }) => {
//       const currentIndex = pageComponents.indexOf(pageComponent);
//       const targetIndex = options?.index ?? currentIndex;

//       if (targetIndex > currentIndex) {
//         console.error('Invalid target index');
//         return;
//       }

//       if (targetIndex < 0) {
//         console.error(
//           'Attempting to close a page that does not exists anymore.'
//         );
//         return;
//       }

//       setPopPageState(targetIndex);
//     },
//     [pageComponents, setPopPageState]
//   );

//   const dynamicPageChangeHandler = useDynamicCallback(onPageChange);

//   useEffect(() => {
//     // @ts-expect-error[somthing went wrong on my implementation]
//     dynamicPageChangeHandler?.(pageCursor);
//   }, [dynamicPageChangeHandler, pageCursor]);

//   return (
//     <div>
//       <WebView
//         aria-hidden={pageCursor !== 0 ? true : undefined}
//         style={{
//           transform: `translateX(${-1 * pageCursor}00%) translateZ(1px)`,
//         }}
//       >
//         <HiddenSubtreeContextProvider isHidden={pageCursor !== 0}>
//           <BaseMultiPageViewContextProvider
//             fallback={'fallback'}
//             popPage={handlePopPage}
//             pushPage={debouncedPushPage}
//           >
//             {typeof children === 'function'
//               ? children(debouncedPushPage)
//               : children}
//           </BaseMultiPageViewContextProvider>
//         </HiddenSubtreeContextProvider>
//       </WebView>

//       {pageComponents.map((Component, index) => (
//         <WebView
//           key={index}
//           aria-hidden={pageCursor !== index + 1 ? true : undefined}
//           style={{
//             transform: `translateX(${
//               -1 * (pageCursor - index - 1)
//             }00%) translateZ(1px)`,
//           }}
//         >
//           <HiddenSubtreeContextProvider isHidden={pageCursor !== index + 1}>
//             <BaseMultiPageViewContextProvider
//               currentPageComponent={Component}
//               fallback={'fallback'}
//               popPage={handlePopPage}
//               pushPage={debouncedPushPage}
//             >
//               <Component
//                 onReturn={options => handlePopPage(Component, options)}
//               />
//             </BaseMultiPageViewContextProvider>
//           </HiddenSubtreeContextProvider>
//         </WebView>
//       ))}
//     </div>
//   );
// }

// interface BaseMultiPageViewContextProviderProps {
//   children: React.ReactNode;
//   currentPageComponent?: React.ComponentType;
//   fallback?: React.ReactNode;
//   popPage: (page: unknown, options?: {index?: number} | null | undefined) => void;
//   pushPage: (pageComponent: unknown) => void;
// }

// function BaseMultiPageViewContextProvider({
//   children,
//   currentPageComponent,
//   fallback,
//   popPage,
//   pushPage,
// }: BaseMultiPageViewContextProviderProps) {
//   const momoizedPushPage = useMemo(
//     () => page => {
//       return pushPage(page);
//     },
//     [pushPage]
//   );

//   const contextValue = useMemo(
//     () => ({
//       fallback,
//       popPage: (options?: { index?: number }) => {
//         if (currentPageComponent != null) {
//           return popPage(
//             currentPageComponent,
//             options != null ? { index: options.index } : null
//           );
//         }
//       },
//       pushPage: momoizedPushPage,
//     }),
//     [currentPageComponent, fallback, popPage, momoizedPushPage]
//   );

//   return (
//     <BaseMultiPageViewContext value={contextValue}>
//       {children}
//     </BaseMultiPageViewContext>
//   );
// }
