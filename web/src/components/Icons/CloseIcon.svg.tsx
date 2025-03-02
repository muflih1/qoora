import * as stylex from '@stylexjs/stylex';

interface CloseSvgIconProps {
  xstyle?: stylex.StyleXStyles;
}

export default function CloseSvgIcon({
  xstyle,
}: CloseSvgIconProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...stylex.props(styles.root, xstyle)}
    >
      <path
        d='m5.5 5.5 13 13m-13 0 13-13'
        stroke='#56585c'
        strokeWidth='1.5'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
      ></path>
    </svg>
  );
}

const styles = stylex.create({
  root: {
    display: 'inline-block',
  },
});
