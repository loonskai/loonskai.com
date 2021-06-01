import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title: string
  description: string
}

export const CustomHead = ({ title, description }: Props): JSX.Element => {
  const { asPath } = useRouter();
  const currentUrl = process.env.NEXT_PUBLIC_BASE_URL + asPath;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#51e8a7" />
      <meta name="image" content="/assets/cover.jpg" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/assets/cover.jpg" />
      <meta name="author" content="Siarhei Lunski" />
      <meta property="og:site_name" content="Siarhei Lunski" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:site" content="@loonskai" />
      <meta name="twitter:creator" content="@loonskai" />
    </Head>
  );
}; 
