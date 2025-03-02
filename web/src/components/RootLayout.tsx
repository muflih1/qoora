import * as stylex from '@stylexjs/stylex';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <div {...stylex.props(styles.container)}>
        <Outlet />
      </div>
    </>
  );
}

const styles = stylex.create({
  container: {
    width: 1100,
    marginStart: 'auto',
    marginEnd: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    paddingEnd: 24,
    paddingStart: 24,
    paddingBottom: 48,
  },
});
