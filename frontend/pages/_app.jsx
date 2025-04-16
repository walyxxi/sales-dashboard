import "@/styles/globals.css"
import Head from "next/head";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sales Dashboard</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
