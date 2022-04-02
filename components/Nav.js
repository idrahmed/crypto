import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Nav.module.scss";
import { BiNews } from "react-icons/bi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AppBar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Trending from "./Trending";
import { darkTheme } from "../config/theme";

const Nav = ({ currency, setCurrency }) => {
  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Link href="/">
              <a>
                <h2>CryptoVerse</h2>
              </a>
            </Link>
            <div className={styles.right}>
              <div>
                <Select
                  value={currency}
                  variant="outlined"
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    width: "100px",
                    height: "35px",
                    marginRight: 15,
                  }}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"AUD"}>AUD</MenuItem>
                </Select>
              </div>

              <div className={styles.nav__items}>
                <Link href="/news">
                  <a
                    style={{ color: router.pathname == "/news" ? "white" : "" }}
                  >
                    <BiNews />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Trending currency={currency} />
        </div>
      </AppBar>
    </ThemeProvider>
  );
};

export default Nav;
