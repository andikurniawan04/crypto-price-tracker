import React, { useState } from "react";
import { TableHead, TableRow, TableCell, Box, TablePagination } from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tableText: {
        color: "#FFF",
    },
    sortContainer: {
        cursor: "pointer",
    },
    tablePage: {
        color: "#FFF",
    }
}));

const invertDirection = {
    asc: "desc",
    desc: "asc"
};

export default function useTable() {
    const [columnToSort, setColumnToSort] = useState("");
    const [sortDirection, setSortDirection] = useState("desc");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const classes = useStyles();

    const TableHeader = ({ header }) => {
        const handleSort = (columnName) => {
            setColumnToSort(columnName);
            setSortDirection(
                columnToSort === columnName
                    ? invertDirection[sortDirection]
                    : "asc"
            )
        }
        return (
            <TableHead>
                <TableRow>
                    {header.map((row, i) => (
                        <TableCell className={classes.tableText} key={i}>
                            <Box display="flex" onClick={() => handleSort(row.id)} className={classes.sortContainer}>
                                <span>{row.name}</span>
                                {columnToSort === row.id ? (
                                    sortDirection === "asc" ? (
                                        <ArrowDropUp />
                                    ) : (

                                        <ArrowDropDown />
                                    )
                                ) : null}
                            </Box>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    const TablePage = React.memo(({ counts, pageOption }) => {
        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        return (
            <TablePagination
                classes={{
                    root: classes.tablePage,
                    selectIcon: classes.tablePage,
                }}
                rowsPerPageOptions={pageOption}
                component="div"
                count={counts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        )
    })
    return {
        columnToSort,
        sortDirection,
        TableHeader,
        page,
        rowsPerPage,
        TablePage
    }
}