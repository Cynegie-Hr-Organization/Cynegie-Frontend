import Header from '@/components/header';
import HeaderMobile from '@/components/header/mobile';
import Main from '@/components/main';
import Nav from '@/components/nav';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Nav />
        </Box>
        <Box sx={{ flexGrow: 1, ml: { xs: '0px', md: '0px' } }}>
          <Box sx={{ display: { xs: 'none', md: ' block' } }}>
            <Header />
          </Box>
          <Box sx={{ display: { xs: 'block', md: ' none' } }}>
            <HeaderMobile />
          </Box>
          <div>
            <Main />
          </div>
        </Box>
      </div>
    </div>
  );
}
