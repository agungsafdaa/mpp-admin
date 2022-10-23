import React, { useState } from 'react'
import Head from "next/head";
import Card from '@mui/material/Card';
import Router from 'next/router'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import LoadingBar from '../../components/Loading';
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
                                <span className="required"> *</span>  Bidang PTSP
                            </Typography>
                            <TextField
                                fullWidth
                                name="bidang_ptsp"
                                placeholder='Nama Bidang'
                                multiline
                                rows={4}
                                value={state.bidang_ptsp || ''}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-input">
                            <Typography>
                                <span className="required"> *</span> Seksi PTSP
                            </Typography>
                            <TextField
                                fullWidth
                                name="seksi_ptsp"
                                placeholder='Seksi ptsp'
                                value={state.seksi_ptsp || ''}
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

