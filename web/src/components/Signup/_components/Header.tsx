// import * as stylex from '@stylexjs/stylex';
// import CircleButton from '../../Button/CircleButton';
// import CloseSvgIcon from '../../Icons/CloseIcon.svg';
// import BaseText from '../../Typography/BaseText';

// export default function Header({
//   id,
//   onClose,
//   title,
//   withCloseButton = false,
// }) {
//   return (
//     <div
//       aria-label={title}
//       role='dialog'
//     >
//       {withCloseButton === true && (
//         <div {...stylex.props(styles.nav)}>
//           <CircleButton
//             label='Close'
//             onPress={onClose}
//           >
//             <CloseSvgIcon />
//           </CircleButton>
//         </div>
//       )}
//       {title != null && (
//         <div {...stylex.props(styles.header)}>
//           <BaseText
//             id={id}
//             weight='bold'
//             size='title'
//             color='primaryText'
//             maxLines={1}
//           >
//             {title}
//           </BaseText>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = stylex.create({
//   nav: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingTop: 8,
//     paddingEnd: 8,
//     paddingBottom: 8,
//     paddingStart: 4,
//   },
//   header: {
//     paddingEnd: 16,
//     paddingBottom: 8,
//     paddingStart: 16,
//   },
// });
