import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from '../../Pages/favorites/favorites';
import Login from '../../Pages/login/login';
import { isAuthorized } from '../../const/const';
function PrivateRoute(): JSX.Element {
  return (
    <Routes>
      {isAuthorized ? (
        <Route path="/favorites" element={<Favorites />}></Route>
      ) : (
        <Route path="/login" element={<Login />}></Route>
      )}
    </Routes>
  );
}

export default PrivateRoute;
