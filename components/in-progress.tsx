import { css } from '@emotion/react';
import { sans } from '../shared/fonts';

export const InProgress = (): JSX.Element => (
  <p
    css={css`
      justify-self: center;
      flex: 1;
      text-align: center;
      ${sans}
    `}
  >
    Coming soon
  </p>
); 
