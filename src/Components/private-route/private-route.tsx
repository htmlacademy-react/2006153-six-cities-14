import { Navigate } from 'react-router-dom';
import { isAuthorized } from '../../const/const';

interface PrivateRouteProps {
  childrenProps: JSX.Element;
}

function PrivateRoute({ childrenProps }: PrivateRouteProps): JSX.Element {
  return isAuthorized ? childrenProps : <Navigate to="/Login" />;
}

export default PrivateRoute;
