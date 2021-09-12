import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Box, Container, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import orderBy from "lodash/orderBy";
import axios from "axios";
import header from "data/Exchange.json";
import useTable from "components/Table/Table";

const useStyles = makeStyles((theme) => ({
    tableText: {
        color: "#FFF",
    },
    tableRow: {
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#343438"
        }

    }
}));

const Exchange = () => {
    const [exchanges, setExchanges] = useState([]);

    const { columnToSort, sortDirection, TableHeader, page, rowsPerPage, TablePage } = useTable();

    const classes = useStyles();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, exchanges.length - page * rowsPerPage);

    const handleClick = (link) => {
        window.open(link, "_blank");
    }

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/exchanges")
            .then((res) => {
                setExchanges(res.data);

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
                            {orderBy(exchanges, columnToSort, sortDirection).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

                                <TableRow key={row.id} onClick={() => handleClick(row.url)} className={classes.tableRow}>
                                    <TableCell className={classes.tableText}>
                                        {row.trust_score_rank}
                                    </TableCell>
                                    <TableCell className={classes.tableText}>
                                        <Box display="flex">
                                            <Box paddingRight="10px">
                                                <img src={row.image} width="20px" height="20px" alt="icon" />
                                            </Box>
                                            <p>
                                                {row.name}
                                            </p>
                                        </Box>
                                    </TableCell>
                                    <TableCell className={classes.tableText}>
                                        {row.trust_score}
                                    </TableCell>
                                    <TableCell className={classes.tableText}>
                                        {row.year_established}
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
                    <TablePage counts={exchanges} pageOption={[10, 25, 50, 100]} />
                </TableContainer>
            </Container>
        </Box>
    )
}

export default Exchange;
