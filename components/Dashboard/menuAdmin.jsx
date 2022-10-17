
import React, { useState, useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Container from "@mui/material/Container";


export default function MenuAdmin({  }) {

    
    return (
        <>
         

        
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={4} >
                            <Card className="card-dashboard">
                                <Container fixed>

                                    <CardContent>
                                        <div className='logo-area'>
                                            <img src="../simsp2d/assets/img/icon/icon-dokumen.svg" alt="logo pemkot" />
                                            <div className="text-area">
                                            <h3>    <Link href= "/berkas-masuk" >Berkas Menunggu Penomoran </Link> </h3>
                                               
                                            </div>
                                        </div>

                                    </CardContent>


                                </Container>

                            </Card>
                        </Grid>
                        <Grid item xs={12} lg={4} >
                            <Card className="card-dashboard">
                                <Container fixed>

                                    <CardContent>
                                        <div className='logo-area'>
                                            <img src="../simsp2d/assets/img/icon/icon-dokumen.svg" alt="logo pemkot" />
                                            <div className="text-area">
                                            <h3>    <Link href= "/update-status-berkas" >Update Status Berkas</Link></h3>
                                               
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
