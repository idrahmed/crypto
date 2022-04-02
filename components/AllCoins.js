import { useState, useEffect } from "react";
import { getCoinList } from "../config/api";
import { numberWithCommas } from "../config/utils";
import { darkTheme } from "../config/theme";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/AllCoins.module.scss";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
} from "@mui/material";
import router from "next/router";

const AllCoins = ({ currency }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(getCoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  return (
    <div className={styles.container}>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <TextField
            label="Search for a currency..."
            variant="outlined"
            style={{ margin: "20px 0px", width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <TableContainer>
            {loading ? (
              <LinearProgress style={{ background: "#BB86FC" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#BB86FC" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: ".9rem",
                          }}
                          key={head}
                          align={head === "Coin" ? "left" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody className={styles.row}>
                  {handleSearch()
                    .slice((page - 1) * 20, (page - 1) * 20 + 20)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          key={row.id}
                          onClick={() => router.push(`/coin/${row.id}`)}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <Image
                              src={row?.image}
                              alt="img"
                              height={30}
                              width={35}
                              style={{ marginBottom: 10 }}
                              objectFit="contain"
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: "1.1rem",
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span
                                style={{ color: "darkgrey", fontSize: ".8rem" }}
                              >
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {`$${row.current_price.toFixed(2)}`}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit
                                ? "rgb(14,203,129)"
                                : "rgb(224, 107, 107)",
                            }}
                          >
                            {profit && "+"}
                            {`${row.price_change_percentage_24h.toFixed(2)}%`}
                          </TableCell>
                          <TableCell align="right">
                            {`$${numberWithCommas(row.market_cap)}`}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            onChange={(_, value) => {
              setPage(value);
              window.scroll({
                top: 0,

                behavior: "smooth",
              });
            }}
            className={styles.pagination}
            count={parseInt((handleSearch().length / 20).toFixed(0))}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default AllCoins;
