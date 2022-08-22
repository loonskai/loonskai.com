import { css } from '@emotion/react'
import { visuallyHidden } from '../../shared/styles'
import SearchIcon from '../../public/assets/icons/search.svg'

export const SearchBar = (): JSX.Element => (
  <div
    css={css`
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0.75rem auto;
    `}
  >
    <form
      role='search'
      css={css`
        position: relative;
        background: white;
        padding: 0.5rem;
        padding-left: 2.25rem;
        border-radius: 0.5rem;
      `}
    >
      <input type='search' aria-label='Search bar' />
      <label>
        <input css={visuallyHidden} type='submit' />
        <SearchIcon
          css={css`
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0.5rem;
            margin: auto;
          `}
        />
      </label>
    </form>
  </div>
)
