import { FormEvent, ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import { css, Theme, useTheme } from '@emotion/react'
import { focusOutline } from '../shared/styles'
import { PrimaryButton } from './ui/primary-button'

const StyledSubscribeFormContainer = styled.div(
  ({ theme }) => css`
    max-width: 400px;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    background: ${theme.background.secondary};
    box-shadow: rgba(51, 51, 51, 0.1) 0px 32px 64px 0px;
    border-radius: 1.5rem;
    padding: 1rem 2rem;
  `,
)

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  text-align: left;
`

const StyledLabelText = styled.span<{
  theme: Theme
  required?: boolean
}>(
  ({ theme, required }) => css`
    position: relative;
    font-style: italic;
    margin-right: 1rem;
    flex-basis: 30%;
    text-align: right;

    & > span {
      position: relative;
    }

    ${required &&
    `
    & > span:after {
      content: ' *';
      width: 1rem;
      height: 1rem;
      display: block;
      position: absolute;
      color: ${theme.errorColor};
      top: -0.5rem;
      left: -1.2rem;
  }`}
  `,
)

const StyledInput = styled.input(
  ({ theme }) => css`
    padding: 0.4rem;
    border: none;
    border-radius: 0.4rem;
    box-shadow: 0 0 0 2px ${theme.background.primary};
    font-size: 1rem;
    flex: 1;
    transition: all ease 0.3s;
    font-weight: 600;
    color: ${theme.inputs.text.color};

    ${focusOutline}
  `,
)

export const SubscribeForm = (): JSX.Element => {
  const theme = useTheme()

  const [error, setError] = useState(false)
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setPending(true)
    setError(false)

    fetch(process.env.NEXT_PUBLIC_SUBSCRIPTION_URL, {
      method: 'post',
      body: JSON.stringify({
        first_name: firstName || 'Anonymous Friend',
        email_address: email,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then(
        () => {
          setPending(false)
          setSuccess(true)
        },
        () => {
          setError(true)
        },
      )
      .finally(() => {
        setPending(false)
      })
  }

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    if (name === 'name') setFirstName(value)
    if (name === 'email') setEmail(value)
  }

  return (
    <StyledSubscribeFormContainer theme={theme}>
      <h3
        css={css`
          font-size: 1.7rem;
          line-height: 2.25rem;
          text-align: center;
        `}
      >
        Subscribe for updates
      </h3>
      {success ? (
        <div
          css={css`
            font-size: 1.3rem;
            text-align: center;
            margin: 1.4rem;
          `}
        >
          Thank you! Check your email to confirm subscription.
        </div>
      ) : (
        <>
          <div
            css={css`
              margin: 0.725rem 0;
              line-height: 1.4rem;
              text-align: center;
            `}
          >
            Do you like the content? Join the newsletter so you never miss when something new
            appears here. You can unsubscribe any time.
          </div>
          <StyledForm theme={theme} onSubmit={submit}>
            <StyledLabel>
              <StyledLabelText theme={theme}>Your First name:</StyledLabelText>
              <StyledInput type='text' name='name' onChange={change} value={firstName} />
            </StyledLabel>
            <StyledLabel>
              <StyledLabelText required theme={theme}>
                <span>Your Email:</span>
              </StyledLabelText>
              <StyledInput type='email' name='email' onChange={change} value={email} required />
            </StyledLabel>
            <PrimaryButton type='submit' disabled={pending || !email}>
              {pending ? 'Almost there...' : 'Subscribe'}
            </PrimaryButton>
          </StyledForm>
          {error && (
            <div
              css={css`
                font-size: 0.9rem;
                text-align: center;
                padding: 0.75rem;
                font-style: italic;
                line-height: 1.4;
                color: ${theme.errorColor};

                & a {
                  font-weight: 600;
                  color: ${theme.errorColor};
                }
              `}
            >
              {
                "Opps, something went wrong :( Maybe you already have a subscription? Anyway, don't hesitate to contact me at "
              }
              <a href='mailto:loonskai@gmail.com'>loonskai@gmail.com</a>
            </div>
          )}
        </>
      )}
    </StyledSubscribeFormContainer>
  )
}
