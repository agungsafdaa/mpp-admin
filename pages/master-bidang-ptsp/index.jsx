import React, { useState } from 'react'
import Card from '@mui/material/Card';
import Head from 'next/head';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Typography from '@mui/material/Typography'
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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Bidang Penyelenggaraan Pelayanan Perizinan dan Non Perizinan Pembangunan dan Lingkungan', '3'),
  createData('Bidang Penyelenggaraan Pelayanan Perizinan dan Non Perizinan Perekonomian dan Kesra', '3'),
  createData('Bidang Penyelenggaraan Pelayanan Perizinan dan Non Perizinan Pembangunan dan Lingkungan',  '3'),
  createData('Bidang Penyelenggaraan Pelayanan Perizinan dan Non Perizinan Perekonomian dan Kesra', '3'),
];
export default function ListDinas({ name }) {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

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
              <h3>Master Bidang/Seksi PTSP</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained">
                  <Link href="/master-bidang-ptsp/tambah-bidang">Tambah</Link>
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
                    <TableCell >Nama Persyaratan</TableCell>
                    <TableCell >Jumlah Seksi</TableCell>
                 
                    <TableCell >Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell component="th" scope="row">
                        {nomor++}
                      </TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.calories}</TableCell>
                      <TableCell >{row.fat}</TableCell>


                      <TableCell>
                        <div className="action">
                          <button>
                            <Link underline="hover"
                              color="inherit"
                              href="/master-dinas/kategori-bidang/" >
                              <a>
                                <h3><LoginIcon /></h3>
                              </a>
                            </Link>
                          </button>
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

