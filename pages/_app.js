import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [currency, setCurrency] = useState("USD");

  return (
    <Layout currency={currency} setCurrency={setCurrency}>
      <Component {...pageProps} currency={currency} />
    </Layout>
  );
}

export default MyApp;
