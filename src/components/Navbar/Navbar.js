import React from 'react';
import { Typography, Link, Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Glory',
        color: "#FFB319",
        '&:hover': {
            textDecoration: 'none'
        }
    },
    link: {
        color: '#CCC',
        fontSize: "1.2em",
        position: "relative",
        '&::after': {
            content: '""',
            position: "absolute",
            backgroundColor: "#FFB319",
            height: "3px",
            width: 0,
            left: 0,
            bottom: "-10px",
            transition: "0.3s",
        },

        '&:hover': {
            textDecoration: 'none',
            color: "#FFF"
        },
        '&:hover:after': {
            width: "100%",

        }

    }
}));

const Navbar = () => {
    const classes = useStyles();
    return (
        <Box className="container" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor="#1a1a1c">
            <Container>
                <Box color="#FFB319" textAlign="center" >
                    <Typography variant="h2">
                        <Link href="/" className={classes.title}>Cryptcoin</Link>
                    </Typography>
                </Box>
                <Box display="flex" margin="15px 0px" justifyContent="space-around">
                    <Link href="/" className={classes.link}>Home</Link>
                    <Link href="/exchange" className={classes.link}>Exchange</Link>
                    <Link href="/finance" className={classes.link}>Finance</Link>
                </Box>
            </Container>

        </Box>
    )
}

export default Navbar;
