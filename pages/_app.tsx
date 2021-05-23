import { resetStyles } from '../shared/styles';

const App = ({ Component, pageProps }): JSX.Element => (
  <>
    {resetStyles}
    <Component {...pageProps} />
  </>
);

export default App;
