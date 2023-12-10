import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../const/const';
import { AuthorizationStatus } from '../../const/const';
interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useAppSelector(
    (state) => state.dataLoadAndAuthSlice.AuthorizationStatus
  );

  if (isAuth === AuthorizationStatus.Auth) {
    return children;
  } else {
    <Navigate to="/Login" />;
  }
}

export default PrivateRoute;
