import { FormEvent, ChangeEvent, useState } from 'react';
import jsonp from 'jsonp';

export const SubscribeForm = (): JSX.Element => {
  const [ error, setError ] = useState(false);
  const [ pending, setPending ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ firstName, setFirstName ] = useState('Sergio');
  const [ email, setEmail ] = useState('loonskai.study.1@gmail.com');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(false);
    const url = new URL(process.env.NEXT_PUBLIC_SUBSCRIPTION_URL);
    url.searchParams.set('FNAME', firstName || 'Anonymous Friend');
    url.searchParams.set('EMAIL', email);
    url.searchParams.set('c', '?');

    jsonp(url.toString(), { param: 'c' }, (err, data) => {
      setPending(false);
      if (err || (data && data.result === 'error')) {
        console.log('Oops, something went wrong');
        setError(true);
      } else {
        setSuccess(true);
      }
    });
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    if (name === 'name') setFirstName(value);
    if (name === 'email') setEmail(value);
  };

  if (success) return (
    <div>
      Thanks for subscribing! Sure you will enjoy!
    </div>
  );

  return (
    <div>
      <form onSubmit={submit}>
        <label>
        Your First name:
          <input type="text" name="name" onChange={change} value={firstName} />
        </label>
        <label>
        Your Email:
          <input type="email" name="email" onChange={change} value={email} />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? 'Almost there...' : 'Subscribe'}
        </button>
      </form>
      {error && <div>
        {'Opps, something went wrong :( Maybe you already have a subscription? Anyway, don\'t hesitate to contact me at '}
        <a href="mailto:loonskai@gmail.com">loonskai@gmail.com</a>
      </div>}
    </div>
  );
};
