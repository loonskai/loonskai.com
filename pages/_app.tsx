import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Layout } from '../components/layout';

import { resetStyles } from '../shared/styles';
import { themeValues, THEME } from '../shared/themes';

const App = ({ Component, pageProps }): JSX.Element => {
  const [ activeTheme, setActiveTheme ] = useState<THEME>(THEME.LIGHT);
  const toggleTheme = () => {
    setActiveTheme(activeTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  };

  return (
    <ThemeProvider theme={themeValues[activeTheme]}>
      {resetStyles}
      <Layout activeTheme={activeTheme} toggleTheme={toggleTheme}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}; 

export default App;
