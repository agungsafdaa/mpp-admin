import React, { useState } from 'react'
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
  createData('10.01', 'Dinas Kesehatan Kota Palembang', 'Dinkes'),
  createData('20.01', 'Dinas Lingkungan Hidup dan Kebersihan Kota Palembang', 'DLHK'),
  createData('30.01', 'Dinas Pendidikan Kota Palembang', 'Diknas'),
  createData('40.01', 'Dinas Perdagangan Kota Palembang', 'Disdag'),
  createData('50.01', 'Dinas Perhubungan Kota Palembang', 'Dishub'),
];
export default function ListDinas({ name }) {
  const [page, setPage] = useState(1);
  let nomor = 1;
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
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

    </>
  )
}

