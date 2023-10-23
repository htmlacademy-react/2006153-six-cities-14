import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';
import Quantity from './const/const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App quantity={Quantity.cards} />
  </React.StrictMode>
);
