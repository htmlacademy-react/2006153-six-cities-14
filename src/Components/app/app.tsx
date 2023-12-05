import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../Pages/main/main';
import Login from '../../Pages/login/login';
import Favorites from '../../Pages/favorites/favorites';
import Offer from '../../Pages/offer/offer';
import NotFound from '../../Pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import {
  AuthorizationStatus,
  OffersList,
  useAppSelector,
} from '../../const/const';
import { HelmetProvider } from 'react-helmet-async';
import OffersNotLogged from '../../Pages/offers-not-logged/offers-not-logged';

export type AppProps = {
  offersList: OffersList[];
};

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/favorites"
            element={<PrivateRoute childrenProps={<Favorites />} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
