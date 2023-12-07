import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../const/const';
import { AuthorizationStatus } from '../../const/const';
interface PrivateRouteProps {
  childrenProps: JSX.Element;
}

function PrivateRoute({ childrenProps }: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector((state) => state.AuthorizationStatus);

  return isAuth === AuthorizationStatus.Auth ? (
    childrenProps
  ) : (
    <Navigate to="/Login" />
  );
}

export default PrivateRoute;
