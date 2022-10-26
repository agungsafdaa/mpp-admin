/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Head from 'next/head';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
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
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      className="pagination-mpp"
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
export default function ListDinas({value}) {
  const MySwal = withReactContent(Swal)
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [dinas, setDinas] = useState([])

  let nomor = 0;

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
        setDinas(response.data.data)

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


  const columns = [

    {
      field: 'kode', headerName: 'Kode Dinas', width: 250

    },
    {
      field: 'namaDinas', headerName: 'Nama Dinas', width: 350,
    },
    {
      field: 'singkatan', headerName: 'Singkatan Dinas', width:300,
    },
    {
      field: 'Aksi',
      headerName: 'Aksi',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <a underline="hover"
              color="inherit"
              onClick={() => Router.push(`/master-dinas/kategori-bidang/?namaDinas=${params.row.namaDinas}&idDinas=${params.row._id}`, undefined, { shallow: true })}  >
              <LoginIcon />
            </a>
            <Link href="/">
              <a>
                <EditIcon />
              </a>
            </Link>
            <a onClick={handleClickOpen}><DeleteIcon /></a>
          </div>

        )
      }
    }
  ];


  

  useEffect(() => {
    listDinas()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



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
                <Button className="button-mpp" variant="contained"   onClick={() => Router.push(`/master-dinas/tambah-dinas/`)}>
                 Tambah
                </Button>
                <Paper
                  component="form"
                  className="shadow-none form-mpp"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search "
                    onChange={e => setSearchVal(e.target.value)}
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
            {progress === true ?
              <>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </>
              :
              <>
                <DataGrid
                  getRowId={(dinas) => dinas._id}
                  rows={dinas}
                  columns={columns}
                  rowHeight={100}
                  autoHeight
                  className="table-mpp"
                  pagination
                  disableColumnFilter={true}
                  pageSize={10}
                  rowsPerPageOptions={[8]}
                  components={{
                    Pagination: CustomPagination,
                  }}
                />
              </>
            }
          </CardContent>
        </Card>
      </div>
    </>

  )
}

