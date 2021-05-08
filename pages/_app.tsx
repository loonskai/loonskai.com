import { ThemeProvider } from '../context/theme';

import '../styles/index.css';

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <ThemeProvider>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
