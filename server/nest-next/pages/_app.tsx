import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import Header from '../components/header';

import 'semantic-ui-css/semantic.min.css'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Header />
  );
};

export default MyApp;
