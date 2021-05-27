import { css } from '@emotion/react';
import { THEME, whiteColor, blackColor } from '../../shared/themes';
import { focusOutline } from '../../shared/styles';

type Props = {
  activeTheme: THEME
  toggleTheme(string): void
}

const SIZE = '20px';
const MARGIN = '5px';

const toggle = css`
	width: ${SIZE}; 
	height: ${SIZE};
	position: absolute;
	top: ${MARGIN};
	border-radius: 50%;
	z-index: 5;
`;

const toggleDark = css`
  ${toggle}
	background-color: ${blackColor};
	left: ${MARGIN};
`;
	
const toggleLight = css`
  ${toggle}
	background-color: ${whiteColor};
	right: ${MARGIN};
`;

const ripple = css`
	width: ${SIZE}; 
	height: ${SIZE};
	position: absolute;
	top: ${MARGIN};
	border-radius: 50%;
`;

const rippleDark = css`
  ${ripple}
	background-color: ${blackColor};
	left: ${MARGIN};
`;

const rippleLight = css`
  ${ripple}
	background-color: ${whiteColor};
	right: ${MARGIN};
`;

const btn = css`
	position: relative;
	box-sizing: border-box;
	border: none;
	margin: 0; padding: 0;
	width: 60px; 
  height: 30px;
	background-color: ${whiteColor};
	border-radius: calc(126px / 2);
	box-shadow: rgba(51, 51, 51, 0.1) 0px 32px 64px 0px;
	overflow: hidden;
  cursor: pointer;
	
	${focusOutline}

	&:active {
		box-shadow: none;
	}
	
	& .ripple--dark {
		z-index: 1;
		transform: scale(4.8);
		transition: .6s ease;
	}

	& .ripple--light {
		z-index: 2;
		transform: scale(1);
		transition: z-index 0s .6s ease, transform 0s ease;
	}
`;

const btnChecked = css`
  ${btn}
	background-color: ${blackColor};

	& .ripple--dark {
		z-index: 2;
		transform: scale(1);
		transition: z-index 0s .6s ease, transform 0s ease;
	}

	& .ripple--light {
		z-index: 1;
		transform: scale(4.8);
		transition: .6s ease;
	}
`;

export const ThemeToggler = ({ activeTheme, toggleTheme }: Props): JSX.Element => {
  const darkThemeActive = activeTheme === THEME.DARK;

  return (
    <button
      css={darkThemeActive ? btnChecked : btn}
      onClick={toggleTheme} 
    >
      <div css={rippleDark} className="ripple--dark" />
      <div css={rippleLight} className="ripple--light" />
	
      <div css={toggleDark} className="toggle--dark" />
      <div css={toggleLight} className="toggle--light" />
    </button>
  );
};
