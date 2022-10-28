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
export default function KategoriBidang() {
  const router = useRouter()
  const MySwal = withReactContent(Swal)
 
  const [progress, setProgress] = useState(false);
  const [bidang, setBidang] = useState([])
  const [open, setOpen] = useState(false);
  const idDinas = router.query.idDinas
  let nomor = 1;




  useEffect(() => {
  
    const listBidang = async () => {
      setProgress(true)

      try {
        let url = `${process.env.DB_API}ptsp/list-bidang/`
        const response = await axios.get(url, {
          headers: {
            Authorization: Cookies.get('token')
          }
        });

        if (response.status === 200) {
          setProgress(false)
          setBidang(response.data.data)

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
  }, []);


  return (
    <>
      <Head>
        <title>MPP Admin</title>
        <meta name="description" content="MPP Admin" />
        <link rel="icon" href="../img/logo.png" />
      </Head>
      <div className="container-mpp">
        <Card className="card-mpp kategori-dinas">
          <CardContent>
            <div className="heading">
              <h3>Kategori Bidang/Seksi PTSP</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained">
                  <Button underline="hover"
                    color="inherit"
                    onClick={() => Router.push(`/master-bidang-ptsp/tambah-bidang`, undefined, { shallow: true })}  >
                    Tambah
                  </Button>
                </Button>


              </div>
            </div>
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
                              onClick={() =>
                                setOpen((prev) => ({ ...prev, [row._id]: !prev[row._id] }))
                              }
                            >
                             {open[row._id]  ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell >{row.namaBidang}</TableCell>

                          <TableCell>
                            <div className="action">

                              <button>
                                <a onClick={() => Router.push({
                                  pathname: "/master-dinas/edit-bidang/",
                                  query: {
                                    dataBidang: JSON.stringify(row),
                                    idDinas: router.query.idDinas
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
                        <TableRow className="table-expand">
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open[row._id]} timeout="auto" unmountOnExit  >
                            {open[row._id] && 
                              <Box sx={{ marginTop: 3,marginBottom:3}}>
                                <Typography sx={{ color: 'rgba(70, 78, 95, 0.7);',fontSize:'14px;' }} gutterBottom >
                                  Jumlah Seksi
                                </Typography>
                                <Typography sx={{fontSize:'16px'}} gutterBottom component="div">
                                  {row.Seksi.length} Seksi
                                </Typography>
                                <div className="action">
                                  <button underline="hover"
                                    color="inherit"
                                    className="button-outline-mpp"
                                    onClick={() => Router.push(`/master-bidang-ptsp/tambah-seksi-ptsp/?namaBidang=${row.namaBidang}&idBidang=${row._id}`, undefined, { shallow: true })}  >
                                    <a>
                                      Tambah Seksi
                                    </a>
                                  </button>
                                </div>
                                <Table className="table-mpp"  sx={{m:'20px 0'}} size="small" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>No</TableCell>
                                      <TableCell>Nama Seksi</TableCell>
                                      <TableCell>Status</TableCell>
                                      <TableCell>Aksi</TableCell>
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
                                      : row.Seksi.map((seksi) => (

                                        <TableRow
                                          key={row._id}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          className={seksi.isActive === false ? 'row-inactive' : ''}
                                        >
                                          <TableCell component="th" scope="row">
                                            {nomor++}
                                          </TableCell>
                                          <TableCell>{seksi.namaSeksi}</TableCell>
                                          <TableCell>
                                            <Typography className={seksi.isActive === true ? 'text-green' : 'text-red'}>
                                              {seksi.isActive === true ? 'Active' : 'Inactive'}
                                            </Typography>
                                          </TableCell>
                                          <TableCell>
                                            <div className="action">
                                              <button>
                                                <a onClick={() => Router.push({
                                                  pathname: "/master-bidang-ptsp/edit-seksi/",
                                                  query: {
                                                    namaSeksi:seksi.namaSeksi,
                                                    statusSeksi:seksi.isActive,
                                                    idBidang: row._id
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

