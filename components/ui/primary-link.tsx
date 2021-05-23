import { forwardRef } from 'react';
import { css, useTheme } from '@emotion/react';

const PrimaryLinkComponent = forwardRef<HTMLLinkElement, any>(({ children, ...props }, ref) => {
  const theme = useTheme();

  return (
    <a
      ref={ref}
      css={css`
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        text-decoration: none;
        font-weight: 700;
        cursor: pointer;
        color: ${theme.buttons.color};
        background-color: ${theme.buttons.background};
        border-radius: 0.5rem;
      `}
      {...props}
    >
      {children}
    </a>
  );
});

PrimaryLinkComponent.displayName = 'PrimaryLink';

export const PrimaryLink = PrimaryLinkComponent;

