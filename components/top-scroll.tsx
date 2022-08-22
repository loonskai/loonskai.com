import { PropsWithChildren, ReactNode, useState, useEffect } from 'react'
import { css, useTheme } from '@emotion/react'
import ArrowUpIcon from '../public/assets/icons/arrow-up.svg'
import { svgIconHover } from '../shared/styles'

const heightMarker = 1000
const cssVisible = css`
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
`
const cssHidden = css`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
`

export const TopScroll = ({ children }: PropsWithChildren<ReactNode>): JSX.Element => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > heightMarker) {
      setVisible(true)
    } else if (scrolled <= heightMarker) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  })

  return (
    <>
      {children}
      <button
        css={[
          css`
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            border: none;
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: ${theme.text.primary};
            box-shadow: rgba(51, 51, 51, 0.1) 0px 32px 64px 0px;

            ${svgIconHover}
          `,
          visible ? cssVisible : cssHidden,
        ]}
        onClick={scrollToTop}
      >
        <ArrowUpIcon
          css={css`
            width: 1.5rem;
            height: 1.5rem;
            fill: ${theme.background.secondary};
          `}
        />
      </button>
    </>
  )
}
