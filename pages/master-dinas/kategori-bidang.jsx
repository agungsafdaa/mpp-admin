import React, { useState } from 'react'
import Head from 'next/head';
import Card from '@mui/material/Card';
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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Bidang Lingkungan Dinas Kesehatan', '1'),
  createData('Bidang Sarana Dinas Kesehatan', '2'),
  createData('Bidang SDM Dinas Kesehatan', '4'),
];
export default function KategoriBidang() {
  const [page, setPage] = useState(1);
  let nomor = 1;
  const handleChange = (event, value) => {
    setPage(value);
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
              <h3>Kategori Bidang Dinas Kesehatan</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained">
                  <Link href="/master-dinas/tambah-bidang">Tambah</Link>
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
            <TableContainer component={Paper} className="table-mpp shadow-none">
              <Table sx={{ minWidth: 650 }} aria-label="simple table" className=" ">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell >Kategori Bidang Dinas</TableCell>
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

                      <TableCell>
                        <div className="action">
                          <Link underline="hover"

                            color="inherit"
                            href="/material-ui/getting-started/installation/" >
                            <a>

                              <h3><LoginIcon /></h3>
                            </a>
                          </Link>
                          <Link href="/"><EditIcon /></Link>
                          <Link href="/"><DeleteIcon /></Link>
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

