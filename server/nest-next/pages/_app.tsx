import { FC } from "react";
import type { AppProps } from "next/app";
import Header from "../components/header";

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
