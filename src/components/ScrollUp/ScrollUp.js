import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    container: {
        position: "fixed",
        bottom: 5,
        right: 0,
        marginRight: "25px",
        marginBottom: "10px",
        [theme.breakpoints.down("md")]: {
            marginBottom: "50px",
            marginRight: "10px"
        }

    },
    icon: {
        fontSize: "1.5em",
        color: "#000",
        backgroundColor: "#FFF",
        borderRadius: "25%"

    }
}));

const ScrollUp = ({ showScroll }) => {
    const classes = useStyles();

    const [show, setShow] = useState(showScroll ? false : true);

    const handleScroll = () => {
        if (window.pageYOffset > showScroll) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window["scrollTo"]({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        if (showScroll) {
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }

    })
    return (
        <div className={classes.container}>
            {show &&
                <IconButton onClick={handleClick}>
                    <ExpandLess className={classes.icon} />
                </IconButton>

            }



        </div>
    )
}

export default ScrollUp
