import { FC } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import Header from "../components/header";

import "semantic-ui-css/semantic.min.css";
import "../public/css/main.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
