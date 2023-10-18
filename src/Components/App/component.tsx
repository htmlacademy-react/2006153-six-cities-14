import Main from '../../Pages/Main/component';

type AppCardsProps = {
  quantity: number;
};

function App({ cardsQuantity }: AppCardsProps): JSX.Element {
  return <Main quantity={cardsQuantity} />;
}

export default App;
