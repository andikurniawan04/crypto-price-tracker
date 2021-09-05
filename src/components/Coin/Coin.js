import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Link, TablePagination } from "@material-ui/core";
import axios from "axios";

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, coins.length - page * rowsPerPage);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="App">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div>
                    <img src={row.image} width="20px" height="20px" />
                    <p>
                      {row.name} <span>{row.symbol}</span>
                    </p>
                  </div>
                </TableCell>
                <TableCell>$ {row.current_price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</TableCell>
                <TableCell>{row.price_change_percentage_24h < 0 ? <p className="red">{row.price_change_percentage_24h.toFixed(2)}%</p> : <p className="green">{row.price_change_percentage_24h.toFixed(2)}%</p>}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[5, 10]} component="div" count={coins.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
      </TableContainer>
    </div>
  );
};

export default Coin;
