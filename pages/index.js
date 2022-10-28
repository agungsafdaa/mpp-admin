/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React, { useState } from 'react';
import Router from "next/router"
import { authenticateUser } from "../auth"
import { setTokenCookie } from "../util"
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Container from "@mui/material/Container";
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment'

export default function Login() {
  const MySwal = withReactContent(Swal)
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({});
  const handleChange = async ({ target: { name, value } }) => {

    setState({
      ...state,
      [name]: value,
    });
  }

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const getKajian = async () => {
    setLoading(true)
    // alert('ditekan')

    try {
      let url = `${process.env.DB_API}auth/login`


      const response = await axios.post(url, {
        NikOrEmail: state.email,
        password: state.password,
      });

      if (response.status === 200) {
        localStorage.setItem("dataLogin", JSON.stringify(response.data));
        setTokenCookie(response.data.user.token)
        authenticateUser()
        Router.push('/master-dinas')

      }
    } catch (error) {
      MySwal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        button: "batal",
      });

      setLoading(false)
    }
  }
  return (
    <>
      <Head>
        <title>MPP Admin</title>
        <meta name="description" content="MPP Admin" />
        <link rel="icon" href="../img/logo.png" />
      </Head>


      <div className="login-page">
        <Container maxWidth="sm">
          <Card className="card-login">
            <Container fixed>

              <CardContent>
                <div className='logo-area'>
                  <img src="../img/logo.png" alt="logo pemkot" />
                  <h2>DPMPTSP Kota Palembang</h2>
                </div>
                <ValidatorForm
                  onSubmit={getKajian}
                >
                  <div className="form">

                    <TextValidator
                      type="email"
                      name="email"
                      value={state.email || ''} validators={['required']}
                      errorMessages={['Harap di isi']}
                      label="Masukkan email" variant="outlined" sx={{ mb: 1 }}
                      fullWidth
                      onChange={handleChange}
                    />
                    <TextValidator name="password"
                      validators={['required']}
                      errorMessages={['Harap di isi']}
                      value={state.password || ''}
                      id="outlined-basic"
                      fullWidth
                      label="Masukkan Password" variant="outlined" sx={{ mb: 1 }}
                      onChange={handleChange}
                      type={
                        state.showPassword ? 'text' : 'password'
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={
                                handleClickShowPassword
                              }
                              onMouseDown={
                                handleMouseDownPassword
                              }
                            >
                              {state.showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />


                  </div>
                  <div className="lupa-password">
                    <Link href="/">Lupa Password</Link>
                  </div>
                  <div className="submit">
                    {loading === true ? <Button className="button-mpp-outline" variant="outlined">
                      Fetch data
                    </Button> : <Button className="button-mpp" type="submit">Masuk</Button>}


                  </div>
                </ValidatorForm>
              </CardContent>


            </Container>

          </Card>
        </Container>
      </div>

    </>
  );
}
