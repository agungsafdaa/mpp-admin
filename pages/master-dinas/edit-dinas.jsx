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
import { useRouter } from 'next/router'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Tambah() {
    const router = useRouter()
    const dataDinas = router.query
    const authenticated = isAuthenticated()
    const MySwal = withReactContent(Swal)
    const [state, setState] = useState({});
    const [progress, setProgress] = useState(false)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(dataDinas.isActive);
    const setAktif = async(event) => {
        setProgress(true)
        setValue(event.target.value)
        try {
            let url = `${process.env.DB_API}dinas/status-dinas/${dataDinas._id}`
            const response = await axios.put(url, {
                status :event.target.value,
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
    };


    const handleChange = async ({ target: { name, value } }) => {

        setState({
            ...state,
            [name]: value,
        });
    }

  

    const tambahData = async () => {
        setProgress(true)
        try {
            let url = `${process.env.DB_API}dinas/edit-dinas/${dataDinas._id}`

            const response = await axios.put(url, {
                namaDinas: state.namaDinas === undefined ? dataDinas.namaDinas :  state.namaDinas,
                singkatan: state.singkatan === undefined ? dataDinas.singkatan : state.singkatan,
                alamat: state.alamat === undefined ? dataDinas.alamat : state.alamat,
                noTelp: state.noTelp === undefined ? dataDinas.noTelp : state.noTelp,
                kepalaDinas: state.kepalaDinas === undefined ? dataDinas.kepalaDinas : state.kepalaDinas,
                nipKelapaDinas: state.nipKelapaDinas === undefined ? dataDinas.nipKelapaDinas : state.nipKelapaDinas,
                pangkatKepalaDinas: state.pangkatKepalaDinas === undefined ? dataDinas.pangkatKepalaDinas : state.pangkatKepalaDinas,
                golonganKepalaDinas: state.golonganKepalaDinas  === undefined ? dataDinas.golonganKepalaDinas : state.golonganKepalaDinas,

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
                                        <h3>Edit {dataDinas.namaDinas}</h3>

                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> nama Dinas
                                        </Typography>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={value}
                                                onChange={setAktif}
                                            >
                                                <FormControlLabel value='true'  control={<Radio />} label="Active" />
                                                <FormControlLabel value='false'  control={<Radio />} label="Inactive" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>

                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> nama Dinas
                                        </Typography>
                                        <TextField

                                            name="namaDinas"
                                            placeholder={dataDinas.namaDinas}
                                            value={state.namaDinas || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Singkatan Dinas
                                        </Typography>
                                        <TextField

                                            name="singkatan"
                                            placeholder={dataDinas.singkatan}
                                            value={state.singkatan || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Alamat Dinas
                                        </Typography>
                                        <TextField

                                            name="alamat_dinas"
                                            placeholder={dataDinas.alamat_dinas}
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

                                            type="tel"
                                            name="noTelp"
                                            placeholder={dataDinas.noTelp}
                                            value={state.noTelp || ''}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Nama Kepala Dinas
                                        </Typography>
                                        <TextField

                                            name="kepalaDinas"
                                            placeholder={dataDinas.kepalaDinas}
                                            value={state.kepalaDinas || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span>  NIP Kepala Dinas
                                        </Typography>
                                        <TextField

                                            name="nipKelapaDinas"
                                            placeholder={dataDinas.kepalaDinas}
                                            value={state.nipKelapaDinas || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Pangkat Kepala Dinas
                                        </Typography>
                                        <TextField

                                            name="pangkatKepalaDinas"
                                            placeholder={dataDinas.pangkatKepalaDinas}
                                            value={state.pangkatKepalaDinas || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Golongan Kepala Dinas
                                        </Typography>
                                        <TextField
                                            name="golonganKepalaDinas"
                                            placeholder={dataDinas.golonganKepalaDinas}
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

