/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Head from 'next/head';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { isAuthenticated } from '../../auth';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import LoginIcon from '@mui/icons-material/Login';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Router from "next/router"
import Cookies from 'js-cookie'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/router'

export default function ListDinas() {
  const authenticated = isAuthenticated()
  const MySwal = withReactContent(Swal)
  const router = useRouter()
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true)
  const [dinas, setDinas] = useState([])

  let nomor = 1;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const listDinas = async () => {
    setProgress(true)

    try {
      let url = `${process.env.DB_API}dinas/list-dinas`
      const response = await axios.get(url, {
        headers: {
          Authorization: Cookies.get('token')
        }
      });

      if (response.status === 200) {
        setProgress(false)
        setDinas(response.data)

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
    listDinas()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // if user is not authenticated, redirect to login page
    if (!authenticated) Router.push('/')
    setLoading(false)
  })
  if (loading) return <p>Loading...</p>

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
              <h3>Kategori Dinas</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained">
                  <Link href="/master-dinas/tambah-dinas">Tambah</Link>
                </Button>
                <Paper
                  component="form"
                  className="shadow-none form-mpp"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search "
                    inputProps={{ 'aria-label': 'search ' }}
                  />
                  <IconButton type="button" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>

              </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Hapus Surat Permohonan</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Apakah anda yakin akan menghapus surat permohonan Izin Praktik Tenaga Ahli Gizi - Baru?
                </DialogContentText>

              </DialogContent>
              <DialogActions>
                <Button className="button-outline-mpp" onClick={handleClose} variant="outline">Cancel</Button>
                <Button className="button-mpp" onClick={handleClose}>Hapus</Button>
              </DialogActions>
            </Dialog>
            <TableContainer component={Paper} className="table-mpp shadow-none">
              <Table sx={{ minWidth: 650 }} aria-label="simple table" className=" ">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell >Kode Dinas</TableCell>
                    <TableCell >Nama Dinas</TableCell>
                    <TableCell >Singkatan Dinas</TableCell>
                    <TableCell >Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {progress === true ?
                    <>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Skeleton animation="wave" />
                        </TableCell>
                        <TableCell>   <Skeleton animation="wave" /></TableCell>
                        <TableCell>   <Skeleton animation="wave" /></TableCell>
                        <TableCell>   <Skeleton animation="wave" /></TableCell>
                      </TableRow>
                    </>
                  : dinas.data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell component="th" scope="row">
                      {nomor++}
                    </TableCell>
                    <TableCell >Kode</TableCell>
                    <TableCell >{row.namaDinas}</TableCell>
                    <TableCell >{row.singkatan}</TableCell>
                    <TableCell >{ }</TableCell>


                    <TableCell>
                      <div className="action">
                   
                          <Button underline="hover"
                            color="inherit"
                          onClick={() => Router.push(`/master-dinas/kategori-bidang/?namaDinas=${row.namaDinas}&idDinas=${row._id}`, undefined, { shallow: true })}  >
                              
                            <a>
                              <h3><LoginIcon /></h3>
                            </a>
                          </Button>
                      
                        <button>
                          <Link href="/">
                            <a>
                              <EditIcon />
                            </a>
                          </Link>
                        </button>
                        <button onClick={handleClickOpen}><DeleteIcon /></button>
                      </div>
                    </TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </CardContent>
          <CardActions>
            <Pagination count={10} page={page} onChange={handleChange} />
          </CardActions>
        </Card>


      </div>
    </>

  )
}

