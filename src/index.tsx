import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';
import { offers } from './Mocks/offers';
import { store } from './store';
import { fetchOffersAction } from '../api-actions/api-actions';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fetchOffersAction());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersList={offers} />
    </Provider>
  </React.StrictMode>
);
