import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingBar(progress) {
  
    return (
        <>
            <Dialog open={progress}>
                <DialogContent>
                    <DialogContentText>
                        <Box sx={{ display: 'flex',justifyContent:'center',padding:'20px 0' }}>
                            <CircularProgress />
                        </Box>
                       Jangan tutup jendela ini sampai proses selesai
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
