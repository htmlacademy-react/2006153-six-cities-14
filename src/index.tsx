import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';
import { store } from './store';
import { checkAuth, fetchOffersAction } from './api-actions/api-actions';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fetchOffersAction());
store.dispatch(checkAuth());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
