// import { useCallback, useState } from 'react';

// export default function useConfirm({title, body}) {
//   const [promise, setPromise] = useState(null);

//   const confirm = useCallback(
//     () =>
//       new Promise(resolve => {
//         setPromise({ resolve });
//       }),
//     [setPromise]
//   );

//   const handleClose = useCallback(() => {
//     setPromise(null);
//   }, []);

//   const handleConfirm = useCallback(() => {
//     promise?.resolve(true);
//     handleClose();
//   }, [promise, handleClose]);

//   const handleCancel = useCallback(() => {
//     promise?.resolve(false);
//     handleClose();
//   }, [promise, handleClose]);

//   const ConfirmationDialog = () => (
//     <div hidden={promise === null}>
//       <h1>{title}</h1>
//       <p>{body}</p>
//       <button onClick={handleCancel}>Cancel</button>
//       <button onClick={handleConfirm}>Confirm</button>
//     </div>
//   );

//   return [ConfirmationDialog, confirm];
// }
