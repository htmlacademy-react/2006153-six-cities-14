import Main from '../../Pages/Main/component';

export type AppProps = {
  quantity: number;
};

function App({ quantity }: AppProps): JSX.Element {
  return <Main quantity={quantity} />;
}

export default App;
