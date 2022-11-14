/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Head from 'next/head';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
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
import { Typography } from '@mui/material';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  GridToolbar,
  useGridSelector,
} from '@mui/x-data-grid';
import { darken, lighten } from '@mui/material/styles';


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


export default function ListDinas() {
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
      let url = `${process.env.DB_API}ijin/list`
      const response = await axios.get(url, {
        headers: {
          Authorization: Cookies.get('token')
        }
      });

      if (response.status === 200) {
        setProgress(false)
        setDinas(response.data.ijin)

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
      field: 'namaIjin', headerName: 'Nama Izin', width: 200

    },
    {
      field: 'namaDinas', headerName: 'Nama Dinas', width: 300,
    },
    {
      field: 'namaBidang', headerName: 'Nama Bidang', width: 200,
    },
    {
      field: 'isActive', headerName: 'Status', width: 200,
      renderCell: (params) => {
        
        return (
          <div className="action">
            <Typography className={params.row.isActive === true ? 'text-green' : 'text-red'}>
              {params.row.isActive === true ? 'Active' : 'Inactive'}
            </Typography>
          </div>

        )
      }

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
            <a onClick={() => Router.push({
              pathname: "/master-dinas/edit-dinas/",
              query: params.row,
            })}>
              <EditIcon />
            </a>
            {/* <a onClick={handleClickOpen}><DeleteIcon /></a> */}
          </div>

        )
      }
    }
  ];

  // const columns = React.useMemo(
  //   () => dinas.filter((column) => VISIBLE_FIELDS.includes(column.field)),
  //   [data.columns],
  // );


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
        <meta name="description" content="MPP Admin" />
        <link rel="icon" href="../img/logo.png" />
      </Head>
      <div className="container-mpp">
        <Card className="card-mpp kategori-dinas">
          <CardContent>
            <div className="heading">
              <h3>Kategori Dinas</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained" onClick={() => Router.push(`/master-izin/tambah/`)}>
                  Tambah
                </Button>
              

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
                <Box
                  sx={{
                    height: 531,
                    width: '100%',
                    '& .row-false': {
                      background:'#FFECEC',
                    },
                  }}
                >
                  <DataGrid
                    getRowId={(dinas) => dinas._id}
                    rows={dinas}
                    columns={columns}
                    rowHeight={50}
                    getRowClassName={(params) => `row-${params.row.isActive}`}
                    className="table-mpp"
                    pagination
                    disableColumnFilter={true}
                    disableDensitySelector={true}
                    disableColumnSelector={true}
                    disableSelectionOnClick={true}
                    pageSize={10}
                    rowsPerPageOptions={[8]}
                    components={{
                      Toolbar: GridToolbar,
                      Pagination: CustomPagination,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                  />
                </Box>

              </>
            }
          </CardContent>
        </Card>
      </div>
    </>

  )
}

