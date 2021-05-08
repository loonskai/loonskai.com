import { themes } from '../../../context/theme';
import styles from './styles.module.css';

type Props = {
  theme: string
  toggleTheme(string): void
}

// const THEME_TOGGLER_ID = 'theme_toggler';

export function ThemeToggler({ theme, toggleTheme }: Props): JSX.Element {
  // const theme = useContext(ThemeContext);
  // const [ theme, toggleTheme ] = useTheme();
  const darkThemeActive = theme === themes.dark;
  const handleClick = () => {
    // const pressed = e.target.getAttribute('aria-pressed') === 'true';
    // e.target.setAttribute('aria-pressed', String(!pressed));
    toggleTheme(darkThemeActive ? themes.light : themes.dark);
  };
  
  return (
    // <div className={styles.toggle}>
    //   <label className={styles['check-trail']} htmlFor={THEME_TOGGLER_ID}>
    //     <span className={styles['check-handler']} />
    //   </label>
    //   <input type="checkbox" value={theme} id={THEME_TOGGLER_ID} onChange={toggleTheme} />
    // </div>
    <button className={styles.toggle} type="submit" aria-pressed={darkThemeActive} onClick={handleClick}>
      <span />
      {/* {`${darkThemeActive ? 'Light' : 'Dark'} mode`} */}
    </button>
  );
}
