// import * as stylex from '@stylexjs/stylex';
// import { useId } from 'react';
// import Header from './_components/Header';
// import WebView from '../WebView';

// export default function SignUpMultiStepDialog({ onClose }) {
//   const id = useId();

//   return (
//     <div {...stylex.props(styles.root)}>
//       <div {...stylex.props(styles.anchor)}>
//         <div {...stylex.props(styles.mask)} />
//         <WebView
//           role='dialog'
//           aria-labelledby={id}
//           xstyle={styles.dialog}
//         >
//           <Header
//             id={id}
//             onClose={onClose}
//             withCloseButton={true}
//             title={'Sign up'}
//           />
//         </WebView>
//       </div>
//     </div>
//   );
// }

// const styles = stylex.create({
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//     position: 'fixed',
//     top: 0,
//     start: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 2025,
//   },
//   anchor: {
//     position: 'fixed',
//     top: 0,
//     end: 0,
//     bottom: 0,
//     start: 0,
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//   },
//   mask: {
//     position: 'absolute',
//     top: 0,
//     end: 0,
//     bottom: 0,
//     start: 0,
//     backgroundColor: 'rgba(244,244,244,.85)',
//   },
//   dialog: {
//     position: 'relative',
//     boxSizing: 'border-box',
//     alignSelf: 'center',
//     maxHeight: '80vh',
//     maxWidth: '90vw',
//     width: 620,
//     borderTopStartRadius: 16,
//     borderTopEndRadius: 16,
//     borderBottomEndRadius: 16,
//     borderBottomStartRadius: 16,
//     backgroundColor: '#fff',
//     borderTopColor: '#dee0e1',
//     borderEndColor: '#dee0e1',
//     borderBottomColor: '#dee0e1',
//     borderStartColor: '#dee0e1',
//     borderTopStyle: 'solid',
//     borderEndStyle: 'solid',
//     borderBottomStyle: 'solid',
//     borderStartStyle: 'solid',
//     borderTopWidth: 1,
//     borderEndWidth: 1,
//     borderBottomWidth: 1,
//     borderStartWidth: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     overflowY: 'auto',
//     minHeight: 400,
//     animationName: stylex.keyframes({
//       from: {
//         opacity: 0,
//         transform: 'scale(.95)',
//       },
//       to: {
//         opacity: 1,
//         transform: 'none',
//       },
//     }),
//     animationDuration: '.2s',
//     animationTimeline: 'ease-out',
//   },
// });
