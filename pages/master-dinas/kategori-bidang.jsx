import React, { useState, useEffect } from 'react'
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
import { useRouter } from 'next/router'
import Router from "next/router"
import Cookies from 'js-cookie'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { isAuthenticated } from '../../auth';
export default function KategoriBidang() {
  const router = useRouter()
  const authenticated = isAuthenticated()
  const MySwal = withReactContent(Swal)
  const [page, setPage] = useState(1);
  const [bidang, setBidang] = useState([])
  const [progress, setProgress] = useState(false);

  let nomor = 1;
  const listBidang = async () => {
    setProgress(true)

    try {
      let url = `${process.env.DB_API}dinas/list-bidang/${router.query.idDinas}`
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

  useEffect(() => {
    listBidang()
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
              <h3>Kategori Bidang Dinas Kesehatan</h3>
              <div className="action">
                <Button className="button-mpp" variant="contained">
                  <Button underline="hover"
                    color="inherit"
                    onClick={() => Router.push(`/master-dinas/tambah-bidang/?namaDinas=${router.query.namaDinas}&idDinas=${router.query.idDinas}`, undefined, { shallow: true })}  >
                    Tambah
                  </Button>
                </Button>


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
                  {bidang.map((row) => (
                 
                      <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {nomor++}
                        </TableCell>
                        <TableCell >{row.namaBidang}</TableCell>
                        <TableCell >
                          {row.Seksi.length === 0 ?
                            <>
                              <Button underline="hover"
                                color="inherit"
                                className="text-underline"
                                onClick={() => Router.push(`/master-dinas/tambah-seksi/?namaBidang=${row.namaBidang}&idDinas=${router.query.idDinas}`, undefined, { shallow: true })}  >
                                Tambah Seksi
                              </Button>
                            </>
                            :
                            row.Seksi.length
                          }
                        </TableCell>
                        <TableCell>
                          <div className="action">
                            <button underline="hover"
                              color="inherit"
                              onClick={() => Router.push(`/master-dinas/tambah-seksi/?namaBidang=${row.namaBidang}&idDinas=${router.query.idDinas}`, undefined, { shallow: true })}  >
                              <a>
                                Tambah Seksi
                              </a>
                            </button>
                            <button>
                              <a>
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
            </TableContainer>

          </CardContent>

        </Card>

      </div>
    </>
  )
}

