import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Box, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import orderBy from "lodash/orderBy";
import axios from "axios";
import header from "data/Coin.json";
import useTable from "components/Table/Table";


const useStyles = makeStyles((theme) => ({
  tableText: {
    color: "#FFF",
  },
  tableTextGreen: {
    color: "#11d811"
  },
  tableTextRed: {
    color: "#f00606"
  }
}));

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const { columnToSort, sortDirection, TableHeader, page, rowsPerPage, TablePage } = useTable();

  const classes = useStyles();

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, coins.length - page * rowsPerPage);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false")
      .then((res) => {
        setCoins(res.data);

      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box bgcolor="#1a1a1c" color="#FFF">

      <Container>
        <TableContainer>
          <Table>
            <TableHeader header={header} />
            <TableBody>
              {orderBy(coins, columnToSort, sortDirection).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

                <TableRow key={row.id}>
                  <TableCell className={classes.tableText}>
                    <Box display="flex">
                      <Box paddingRight="10px">
                        <img src={row.image} width="20px" height="20px" alt="icon" />
                      </Box>
                      <p>
                        {row.name} <span>({row.symbol})</span>
                      </p>
                    </Box>
                  </TableCell>
                  <TableCell className={classes.tableText}>
                    $ {row.current_price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </TableCell>
                  <TableCell>
                    {row.price_change_percentage_24h < 0 ?
                      <p className={classes.tableTextRed}>{row.price_change_percentage_24h.toFixed(2)}%</p>
                      : <p className={classes.tableTextGreen}>{row.price_change_percentage_24h.toFixed(2)}%</p>
                    }
                  </TableCell>
                  <TableCell className={classes.tableText}>
                    $ {row.total_volume.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </TableCell>
                  <TableCell className={classes.tableText}>
                    $ {row.market_cap.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePage counts={coins} pageOption={[10, 25, 50, 100]} />
        </TableContainer>
      </Container>
    </Box>
  );
};

export default React.memo(Coin);
