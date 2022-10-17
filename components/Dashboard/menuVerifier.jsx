
import React from 'react';

import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Typography } from "@mui/material";
import CardContent from '@mui/material/CardContent';

import Container from "@mui/material/Container";


export default function MenuVerifier({ jumlahData }) {

    console.log(jumlahData)
    return (
        <>



            <Grid container spacing={2}>
                <Grid item xs={12} lg={4} sx={{mb:3}}>
                    <Card className="card-dashboard" >
                        <Container fixed>

                            <CardContent>
                                <div className='logo-area'>
                                    <img src="../simsp2d/assets/img/icon/icon-dokumen.svg" alt="logo pemkot" />
                                    <div className="text-area">

                                        <h3>    <Link href="/berkas-masuk" >Berkas Masuk</Link></h3>
                                        <h4>  {jumlahData}</h4>
                                    </div>
                                </div>

                            </CardContent>


                        </Container>

                    </Card>
                </Grid>
                <Grid item xs={12} lg={4} sx={{mb:3}}>
                    <Card className="card-dashboard">
                        <Container fixed>
                            <CardContent>
                                <div className='logo-area'>
                                    <img src="../simsp2d/assets/img/icon/icon-diverifikasi.svg" alt="logo pemkot" />
                                    <div className="text-area">
                                        <h3><Link href="/berkas-approved">Berkas Terverifikasi</Link></h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Container>

                    </Card>
                </Grid>
                <Grid item xs={12} lg={4} sx={{mb:3}}>
                    <Card className="card-dashboard">
                        <Container fixed>

                            <CardContent>
                                <div className='logo-area'>
                                    <img src="../simsp2d/assets/img/icon/icon-ditolak.svg" alt="logo pemkot" />
                                    <div className="text-area">
                                        <h3>    <Link href="/berkas-ditolak">Berkas Ditolak</Link></h3>


                                    </div>
                                </div>

                            </CardContent>


                        </Container>

                    </Card>
                </Grid>

            </Grid>



        </>
    );
}
