import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const baseUrl = process.env.REACT_APP_API_URL;
const apiUrl = `/api/`;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export const BasicTable = () => {
    const classes = useStyles();
    const [videos, setVideos] = useState<string[]>([]);
    useEffect(() => {
        fetch("/api/videos")
            .then(data => data.json())
            .then(data => setVideos(data));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videos.map((row) => (
                        <TableRow key={row}>
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    onClick={() => fetch(`/api/videos/${row}`, { method: "POST" })}>
                                        PLAY
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasicTable;
