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
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Tambah() {

    const authenticated = isAuthenticated()
    const MySwal = withReactContent(Swal)
    const [state, setState] = useState({});
    const [progress, setProgress] = useState(false)
    const [loading, setLoading] = useState(true)
    const [openDinas, setOpenDinas] = useState(false);
    const [openBidang, setOpenBidang] = useState(false);
    const [dinas, setDinas] = useState([])
    const [bidang, setBidang] = useState([])
    const [optionsDinas, setOptionsDinas] = useState([]);
    const loadingDinas = openDinas && optionsDinas.length === 0;
    const loadingBidang = openBidang && openBidang.length === 0;

    const [pilihanDinas, setPilihanDinas] = useState();
    const [pilihanBidang, setPilihanBidang] = useState();
    const handleChange = async ({ target: { name, value } }) => {

        setState({
            ...state,
            [name]: value,
        });
    }



    const tambahData = async () => {


        setProgress(true)

        try {
            let url = `${process.env.DB_API}ijin/add`
            // let url = `/`

            const response = await axios.post(url, {
                namaIjin: state.namaIjin,
                namaDinas:pilihanDinas,
                bidangDinas : pilihanBidang,
              

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
        // }


    }

    const getBidangPilihan = (event, newState) => {
        setPilihanBidang(newState ? newState.namaBidang : '')
        
    };

    const getBidang = async (event, newData) => {
        const dinas  = newData;
        setPilihanDinas(newData.namaDinas)
        if (dinas !== null) {
            try {
                let url = `${process.env.DB_API}dinas/list-bidang/${newData._id}`
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
    }


    useEffect(() => {
        let active = true;

        if (!loadingDinas) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (active) {
                try {
                    let url = `${process.env.DB_API}dinas/list-dinas`
                    const response = await axios.get(url, {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    });

                    if (response.status === 200) {
                        setDinas(response.data.data)

                    }

                } catch (error) {

                    MySwal.fire({
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error",
                        button: "batal",
                    });
                }
            }
        })();

        return () => {
            active = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingDinas]);

    useEffect(() => {
        if (!openDinas) {
            setOptionsDinas([]);
        }
    }, [openDinas]);


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
                                        <h3>Tambah Jenis Izin</h3>

                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span>Jenis Izin
                                        </Typography>
                                        <TextField

                                            name="namaIjin"
                                            placeholder='nama izin'
                                            value={state.namaIjin || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Nama Dinas
                                        </Typography>
                                        <Autocomplete
                                            id="asynchronous-demo"

                                            open={openDinas}
                                            onOpen={() => {
                                                setOpenDinas(true);
                                            }}
                                            onClose={() => {
                                                setOpenDinas(false);
                                            }}
                                            sx={{ mt: 1, width: '1', mb:1 }}
                                            isOptionEqualToValue={(option, value) => option.namaDinas === value.namaDinas}
                                            onChange={getBidang}
                                            getOptionLabel={(option) => option.namaDinas}
                                            name="namaDinas"
                                            className="button-async"
                                            options={dinas}
                                            loading={openDinas}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    key={params._id}
                                                    placeholder="Pilih Dinas"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {loadingDinas ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />

                                    </div>
                                    <div className="form-input">
                                        <Typography>
                                            <span className="required"> *</span> Nama Bidang
                                        </Typography>
                                        <Autocomplete
                                            id="asynchronous-demo"

                                            open={openBidang}
                                            onOpen={() => {
                                                setOpenBidang(true);
                                            }}
                                            onClose={() => {
                                                setOpenBidang(false);
                                            }}
                                            sx={{ mt: 1, width: '1', mb: 1 }}
                                            isOptionEqualToValue={(option, value) => option.namaBidang === value.namaBidang}
                                            onChange={getBidangPilihan}
                                            getOptionLabel={(option) => option.namaBidang}
                                            name="namaBidang"
                                            className="button-async"
                                            options={bidang}
                                            loading={openBidang}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    key={params._id}
                                                    placeholder="Pilih bidang"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {loadingBidang ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
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

