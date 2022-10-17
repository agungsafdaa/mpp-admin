
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Container from "@mui/material/Container";


export default function MenuUser({ }) {


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6} sx={{mb:3}}>
                    <Card className="card-dashboard">
                        <Container fixed>
                            <CardContent>
                                <div className='logo-area'>
                                    <img src="../simsp2d/assets/img/icon/icon-dokumen.svg" alt="logo pemkot" />
                                    <div className="text-area">
                                        <h3>    <Link href="/upload-dokumen">Berkas Baru </Link></h3>

                                    </div>
                                </div>
                            </CardContent>
                        </Container>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6} sx={{mb:3}}>
                    <Card className="card-dashboard">
                        <Container fixed>
                            <CardContent>
                                <div className='logo-area'>
                                    <img src="../simsp2d/assets/img/icon/icon-dokumen.svg" alt="logo pemkot" />
                                    <div className="text-area">
                                        <h3>    <Link href="/berkas-diproses"> Berkas diproses</Link></h3>
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
