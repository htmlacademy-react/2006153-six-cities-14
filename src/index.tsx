import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/component';
import Quantity from './const/quantityConst';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type IndexProps = {
  quantity: number;
};
root.render(
  <React.StrictMode>
    <App cardsQuantity={Quantity.cards} />
  </React.StrictMode>
);
