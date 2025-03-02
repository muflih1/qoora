import * as stylex from '@stylexjs/stylex';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import RootLayout from './components/RootLayout';
import DialogProvider from './contexts/ModalFlowContext';
import LoadingDots from './components/LoadingDots';
import Question from './routes/Question';
import ViewerProvider from './contexts/ViewerContext';
import { promiseDone } from './components/Signup/utils';
import axios from './lib/axios';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';
import ProtectedRoutes from './components/ProtectedRoutes';

const Home = lazy(() => import('./routes/Index'));
const Answer = lazy(() => import('./routes/Answer'));
const SignIn = lazy(() => import('./components/SignIn/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));

export default function App() {
  const [viewer, setViewer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promiseDone(
      axios.get('/auth/viewer'),
      res => {
        setLoading(false);
        setViewer(res.data.viewer);
      },
      () => setLoading(false)
    );
  }, []);

  return loading ? (
    <SuspenseFallback />
  ) : (
    <ViewerProvider viewer={viewer}>
      <DialogProvider>
        <Suspense fallback={<SuspenseFallback />}>
          <Routes>
            <Route Component={RedirectIfLoggedIn}>
              <Route
                path='/login'
                Component={SignIn}
              />
              <Route
                path='/signup'
                Component={SignUp}
              />
            </Route>
            <Route Component={ProtectedRoutes}>
              <Route
                path='/'
                Component={RootLayout}
                ErrorBoundary={() => 'Error'}
              >
                <Route
                  index
                  Component={Home}
                />
                <Route
                  path='/answer'
                  Component={Answer}
                />
                <Route
                  path='/:slug/question/:qid'
                  Component={Question}
                />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </DialogProvider>
    </ViewerProvider>
  );
}

function SuspenseFallback() {
  return (
    <div {...stylex.props(styles.root)}>
      <LoadingDots />
    </div>
  );
}

const styles = stylex.create({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
