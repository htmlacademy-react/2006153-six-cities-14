import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../Pages/main/main';
import Login from '../../Pages/login/login';
import Favorites from '../../Pages/favorites/favorites';
import Offer from '../../Pages/offer/offer';
import NotFound from '../../Pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { Offers } from '../../const/const';
import { HelmetProvider } from 'react-helmet-async';

export type AppProps = {
  offersList: Offers[];
};

function App({ offersList }: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main offersList={offersList} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/favorites"
            element={
              <PrivateRoute
                childrenProps={<Favorites offersList={offersList} />}
              />
            }
          >
          </Route>
          <Route path="/offer/:id" element={<Offer/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
