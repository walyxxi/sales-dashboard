import ErrorPopup from "@/components/Error/ErrorPopup";
import { ErrorProvider } from "@/components/Error/ErrorProvider";
import "@/styles/globals.css"
import Head from "next/head";
import PropTypes from "prop-types";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sales Dashboard</title>
      </Head>
      <ErrorProvider>
        <ErrorPopup />
        <Component {...pageProps} />
      </ErrorProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
