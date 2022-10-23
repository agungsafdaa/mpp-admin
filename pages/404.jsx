/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Router from 'next/router'
export default function Custom404() {
    return (
        <>
            <Head>
                <title>MPP Admin</title>
                <meta name="description" content="DLHK Kota Palembang" />
                <link rel="icon" href="../img/logo.png" />
            </Head>
            <div className="container-mpp">
                <Card>
                    <div className="not-found">
                        <img
                            src="../img/404.webp"
                            alt="Picture of the author"
                            className="img-not-found"
                        />
                        <div className="info">
                            <h1>Halaman Tidak Ditemukan</h1>
                            <Typography>
                                Halaman yang anda tuju tidak dapat ditemukan.
                                Silahkan kembali ke halaman sebelumnya.
                            </Typography>
                            <Button variant="outlined" className="button-mpp" onClick={() => Router.push('/master-dinas')}>Beranda</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}