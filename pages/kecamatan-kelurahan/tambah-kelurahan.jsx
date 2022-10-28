import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Card from '@mui/material/Card';
import Router from 'next/router'
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import LoadingBar from '../../components/Loading';
import Cookies from 'js-cookie'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { isAuthenticated } from '../../auth';
import { useRouter } from 'next/router';

export default function Tambah() {
    const authenticated = isAuthenticated()
    const router = useRouter()
    const MySwal = withReactContent(Swal)
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(false)
    const [inputFields, setInputFields] = useState([
        { seksi: '' }
    ])
    const handleChange = async ({ target: { name, value } }) => {

        setState({
            ...state,
            [name]: value,
        });
    }

    const tambahData = async () => {


        setProgress(true)

        try {
            let url = `${process.env.DB_API}kecamatan-kelurahan/add-kelurahan/${router.query.idKecamatan}`

            const response = await axios.put(url, {
                namaKelurahan  : state.namaKelurahan  
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
                    Router.back()
                }, 2000);
            }


        } catch (error) {

            MySwal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
                buttons: true,
            })


            setProgress(false)
        }
        // }


    }

  
    return (
        <>
            <Head>
                <title>MPP Admin</title>
                <meta name="description" content="MPP Admin" />
                <link rel="icon" href="../img/logo.png" />
            </Head>
            {progress === true ? <LoadingBar open={progress} /> :
                <>
                  <ValidatorForm onSubmit={tambahData}>
                    <div className="container-mpp">
                        <Card className="card-mpp kategori-dinas">
                            <CardContent>
                                <div className="heading">
                                    <h3>Tambah Kelurahan Kecamatan {router.query.namaKecamatan}</h3>

                                </div>

                                <div className="form-input">
                                    <Typography>
                                        <span className="required"> *</span> Nama Kecamatan
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="namaBidang"
                                        placeholder='nama Kecamatan '
                                        value={router.query.namaKecamatan}
                                        disabled
                                        onChange={handleChange}
                                    />
                                </div>
                              

                                <div className="form-input">
                                    <Typography>
                                        <span className="required"> *</span> Nama Kelurahan
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        name="namaKelurahan"
                                        placeholder='Nama Kelurahan'
                                        value={state.namaKelurahan  || ''}
                                        onChange={handleChange}
                                    />
                                </div>

                              

                            </CardContent>

                        </Card>
                    </div>
                    <Card className="card-action">
                        <CardContent>
                            <div className="action">
                                <Button variant="outlined" className="button-outline-mpp" onClick={() => Router.back()}>batal</Button>
                                <Button variant="contained" type="submit" className="button-mpp">Simpan</Button>
                            </div>
                        </CardContent>
                    </Card>
                    </ValidatorForm>
                </>}
        </>
    )
}

