import Head from 'next/head';
// import { useRouter } from 'next/router';

type Props = {
  title: string
  description: string
}

export const CustomHead = ({ title, description }: Props): JSX.Element => {
  // const { asPath } = useRouter();
  // const currentUrl = process.env.NEXT_PUBLIC_BASE_URL + asPath;

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
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content="Siarhei Lunski" />
      <meta name="image" content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/cover.jpg'} />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content={currentUrl} /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/cover.jpg'} />
      <meta property="og:image:secure_url" content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/cover.jpg'} />
      <meta property="og:site_name" content="loonskai.com" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:site" content="@loonskai" />
      <meta name="twitter:creator" content="@loonskai" />
      {/* <meta property="twitter:url" content={currentUrl} /> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={process.env.NEXT_PUBLIC_BASE_URL + '/assets/cover.jpg'} />
    </Head>
  );
}; 
