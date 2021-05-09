import { ThemeProvider } from '../context/theme';
import '../styles/index.css';

const App = ({ Component, pageProps }): JSX.Element => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
};

export default App;
