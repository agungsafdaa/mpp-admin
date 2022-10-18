import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export default function BreadcrumbsMobile() {
    const router = useRouter()

    return (

        <Card className="card-mpp breadcrumb-mobile" sx={{mb:3}}>
            <CardContent>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                 
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
                        {router.pathname.slice(1)}
                    </Typography>,
                </Breadcrumbs>

            </CardContent>
        </Card>

    );
}