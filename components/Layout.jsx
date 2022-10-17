
import Header from './Header/Header';
import Container from '@mui/material/Container';
const Layout = ({ children }) => {
  return (
    <div className="content">
      <Header />
      <Container  maxWidth="md">
        {children}
      </Container>


    </div>
  );
}

export default Layout; 