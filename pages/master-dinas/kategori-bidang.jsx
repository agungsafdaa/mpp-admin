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
import Pagination from '@mui/material/Pagination';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'
import Router from "next/router"
import Cookies from 'js-cookie'
import Skeleton from '@mui/material/Skeleton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
export default function KategoriBidang() {
  const router = useRouter()
  const MySwal = withReactContent(Swal)
  const [seksi, setSeksi] = useState([])
  const [params, setParams] = useState([])
  const [progress, setProgress] = useState(false);
  const [bidang, setBidang] = useState([])
  const [open, setOpen] = useState(false);
  const idDinas = router.query.idDinas
  let nomor = 1;


  const handleClickOpen = (event) => {
    setSeksi(event)
    setOpen(!open);
  };



  useEffect(() => {
    if (!idDinas) {
      return;
    }
    const listBidang = async () => {
      setProgress(true)

      try {
        let url = `${process.env.DB_API}dinas/list-bidang/${idDinas}`
        const response = await axios.get(url, {
          headers: {
            Authorization: Cookies.get('token')
          }
        });

        if (response.status === 200) {
          setProgress(false)
          setBidang(response.data.Bidang)

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
    listBidang()
  }, [idDinas]);


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
              <h3>Kategori Bidang {params.namaDinas}</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained">
                  <Button underline="hover"
                    color="inherit"
                    onClick={() => Router.push(`/master-dinas/tambah-bidang/?namaDinas=${params.namaDinas}&idDinas=${params.idDinas}`, undefined, { shallow: true })}  >
                    Tambah
                  </Button>
                </Button>


              </div>
            </div>
            {/* <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                <div className="heading-dialog">
                  List Seksi {seksi.namaBidang}
                  <Button onClick={handleClose}><CloseIcon /></Button>
                </div>

              </DialogTitle>
              <DialogContent>
                <TableContainer component={Paper} className="table-mpp shadow-none">
                  <Table sx={{ minWidth: 500 }} aria-label="simple table" className=" ">
                    <TableHead className="table-head-mpp">
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell >Nama Seksi</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {seksi.length === 0 ?
                        <TableRow

                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            Tidak ada seksi
                          </TableCell>

                        </TableRow>
                        : seksi.Seksi.map((row) => (

                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {nomor++}
                            </TableCell>
                            <TableCell >{row.namaSeksi}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </DialogContent>
              <DialogActions>


              </DialogActions>
            </Dialog> */}


            <TableContainer component={Paper} className="table-mpp shadow-none">
              <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell >Seksi</TableCell>
                    <TableCell >Kategori Bidang Dinas</TableCell>
                    <TableCell >Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bidang.length === 0 ?
                    <TableRow

                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell colSpan={4} sx={{ textAlign: 'center' }}>Tidak ada Data</TableCell>

                    </TableRow>
                    : bidang.map((row) => (

                      <>
                        <TableRow
                          key={row._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {nomor++}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => handleClickOpen(row)}
                            >
                              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell >{row.namaBidang}</TableCell>

                          <TableCell>
                            <div className="action">
                              <button underline="hover"
                                color="inherit"
                                className="button-outline-mpp"
                                onClick={() => Router.push(`/master-dinas/tambah-seksi/?namaBidang=${row.namaBidang}&idDinas=${router.query.idDinas}`, undefined, { shallow: true })}  >
                                <a>
                                  Tambah Seksi
                                </a>
                              </button>
                              <button>
                                <a onClick={() => Router.push({
                                  pathname: "/master-dinas/edit-bidang/",
                                  query: {
                                    dataBidang:JSON.stringify(row), 
                                    idDinas:router.query.idDinas
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
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                  History
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Date</TableCell>
                                      <TableCell>Customer</TableCell>
                                      <TableCell align="right">Amount</TableCell>
                                      <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {row.Seksi.length === 0 ?
                                      <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                        <TableCell component="th" scope="row">
                                          Tidak ada seksi
                                        </TableCell>

                                      </TableRow>
                                      : row.Seksi.map((row) => (

                                        <TableRow
                                          key={row._id}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell component="th" scope="row">
                                            {nomor++}
                                          </TableCell>
                                          <TableCell >{row.namaSeksi}</TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
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

