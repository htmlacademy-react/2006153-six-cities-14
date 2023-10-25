import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../Pages/main/main';
import Login from '../../Pages/login/login';
import Favorites from '../../Pages/favorites/favorites';
import Offer from '../../Pages/offer/offer';
import NotFound from '../../Pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';

export type AppProps = {
  quantity: number;
};

function App({ quantity }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main quantity={quantity} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/favorites"
            element={<PrivateRoute childrenProps={<Favorites />} />}
          >
          </Route>
          <Route path="/offer" element={<Offer />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
