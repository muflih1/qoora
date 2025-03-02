import { Navigate, Outlet } from 'react-router';
import { useViewer } from '../contexts/ViewerContext';

export default function RedirectIfLoggedIn() {
  const viewer = useViewer();

  return viewer == null ? <Outlet /> : <Navigate to={'/'} />;
}
