import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { utils } from '@nx-workspace/utils';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to pro-site!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
        {utils}
      </main>
    </>
  );
}

export default CustomApp;
