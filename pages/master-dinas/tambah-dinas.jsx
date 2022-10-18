import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';

export default function Tambah() {
  const [state, setState] = useState({});

  const handleChange = async ({ target: { name, value } }) => {

    setState({
      ...state,
      [name]: value,
    });
  }
  return (
    <>
      <Card className="card-mpp kategori-dinas">
        <CardContent>
          <div className="heading">
            <h3>Tambah Dinas Baru</h3>

          </div>
          <div className="form-input">
            <Typography>
             <span className="required"> *</span> Kode
            </Typography>
            <TextField
              fullWidth
              name="kode_dinas"
              placeholder='kode dinas'
              value={state.kode_dinas || ''}
              onChange={handleChange}
            />
          </div>

        </CardContent>
        <CardActions>

        </CardActions>
      </Card>

    </>
  )
}

