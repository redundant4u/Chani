import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';

import Header from './components/header';
import Footer from './components/footer';
import '../public/css/main.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;