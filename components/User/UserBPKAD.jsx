import Head from "next/head";
import React, { useState, useEffect } from 'react';
import Router from "next/router"
import axios from 'axios';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import swal from '@sweetalert/with-react'
import Breadcrumbs from "../../components/Breadcrumbs"
import { isAuthenticated, unauthenticateUser } from '../../auth'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Container from "@mui/material/Container";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { CircularProgress } from "@mui/material";

export default function UserSKPD() {

    const authenticated = isAuthenticated()
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(true)
  
    const [listUserOPD, setListUserOPD] = useState([]);
 
    const listUser = async () => {
        setProgress(true)

        try {
            let url = `${process.env.DB_API}user/list`

            //   alert(url)
            const response = await axios.get(url, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                setProgress(false)
                setListUserOPD(response.data)

            }

        } catch (error) {

            swal({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
                button: "batal",
            });
            setProgress(true)
        }
    }


    
    useEffect(() => {
        listUser()
    }, [])


  
    return (
        <>
            <Head>
                <title>SIMSP2D</title>
                <meta name="description" content="BPKAD Kota Palembang" />
                <link rel="icon" href="../../simsp2d/assets/img/logo.png" />
            </Head>


            <div className="">
                <Container fixed>
                    <Grid container spacing={2}>
                   
                        <Grid item xs={12}>
                            <div className="">
                                <div className="">
                                    <div className="heading">
                                        <h3>List User</h3>

                                        <div className="submit">
                                   
                                            <Button href="users/tambahUser" type="button" className="button-bpkad" > User SKPD</Button>
                                       
                                        </div>
                                    </div>

                                    
                                 
                                    <ToastContainer />
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nama Dinas</TableCell>
                                                    <TableCell >Tanggal</TableCell>
                                                    <TableCell >Status</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {progress === true ? <CircularProgress /> : listUserOPD.data.map((row) => (
                                                    <TableRow
                                                        key={row._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.skpd ? row.skpd.namaSkpd : "Tidak ada"}
                                                        </TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell><Alert severity={row.status === 'Pending' ? "error" : "success"}>{row.status}</Alert></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </Container>
            </div>

        </>
    );
}
