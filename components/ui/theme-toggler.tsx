import { css } from '@emotion/react';
import { THEMES } from '../../shared/themes';

type Props = {
  activeTheme: string
  toggleTheme(string): void
}

export const ThemeToggler = ({ activeTheme, toggleTheme }: Props): JSX.Element => {
  const darkThemeActive = activeTheme === THEMES.DARK;

  return (
    <button
      css={css`
        background-color: #ffffff;
        height: 2rem;
        width: 4rem;
        border-radius: 1rem;
        position: relative;
        transition: all 0.5s ease-in-out;

        &::before {
          content: "";
          height: 2rem;
          width: 2rem;
          top: 0;
          left: 0;
          display: block;
          position: absolute;
          background-color: #000000;
          border-radius: 50%;
          transition: 0.5s;
        }

        &[aria-pressed="true"] {
          background-color: #9d9d9d;
        }

        &[aria-pressed="true"]::before {
          background-color: #FFFFFF;
        }

        &[aria-pressed="true"]::before {
          left: auto;
          right: 0;
        }
      `}
      aria-pressed={darkThemeActive}
      type="submit"
      onClick={toggleTheme}
    >
      <span />
    </button>
  );
};
