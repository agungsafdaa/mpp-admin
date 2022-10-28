/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'
import Router from "next/router"
import Cookies from 'js-cookie'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
export default function KategoriBidang() {
    const router = useRouter()
    const MySwal = withReactContent(Swal)

    const [progress, setProgress] = useState(false);
    const [kecamatan, setKecamatan] = useState([])
    const [open, setOpen] = useState(false);
    const idDinas = router.query.idDinas
    let nomor = 1;
    const [searchedVal, setSearchedVal] = useState("");
    const listKecamatan = async () => {
        setProgress(true)

        try {
            let url = `${process.env.DB_API}kecamatan-kelurahan/list-kecamatan`
            const response = await axios.get(url, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                setProgress(false)
                setKecamatan(response.data.data)

            }

        } catch (error) {
            MySwal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
                button: "batal",
            });
            setProgress(true)
        }
    }



    useEffect(() => {


        listKecamatan()
    }, []);


    return (
        <>
            <Head>
                <title>MPP Admin</title>
                <meta name="description" content="DLHK Kota Palembang" />
                <link rel="icon" href="../img/logo.png" />
            </Head>
            <div className="container-mpp">
                <Card className="card-mpp kategori-dinas">
                    <CardContent>
                        <div className="heading">
                            <h3>Kecamatan dan Kelurahan</h3>
                            <div className="action">
                                <Button className="button-mpp" variant="contained">
                                    <Button underline="hover"
                                        color="inherit"
                                        onClick={() => Router.push(`/kecamatan-kelurahan/tambah-kecamatan`, undefined, { shallow: true })}  >
                                        Tambah
                                    </Button>
                                </Button>
                                <Paper
                                    component="form"
                                    className="shadow-none form-mpp"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search "
                                        onChange={e => setSearchedVal(e.target.value)}
                                        inputProps={{ 'aria-label': 'search ' }}
                                    />
                                    <IconButton type="button" aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                        </div>
                        <TableContainer component={Paper} className="table-mpp shadow-none">
                            <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell >Kelurahan</TableCell>
                                        <TableCell >Nama Kecamatan</TableCell>
                                        <TableCell >Status</TableCell>
                                        <TableCell >Aksi</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {progress === true ?
                                        <>
                                            <TableRow>
                                                <TableCell>
                                                    <Skeleton animation="wave" />
                                                </TableCell>
                                                <TableCell >
                                                    <Skeleton animation="wave" />
                                                </TableCell>
                                                <TableCell >
                                                    <Skeleton animation="wave" />
                                                </TableCell>
                                                <TableCell >
                                                    <Skeleton animation="wave" />
                                                </TableCell>
                                                <TableCell >
                                                    <Skeleton animation="wave" />
                                                </TableCell>
                                            </TableRow>


                                        </>
                                        :
                                        kecamatan.length === 0 ?
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>Tidak ada Data</TableCell>
                                            </TableRow>
                                            :
                                            kecamatan.filter((row) =>

                                                !searchedVal.length || row.namaKecamatan
                                                    .toString()
                                                    .toLowerCase()
                                                    .includes(searchedVal.toString().toLowerCase())
                                            ).map((row) => (
                                                row ?
                                                    <>
                                                        <TableRow
                                                            key={row._id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            className={row.isActive === false ? 'row-inactive' : ''}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {nomor++}
                                                            </TableCell>

                                                            <TableCell>
                                                                <IconButton
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={() =>
                                                                        setOpen((prev) => ({ ...prev, [row._id]: !prev[row._id] }))
                                                                    }
                                                                >
                                                                    {open[row._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                </IconButton>
                                                            </TableCell>
                                                            <TableCell >{row.namaKecamatan}</TableCell>
                                                            <TableCell>
                                                                <Typography className={row.isActive === true ? 'text-green' : 'text-red'}>
                                                                    {row.isActive === true ? 'Active' : 'Inactive'}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="action">

                                                                    <button>
                                                                        <a onClick={() => Router.push({
                                                                            pathname: "/kecamatan-kelurahan/edit-kecamatan/",
                                                                            query: {
                                                                                namaKecamatan: row.namaKecamatan,
                                                                                statusKecamatan: row.isActive,
                                                                                idKecamatan: row._id
                                                                            },
                                                                        })}>
                                                                            <EditIcon />
                                                                        </a></button>
                                                                    <button>
                                                                        <a>
                                                                            <DeleteIcon />
                                                                        </a>
                                                                    </button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow className="table-expand" key={row.namaKecamatan}>
                                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                <Collapse in={open[row._id]} timeout="auto" unmountOnExit  >
                                                                    {open[row._id] &&
                                                                        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                                                                            <Typography sx={{ color: 'rgba(70, 78, 95, 0.7);', fontSize: '14px;' }} gutterBottom >
                                                                                Jumlah Kelurahan
                                                                            </Typography>
                                                                            <Typography sx={{ fontSize: '16px' }} gutterBottom component="div">
                                                                                {row.Kelurahan.length} Kelurahan
                                                                            </Typography>
                                                                            <div className="action">
                                                                                <button underline="hover"
                                                                                    color="inherit"
                                                                                    className="button-outline-mpp"
                                                                                    onClick={() => Router.push(`/kecamatan-kelurahan/tambah-kelurahan/?namaKecamatan=${row.namaKecamatan}&idKecamatan=${row._id}`, undefined, { shallow: true })}  >
                                                                                    <a>
                                                                                        Tambah Kelurahan
                                                                                    </a>
                                                                                </button>
                                                                            </div>
                                                                            <Table className="table-mpp" sx={{ m: '20px 0' }} size="small" aria-label="purchases">
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell>No</TableCell>
                                                                                        <TableCell>Nama Seksi</TableCell>
                                                                                        <TableCell>Status</TableCell>
                                                                                        <TableCell>Aksi</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {row.Kelurahan.length === 0 ?
                                                                                        <TableRow

                                                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                        >
                                                                                            <TableCell component="th" scope="row">
                                                                                                Tidak ada seksi
                                                                                            </TableCell>

                                                                                        </TableRow>
                                                                                        : row.Kelurahan.map((kelurahan) => (

                                                                                            <TableRow
                                                                                                key={row._id}
                                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                                className={kelurahan.isActive === false ? 'row-inactive' : ''}
                                                                                            >
                                                                                                <TableCell component="th" scope="row">
                                                                                                    {nomor++}
                                                                                                </TableCell>
                                                                                                <TableCell>{kelurahan.namaKelurahan}</TableCell>
                                                                                                <TableCell>
                                                                                                    <Typography className={kelurahan.isActive === true ? 'text-green' : 'text-red'}>
                                                                                                        {kelurahan.isActive === true ? 'Active' : 'Inactive'}
                                                                                                    </Typography>
                                                                                                </TableCell>
                                                                                                <TableCell>
                                                                                                    <div className="action">
                                                                                                        <button>
                                                                                                            <a onClick={() => Router.push({
                                                                                                                pathname: "/kecamatan-kelurahan/edit-kelurahan/",
                                                                                                                query: {
                                                                                                                    namaKecamatan: row.namaKecamatan,
                                                                                                                    namaKelurahan: kelurahan.namaKelurahan,
                                                                                                                    statusKelurahan: kelurahan.isActive,
                                                                                                                    idKecamatan: row._id
                                                                                                                },
                                                                                                            })}>
                                                                                                                <EditIcon />
                                                                                                            </a></button>
                                                                                                        <button>
                                                                                                            <a>
                                                                                                                <DeleteIcon />
                                                                                                            </a>
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </TableCell>
                                                                                            </TableRow>
                                                                                        ))}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </Box>
                                                                    }
                                                                </Collapse>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                    :
                                                    <>
                                                        <a>a</a>
                                                    </>
                                            ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </CardContent>

                </Card>

            </div>
        </>
    )
}

