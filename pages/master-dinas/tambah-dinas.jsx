import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Card from '@mui/material/Card';
import Router from 'next/router'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { isAuthenticated } from '../../auth';
import Cookies from 'js-cookie'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import LoadingBar from '../../components/Loading';
export default function Tambah() {

  const authenticated = isAuthenticated()
  const MySwal = withReactContent(Swal)
  const [state, setState] = useState({});
  const [progress, setProgress] = useState(false)
  const [loading, setLoading] = useState(true)
  const handleChange = async ({ target: { name, value } }) => {

    setState({
      ...state,
      [name]: value,
    });
  }


  const tambahData = async () => {


    setProgress(true)

    try {
      let url = `${process.env.DB_API}dinas/add`

      const response = await axios.post(url, {
        namaDinas: state.namaDinas,
        singkatan: state.singkatan,
        alamat: state.alamat,
        noTelp: state.noTelp,
        kepalaDinas: state.kepalaDinas,
        nipKelapaDinas: state.nipKelapaDinas,
        pangkatKepalaDinas: state.pangkatKepalaDinas,
        golonganKepalaDinas: state.golonganKepalaDinas,

      }, {
        headers: {
          Authorization: Cookies.get('token')
        }
      });

      if (response.status === 200) {
        setProgress(false)
        MySwal.fire({
          title: "Berhasil!",
          icon: "success",
          text: response.data.message,

        })
        setTimeout(() => {
          Router.push('/master-dinas')
        }, 2000);
      }


    } catch (error) {

      MySwal.fire({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        buttons: true,
      })


      setProgress(false)
    }
    // }


  }

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
      {progress === true ? <LoadingBar open={progress}/> :
        <>
          <ValidatorForm onSubmit={tambahData}>
            <div className="container-mpp">
              <Card className="card-mpp kategori-dinas">
                <CardContent>

                  <div className="heading">
                    <h3>Tambah Dinas Baru</h3>

                  </div>
                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> nama Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="namaDinas"
                      placeholder='nama dinas'
                      value={state.namaDinas || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* <div className="form-input">
              <Typography>
                <span className="required"> *</span> Kategori Dinas / Bidang
              </Typography>
              <TextField
                fullWidth
                name="kategori_dinas"
                placeholder='kategori dinas '
                value={state.kategori_dinas || ''}
                onChange={handleChange}
              />
            </div> */}
                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> Singkatan Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="singkatan"
                      placeholder='singkatan dinas '
                      value={state.singkatan || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> Alamat Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="alamat_dinas"
                      placeholder='alamat dinas'
                      multiline
                      rows={4}
                      value={state.alamat_dinas || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> No Telp Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      type="tel"
                      name="noTelp"
                      placeholder='No Telp Dinas'

                      value={state.noTelp || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> Nama Kepala Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="kepalaDinas"
                      placeholder='Nama Kepala Dinas'
                      value={state.kepalaDinas || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span>  NIP Kepala Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="nipKelapaDinas"
                      placeholder='Nip Kepala Dinas'
                      value={state.nipKelapaDinas || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> Pangkat Kepala Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="pangkatKepalaDinas"
                      placeholder='Pangkat Kepala Dinas'
                      value={state.pangkatKepalaDinas || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-input">
                    <Typography>
                      <span className="required"> *</span> Golongan Kepala Dinas
                    </Typography>
                    <TextField
                      fullWidth
                      name="golonganKepalaDinas"
                      placeholder='Golongan Kepala Dinas'
                      value={state.golonganKepalaDinas || ''}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="card-action">
              <CardContent>
                <div className="action">
                  <Button variant="outlined" className="button-outline-mpp" onClick={() => Router.push('/master-dinas')}>batal</Button>
                  <Button variant="contained" type="submit" className="button-mpp">Simpan</Button>
                </div>
              </CardContent>
            </Card>
          </ValidatorForm>
        </>
      }

    </>
  )
}

