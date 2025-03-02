// import { useCallback, useState } from 'react';
// import BaseBaseMultiStepContainer from './BaseBaseMultiStepContainer';

// export default function BaseMultiStepContainer({ ref, children }) {
//   const [pageComponents, setPageComponents] = useState([]);
//   const [pageCursor, setPageCursor] = useState(0);

//   const setPushPageState = useCallback(
//     pageComponent => {
//       setPageCursor(prevPageCursor => {
//         setPageComponents(prevPageComponents => {
//           return [
//             ...prevPageComponents.slice(0, prevPageCursor),
//             pageComponent,
//           ];
//         });
//         return prevPageCursor + 1;
//       });
//     },
//     [setPageComponents, setPageCursor]
//   );

//   const setPopPageState = useCallback(
//     cursor => {
//       setPageCursor(cursor);
//     },
//     [setPageCursor]
//   );

//   return (
//     <BaseBaseMultiStepContainer
//       ref={ref}
//       pageComponents={pageComponents}
//       pageCursor={pageCursor}
//       setPopPageState={setPopPageState}
//       setPushPageState={setPushPageState}
//     >
//       {children}
//     </BaseBaseMultiStepContainer>
//   );
// }
