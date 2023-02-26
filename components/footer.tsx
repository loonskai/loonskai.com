import { css } from '@emotion/react'
import { SubscribeForm } from '../components/subscribe-form'
import { ContactLinks } from '../components/contact-links'

type Props = {
  displaySubscriptionForm?: boolean
}

export const Footer = ({ displaySubscriptionForm }: Props): JSX.Element => {
  return (
    <footer
      css={css`
        padding: 2rem 0;
      `}
    >
      <section
        css={css`
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;
        `}
      >
        {displaySubscriptionForm && <SubscribeForm />}
        <div
          css={css`
            width: 100%;
          `}
        >
          <h3
            css={css`
              font-size: 1.7rem;
              line-height: 2.25rem;
            `}
          >
            Contact me:
          </h3>
          <ContactLinks />
        </div>
        <div
          css={css`
            width: 100%;
          `}
        >
          <div
            css={css`
              font-weight: 600;
            `}
          >
            © Siarhei Lunski, {new Date().getFullYear()}
          </div>
        </div>
      </section>
    </footer>
  )
}
