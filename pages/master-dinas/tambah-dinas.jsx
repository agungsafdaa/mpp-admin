import React, { useState } from 'react'
import Head from "next/head";
import Card from '@mui/material/Card';
import Router from 'next/router'  
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';


export default function Tambah() {
  const [state, setState] = useState({});

  const handleChange = async ({ target: { name, value } }) => {

    setState({
      ...state,
      [name]: value,
    });
  }
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
              <h3>Tambah Dinas Baru</h3>

            </div>
            <div className="form-input">
              <Typography>
                <span className="required"> *</span> Kode
              </Typography>
              <TextField
                fullWidth
                name="kode_dinas"
                placeholder='kode dinas'
                value={state.kode_dinas || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-input">
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
            </div>
            <div className="form-input">
              <Typography>
                <span className="required"> *</span> Singkatan Dinas
              </Typography>
              <TextField
                fullWidth
                name="singkatan_dinas"
                placeholder='singkatan dinas '
                value={state.singkatan_dinas || ''}
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
                name="no_telp"
                placeholder='No Telp Dinas'

                value={state.no_telp || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-input">
              <Typography>
                <span className="required"> *</span> Nama Kepala Dinas
              </Typography>
              <TextField
                fullWidth
                name="nama_kadin"
                placeholder='Nama Kepala Dinas'
                value={state.nama_kadin || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <Typography>
                <span className="required"> *</span>  NIP Kepala Dinas
              </Typography>
              <TextField
                fullWidth
                name="nip_kadin"
                placeholder='Nip Kepala Dinas'
                value={state.nip_kadin || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <Typography>
                <span className="required"> *</span> Pangkat Kepala Dinas
              </Typography>
              <TextField
                fullWidth
                name="pangkat_kadin"
                placeholder='Pangkat Kepala Dinas'
                value={state.pangkat_kadin || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-input">
              <Typography>
                <span className="required"> *</span> Golongan Kepala Dinas
              </Typography>
              <TextField
                fullWidth
                name="golongan_kadin"
                placeholder='Golongan Kepala Dinas'
                value={state.golongan_kadin || ''}
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
          <Button variant="contained" className="button-mpp">Simpan</Button>
            </div>
        </CardContent>
      </Card>
    </>
  )
}

