import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {useRouter} from 'next/router';
  
export default function BreadcrumbsComponents() {
    const router = useRouter()
   
    return (


        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link underline="hover" key="1" color="inherit" href="/simsp2d/dashboard">
                Beranda
            </Link>,
         
            <Typography key="3" color="text.primary">
             {router.pathname.slice(1)}
            </Typography>,
        </Breadcrumbs>

    );
}