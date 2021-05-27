import { css, useTheme } from '@emotion/react';
import { PropsWithChildren, ReactNode } from 'react';
import { focusOutline } from '../../shared/styles';

type Props = PropsWithChildren<ReactNode | any>

export const primaryButtonCss = css`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0.5rem;
  border: none;
  transition: all ease 0.3s;
`;

export const PrimaryButton = ({ children, ...props }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <button
      {...props}
      css={css`
        ${primaryButtonCss}
        text-transform: uppercase;
        font-size: 1rem;
        justify-content: center;
        color: ${theme.buttons.default.color};
        background-color: ${theme.buttons.default.background};

        &:hover {
          color: ${theme.buttons.hover.color};
          background-color: ${theme.buttons.hover.background};
        }

        &:disabled {
          cursor: default;
          color: ${theme.buttons.disabled.color};
          background-color: ${theme.buttons.disabled.background};
        }

        ${focusOutline}
      `}
    >{children}</button>
  );
}; 
