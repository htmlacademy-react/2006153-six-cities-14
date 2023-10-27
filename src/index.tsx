import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';
import { offers } from './Mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersList={offers} />
  </React.StrictMode>
);
