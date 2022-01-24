import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head></Head>
        <body className="dark:bg-slate-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
