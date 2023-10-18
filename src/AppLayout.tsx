import { Grid, Tab, Tabs } from '@mui/material';
import Layout from './features/layout/Layout';
import Config from './features/config/Config';

function AppLayout() {
  return (
    <Grid container display="flex" flexDirection="row">
        <Grid id="layout" sx={{width:'75%', height: '100vh'}}>
            <Grid display="flex" flexDirection="column">
              <Tabs value="FRONT" sx={{width:'100%'}}>
                <Tab label="Front" value="FRONT"/>
                <Tab label="Back" disabled/>
              </Tabs>
              <Layout/>
            </Grid>
        </Grid>
        <Grid id="config" sx={{width:'25%', height: '100vh'}}>
            <Config/>
        </Grid>
    </Grid>
  );
}

export default AppLayout;