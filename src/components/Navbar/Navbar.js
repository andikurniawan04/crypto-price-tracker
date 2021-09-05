import React from 'react';
import { Typography, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import styles from "./Navbar.module.css";

const useStyles = makeStyles((theme) => ({
    // title: {
    //     fontFamily: "Courier Prime", monospace,
    // },
    link: {
        color: '#FFF',
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

const Navbar = () => {
    const classes = useStyles();
    return (
        <Box className="container" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor="#1a1a1c">
            <Box color="#F7931A" textAlign="center" fontStyle="italic">
                <Typography variant="h2">crypto</Typography>
            </Box>
            <Box display="flex" justifyContent="center" justifyContent="space-around" bgcolor="red" width="80%">
                <Link href="#" className={classes.link}>Home</Link>
                <Link href="#">Trending</Link>
            </Box>
        </Box>
    )
}

export default Navbar
