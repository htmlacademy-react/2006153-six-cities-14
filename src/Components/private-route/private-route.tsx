import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../const/const';
import { AuthorizationStatus } from '../../const/const';
interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useAppSelector(
    (state) => state.dataLoadAndAuthSlice.AuthorizationStatus
  );
  const currentUrl = useLocation().pathname;

  if (isAuth === AuthorizationStatus.Auth) {
    return children;
  } else if (
    isAuth === AuthorizationStatus.NoAuth &&
    currentUrl === '/favorites'
  ) {
    return <Navigate to="/Login" />;
  } else if (
    isAuth === AuthorizationStatus.NoAuth &&
    currentUrl !== '/favorites'
  ) {
    <Navigate to="/Login" />;
  }
}

export default PrivateRoute;
