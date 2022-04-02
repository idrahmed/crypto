import React from "react";
import Nav from "./Nav";
import styles from "../styles/Layout.module.scss";

const Layout = ({ children, currency, setCurrency }) => {
  return (
    <div className={styles.container}>
      <Nav currency={currency} setCurrency={setCurrency} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
