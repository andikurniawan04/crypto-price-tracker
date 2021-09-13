import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Box, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import orderBy from "lodash/orderBy";
import axios from "axios";
import header from "data/Finance.json";
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

const Finance = () => {
    const [finances, setFinances] = useState([]);

    const { columnToSort, sortDirection, TableHeader, page, rowsPerPage, TablePage } = useTable();

    const classes = useStyles();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, finances.length - page * rowsPerPage);

    const handleClick = (link) => {
        window.open(link, "_blank");
    }

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/finance_platforms")
            .then((res) => {
                setFinances(res.data);

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
                            {orderBy(finances, columnToSort, sortDirection).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

                                <TableRow key={row.name} onClick={() => handleClick(row.website_url)} className={classes.tableRow}>
                                    <TableCell className={classes.tableText}>{row.name}</TableCell>
                                    <TableCell className={classes.tableText}>{row.category}</TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePage counts={finances} pageOption={[10, 25, 50, 100]} />
                </TableContainer>
            </Container>
        </Box>
    )
}

export default Finance;
