import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Layout } from '../components/layout';
import { resetStyles, globalStyles } from '../shared/styles';
import { themeValues, THEME } from '../shared/themes';
import { useStickyState } from '../lib/hooks/useStickyState';

const App = ({ Component, pageProps }): JSX.Element => {
  const [ mode, setMode ] = useStickyState(THEME.LIGHT, 'mode');
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, []);

  const toggleTheme = () => {
    const themeToSet = mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    setMode(themeToSet);
  };

  return mounted && (
    <ThemeProvider theme={themeValues[mode]}>
      {resetStyles}
      {globalStyles}
      <Layout activeTheme={mode} toggleTheme={toggleTheme}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
