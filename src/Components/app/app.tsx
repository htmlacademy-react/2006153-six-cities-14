import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../Pages/main/main';
import Login from '../../Pages/login/login';
import Favorites from '../../Pages/favorites/favorites';
import Offer from '../../Pages/offer/offer';
import NotFound from '../../Pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { OffersList } from '../../const/const';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../../store';
import { Provider } from 'react-redux';
export type AppProps = {
  offersList: OffersList[];
};

function App({ offersList }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main offersList={offersList} />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute
                  childrenProps={<Favorites offersList={offersList} />}
                />
              }
            />
            <Route path="/offer/:id" element={<Offer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
