import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

export default function BreadcrumbsComponents() {
    const router = useRouter()

    return (

        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className="breadcrumb-navbar"
        >
            <Link underline="hover" key="1" color="inherit" href="/">
                Beranda
            </Link>,
            <Link
                underline="hover"
                key="2"
                color="inherit"
                href="/material-ui/getting-started/installation/"

            >
                Referensi
            </Link>,
            <Typography key="3" color="text.primary">
                {/* {router.pathname ? router.pathname.slice(1).replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase()).replace('?', ' / ') : ""} */}
            
            </Typography>,
        </Breadcrumbs>


    );
}