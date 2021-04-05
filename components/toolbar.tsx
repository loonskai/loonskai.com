import { useContext } from 'react';
import { ThemeContext, themes } from './layout';

type Props = {
  toggleTheme(e: React.ChangeEvent<HTMLInputElement>): void
}

export default function Toolbar({ toggleTheme }: Props): JSX.Element {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <form>
        <fieldset
          tabIndex={0}
          role="radiogroup"
        >
          <label>
            <input
              type="radio"
              checked={theme === themes.dark}
              value={themes.dark}
              name="theme"
              onChange={toggleTheme}
            />
          Dark
          </label>
          <label>
            <input
              type="radio"
              checked={theme === themes.light}
              value={themes.light}
              name="theme"
              onChange={toggleTheme}
            />
            Light
          </label>
        </fieldset>
      </form>
    </div>
  );
}
