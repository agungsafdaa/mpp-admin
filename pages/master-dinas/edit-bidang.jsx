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
    const dataBidang = JSON.parse(router.query.dataBidang)
    const idDinas = router.query.idDinas
    const authenticated = isAuthenticated()
    const MySwal = withReactContent(Swal)
    const [state, setState] = useState({});
    const [progress, setProgress] = useState(false)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(dataBidang.isActive);
    const setAktif = async(event) => {
        setProgress(true)
        setValue(event.target.value)
        try {
            let url = `${process.env.DB_API}dinas/status-bidang/${idDinas}`
            const response = await axios.put(url, {
                namaBidang:dataBidang.namaBidang,
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
            let url = `${process.env.DB_API}dinas/edit-bidang/${idDinas}`

            const response = await axios.put(url, {
                namaBidang: state.namaDinas === undefined ? dataBidang.namaBidang :  state.namaBidang,
                namaBidangEdit:state.namaBidangEdit === undefined ? dataBidang.namaBidang : state.namaBidangEdit,

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
                                        <h3>Edit {dataBidang.namaBidang}</h3>

                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Status
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
                                            <span className="required"> *</span> nama Bidang
                                        </Typography>
                                        <TextField
                                            name="namaBidangEdit"
                                            placeholder={dataBidang.namaBidang}
                                            value={state.namaBidangEdit || ''}
                                            onChange={handleChange}
                                            required
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

