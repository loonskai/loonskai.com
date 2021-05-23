import { css } from '@emotion/react';
import { sans } from '../shared/fonts';

export const InProgress = (): JSX.Element => (
  <div
    css={css`
      justify-self: center;
      flex: 1;
      text-align: center;
    `}
  >
    <p css={sans}>This resource is currently in progress.</p>
  </div>
); 
