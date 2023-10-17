import { Grid } from '@mui/material';
import Layout from './features/layout/Layout';
import Config from './features/config/Config';

function AppLayout() {
  return (
    <Grid container display="flex" flexDirection="row">
        <Grid id="layout" sx={{width:'75%', height: '100vh'}}>
            <Layout/>
        </Grid>
        <Grid id="config" sx={{width:'25%', height: '100vh'}}>
            <Config/>
        </Grid>
    </Grid>
  );
}

export default AppLayout;