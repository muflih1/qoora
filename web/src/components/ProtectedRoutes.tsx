import { Navigate, Outlet } from 'react-router';
import { useViewer } from '../contexts/ViewerContext';

export default function ProtectedRoutes() {
  const viewer = useViewer();

  console.log(location.pathname)

  return viewer == null ? (
    <Navigate to={`/login/?next=${encodeURIComponent(window.location.pathname)}`} />
  ) : (
    <Outlet />
  );
}
