import React, { useState } from 'react'
import Head from "next/head";
import Card from '@mui/material/Card';
import Router from 'next/router'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

export default function Tambah() {
    const [state, setState] = useState({});
    const [inputFields, setInputFields] = useState([
        { seksi: '' }
      ])
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
                            <h3>Tambah Kategori Bidang</h3>

                        </div>

                        <div className="form-input">
                            <Typography>
                                <span className="required"> *</span> Nama Dinas
                            </Typography>
                            <TextField
                                fullWidth
                                name="kategori_dinas"
                                placeholder='nama dinas '
                                value={'Dinas Kesehatan Kota Palembang'}
                                disabled
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <Typography>
                                <span className="required"> *</span> Kode Dinas
                            </Typography>
                            <TextField
                                fullWidth
                                name="kode"
                                placeholder='kode '
                                value={state.kode || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <Typography>
                                <span className="required"> *</span> Nama Bidang
                            </Typography>
                            <TextField
                                fullWidth
                                name="nama_bidang"
                                placeholder='Nama Bidang'

                                value={state.nama_bidang || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <Typography>
                                <span className="required"> *</span> Seksi Bidang
                            </Typography>
                            <TextField
                                fullWidth
                                name="seksi_bidang"
                                placeholder='Seksi Bidang'
                                value={state.seksi_bidang || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <Typography>
                                <span className="required"> *</span> Tambah Seksi Bidang
                            </Typography>
                            <Button className="button-outline-dashed"  variant="contained" ><ControlPointIcon/> Tambah Seksi</Button>
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

